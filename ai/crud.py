from sqlalchemy.orm import Session
from models import KeyringDesign

def get_all_keyring_designs(db: Session):
    return db.query(KeyringDesign).all()
