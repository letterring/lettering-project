import os
from dotenv import load_dotenv
import uvicorn

load_dotenv()

host = os.getenv("API_HOST", "127.0.0.1")
port = int(os.getenv("API_PORT", 8001))

if __name__ == "__main__":
    uvicorn.run("main:app", host=host, port=port, reload=True)
