import os
import json
from uuid import uuid4
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.settings import settings
from app.core.redis_conf import redis, REDIS_PREFIX
from app.agents.text_enhancer import TextEnhancerAgent
from app.agents.image_refiner import ImageRefinerAgent
from app.agents.text_segmenter import TextSegmenterAgent

router = APIRouter(prefix="/ws", tags=["AI WebSocket"])


@router.websocket("/ai")
async def websocket_ai_handler(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            try:
                data = await websocket.receive_text()
                req = json.loads(data)
                action = req.get("action")

                match action:
                    case "enhance":
                        await handle_enhance(websocket, req)
                    case "refine":
                        await handle_refine(websocket, req)
                    case "segment":
                        await handle_segment(websocket, req)
                    case "generate_and_submit_postcard":
                        await handle_generate_and_submit(websocket, req)
                    case _:
                        await websocket.send_json({"error": f"Unknown action: {action}"})

            except Exception as e:
                await websocket.send_json({"error": f"Internal error: {str(e)}"})

    except WebSocketDisconnect:
        print("🔌 WebSocket disconnected")


# 감성 문장 생성
async def handle_enhance(websocket: WebSocket, req: dict):
    text = req.get("text")
    filename = req.get("filename")
    image_path = os.path.join(settings.UPLOAD_DIR, filename)

    if not os.path.exists(image_path):
        await websocket.send_json({"error": f"파일이 존재하지 않습니다: {filename}"})
        return

    agent = TextEnhancerAgent()
    result = await agent.run(text=text, image_path=image_path)
    await websocket.send_json({"response": result})


# 문장 보정
async def handle_refine(websocket: WebSocket, req: dict):
    texts = req.get("texts", [])
    filenames = req.get("filenames", [])

    image_paths = []
    for fname in filenames:
        full_path = os.path.join(settings.UPLOAD_DIR, fname)
        if not os.path.exists(full_path):
            await websocket.send_json({"error": f"파일이 존재하지 않습니다: {fname}"})
            return
        image_paths.append(full_path)

    agent = ImageRefinerAgent()
    result = await agent.run(texts=texts, image_paths=image_paths)
    parsed = json.loads(result)
    await websocket.send_json({"response": parsed})


# 텍스트 분할
async def handle_segment(websocket: WebSocket, req: dict):
    text = req.get("text")
    count = req.get("count", 5)

    agent = TextSegmenterAgent()
    result = await agent.run(text=text, count=count)
    parsed = json.loads(result)
    await websocket.send_json({"response": parsed})


# 엽서 생성 및 Redis 저장
async def handle_generate_and_submit(websocket: WebSocket, req: dict):
    message = req.get("message")
    filenames = req.get("filenames")

    if not message or not filenames:
        await websocket.send_json({"error": "message와 filenames는 필수입니다."})
        return

    await websocket.send_json({"status": "segmenting"})

    agent = TextSegmenterAgent()
    result = await agent.run(text=message, count=5)
    segments = json.loads(result)

    await websocket.send_json({"status": "saving"})

    key = f"{REDIS_PREFIX}:{uuid4()}"
    value = {
        "message": message,
        "segments": segments,
        "images": filenames,
        "status": "temp"
    }

    await redis.set(key, json.dumps(value), ex=1800)  # Redis TTL 30분

    await websocket.send_json({
        "status": "done",
        "response": {
            "key": key,
            "segments": segments
        }
    })
