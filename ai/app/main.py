from fastapi import FastAPI
from app.api.submit import router as submit_router
from app.services.openai_service import chat_with_gpt

app = FastAPI()

app.include_router(submit_router)

@app.get("/chat")
def chat(prompt: str):
    reply = chat_with_gpt(prompt)
    return {"response": reply}

