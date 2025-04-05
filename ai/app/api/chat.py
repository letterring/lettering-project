# app/api/chat.py
from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.services.openai_service import chat_with_gpt_and_image

router = APIRouter(prefix="/ai", tags=["test"])

@router.post(
    "/chat",
    summary="이미지 + 텍스트 기반 GPT 응답",
    description="사용자의 텍스트와 이미지 파일을 함께 전달해 GPT가 응답합니다."
)
async def chat_with_image(
    prompt: str = Form(..., description="사용자 텍스트 프롬프트"),
    image: UploadFile = File(..., description="분석할 이미지 파일")
):
    try:
        response = await chat_with_gpt_and_image(prompt, image)
        return {"response": response}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
