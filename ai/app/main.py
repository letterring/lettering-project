from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.submit import router as submit_router
from app.api.chat import router as chat_router
from app.api.ai import router as ai_router

app = FastAPI()

app.include_router(submit_router)
app.include_router(chat_router) 
app.include_router(ai_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

