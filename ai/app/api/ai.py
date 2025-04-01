from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse

from app.agents.text_enhancer import TextEnhancerAgent
from app.agents.image_refiner import ImageRefinerAgent
from app.agents.text_segmenter import TextSegmenterAgent

router = APIRouter(prefix="/ai", tags=["AI Agents"])

@router.post("/enhance")
async def enhance_text(text: str = Form(...)):
    """
    문장을 더 풍부하게 만드는 기능
    """
    try:
        agent = TextEnhancerAgent()
        result = await agent.run(text=text)
        return {"response": result}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.post("/refine")
async def refine_with_image(
    text: str = Form(...),
    image: UploadFile = File(...)
):
    """
    사진 + 글을 바탕으로 문장을 보완하는 기능
    """
    try:
        agent = ImageRefinerAgent()
        result = await agent.run(text=text, image=image)
        return {"response": result}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.post("/segment")
async def segment_text(text: str = Form(...)):
    """
    긴 글을 문맥별로 5묶음으로 나누는 기능
    """
    try:
        agent = TextSegmenterAgent()
        result = await agent.run(text=text)
        return {"response": result}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
