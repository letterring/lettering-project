import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.core.settings import settings
from app.api.submit import router as submit_router
from app.api.chat import router as chat_router
from app.api.ai import router as ai_router


app = FastAPI()

# 현재 파일 기준으로 uploads 디렉토리 경로 지정
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "uploads")

# '/static/uploads' 경로로 공개
# 예를 들어, 📁 uploads/abc.jpg → https://letterring.shop/static/uploads/abc.jpg

app.mount("/static/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

app.include_router(submit_router)
app.include_router(chat_router) 
app.include_router(ai_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.DOMAIN_URL, settings.LOCAL_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

