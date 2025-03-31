from fastapi import FastAPI, Depends
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import models
import crud

app = FastAPI()

# 의존성 - DB 세션
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/keyrings")
def read_all_keyrings(db: Session = Depends(get_db)):
    return crud.get_all_keyring_designs(db)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)