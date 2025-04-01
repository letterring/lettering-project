from .base import BaseAgent
from app.services.openai_client import ask_gpt

class TextSegmenterAgent(BaseAgent):
    async def run(self, text: str) -> str:
        prompt = (
            "다음 긴 글을 주제별로 5개의 덩어리로 나눠주세요. 각 덩어리는 제목과 내용을 포함해야 합니다:\n\n"
            f"{text}"
        )
        return await ask_gpt(prompt)
