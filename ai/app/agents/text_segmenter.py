from .base import BaseAgent
from app.services.openai_client import ask_gpt

class TextSegmenterAgent(BaseAgent):
    async def run(self, text: str, count: int = 5):
        prompt = f"""
        다음은 한 사람이 쓴 편지글입니다.

        이 글을 전체적으로 읽고, 문장의 흐름과 내용에 맞춰 문맥별로 자연스럽게 {count}개의 단락으로 나눠주세요.  
        각 단락은 같은 주제나 흐름을 공유하는 문장들로 묶어야 하며, **편지의 진심 어린 표현과 어투를 그대로 유지**해야 합니다.  
        ❗ **중요**: 글의 내용을 수정하거나 문장을 고치지 말고, **입력된 문장을 그대로 사용**해서 단락을 나눠야 합니다.  

        ❗ **중요**:
        - 글을 수정하거나 문장을 변경하지 마세요.
        - 반드시 입력된 문장 그대로 사용해서 단락을 나누세요.
        - 출력은 **JSON 리스트만** 응답하세요.
        - ✅ **백틱( ```)이나 "json" 같은 포맷 마크다운을 절대 포함하지 마세요.**
        - 응답은 아래 예시처럼 리스트만 출력하세요:

        예시:
        [
        "단락1",
        "단락2",
        "단락3",
        "단락4",
        "단락5"
        ]

        아래는 편지 내용입니다.
        ---
        {text}
        """
        return await ask_gpt(prompt)
