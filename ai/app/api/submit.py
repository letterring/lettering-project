from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from typing import List
from uuid import uuid4
from app.core.redis_conf import redis, REDIS_PREFIX
from app.utils.utils import save_image
import json

router = APIRouter(prefix="/ai", tags=["Redis"])

@router.post(
    "/submit",
    summary="엽서 임시 저장",
    description="사용자로부터 이미지와 메시지를 받아 Redis에 임시 저장합니다. 유효시간은 30분입니다."
)
async def submit_entry(
    images: List[UploadFile] = File(..., description="업로드할 이미지 파일들 (최소 1장)"),
    message: str = Form(..., description="엽서에 작성할 메시지 내용")
):
    """
    이미지 파일과 메시지를 Redis에 임시로 저장합니다.
    """
    if len(images) < 1:
        return JSONResponse(status_code=400, content={"error": "이미지를 한 장 이상 업로드 해주세요."})

    image_meta = [await save_image(img) for img in images]

    key = f"{REDIS_PREFIX}:{uuid4()}"
    value = {
        "message": message,
        "images": image_meta,
        "status": "temp"
    }

    await redis.set(key, json.dumps(value))
    return {"status": "success", "key": key}


@router.get(
    "/submit/{key}",
    summary="임시 엽서 조회",
    description="제공된 key를 통해 Redis에 저장된 임시 엽서 정보를 조회합니다."
)
async def get_entry(key: str):
    """
    Redis에 저장된 엽서 데이터를 조회합니다.
    """
    value = await redis.get(key)
    if not value:
        return JSONResponse(status_code=404, content={"error": "해당 key를 찾을 수 없습니다."})
    return json.loads(value)

@router.patch(
    "/submit/{key}",
    summary="엽서 메시지 업데이트",
    description="Redis에 저장된 엽서의 메시지 내용을 수정합니다."
)
async def update_message(key: str, message: str = Form(...)):
    """
    Redis에 저장된 메시지를 수정합니다.
    """
    existing = await redis.get(key)
    if not existing:
        return JSONResponse(status_code=404, content={"error": "해당 key를 찾을 수 없습니다."})

    data = json.loads(existing)
    data["message"] = message

    await redis.set(key, json.dumps(data))
    return {"status": "updated"}

