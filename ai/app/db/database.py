from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# .env 파일에서 환경 변수 로드
load_dotenv()

# .env에서 DB URL 불러오기
SQLALCHEMY_DATABASE_URL = os.getenv("DB_URL")
print(SQLALCHEMY_DATABASE_URL)

# DB 엔진 생성
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

# 세션 생성기
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 베이스 클래스 (모델이 이걸 상속받음)
Base = declarative_base()
