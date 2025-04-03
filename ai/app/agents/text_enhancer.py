from .base import BaseAgent
from app.services.openai_client import ask_gpt

class TextEnhancerAgent(BaseAgent):
    async def run(self, text: str) -> str:
        prompt = f"""다음 문장을 더 풍부하고 감성적으로 만들어 주세요:\n\n{text}"""
        return await ask_gpt(prompt)
