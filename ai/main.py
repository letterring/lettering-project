from fastapi import FastAPI
from api.submit import router as submit_router
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.include_router(submit_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("API_HOST", "127.0.0.1"),
        port=int(os.getenv("API_PORT", 8001)),
        reload=True
    )
