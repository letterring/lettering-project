# app/services/openai_service.py
import base64
from fastapi import UploadFile
from openai import OpenAI
from app.core.settings import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

async def chat_with_gpt_and_image(prompt: str, image: UploadFile) -> str:
    image_bytes = await image.read()
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        max_tokens=1024
    )

    return response.choices[0].message.content
