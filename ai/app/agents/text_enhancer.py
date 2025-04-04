from .base import BaseAgent
import base64
from PIL import Image
from app.services.openai_client import ask_gpt

class TextEnhancerAgent(BaseAgent):
    async def run(self, text: str, image_path: str):
        image = Image.open(image_path)
        image_bytes = await image.read()
        base64_image = base64.b64encode(image_bytes).decode("utf-8")
        
        prompt = f"""다음 문장을 더 풍부하고 감성적으로 만들어 주세요:\n\n{text}"""
        return await ask_gpt(prompt)
