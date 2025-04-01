from app.core.settings import settings
from openai import OpenAI

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def chat_with_gpt(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content