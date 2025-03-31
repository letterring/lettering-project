from sqlalchemy import Column, Integer, String
from database import Base

class KeyringDesign(Base):
    __tablename__ = "keyring_design"  # 실제 테이블명으로 맞춰주세요

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255))
    design_name = Column(String(255))
    image_url = Column(String(1024))
    price = Column(Integer)
