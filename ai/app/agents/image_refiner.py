import base64
from .base import BaseAgent
from fastapi import UploadFile
from app.services.openai_client import ask_gpt_with_image

class ImageRefinerAgent(BaseAgent):
    async def run(self, text: str, image: UploadFile) -> str:
        image_bytes = await image.read()
        base64_image = base64.b64encode(image_bytes).decode("utf-8")

        prompt = f"""
        아래의 문장은 사진 속 장면을 보완하지 못하고 있습니다. 사진에 대해 설명해주고, 그 설명을 바탕으로 문장을 풍부하게 보완해 주세요.
        \n\n
        문장: "{text}"
        \n\n
        사진: {base64_image}
        """
        return await ask_gpt_with_image(prompt, base64_image)
