from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("sqlite:///data/db.sqlite3", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def handle():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class User(Base):
    __tablename__ = "users"
    
    primid = Column(Integer, primary_key=True, index=True)
    mailid = Column(String, unique=True)
    userid = Column(String, unique=True, index=True)
    fsname = Column(String)
    lsname = Column(String)
    hashed = Column(String)
    quesct = Column(Integer)
    goodqn = Column(Integer)

class UserCreate(BaseModel):
    fsname: str
    lsname: str
    passwd: str
    mailid: str

class UserLogin(BaseModel):
    mailid: str
    passwd: str

class TokenModel(BaseModel):
    userid: str
    access: int # timestamp

# Must be called after models are defined
Base.metadata.create_all(bind=engine)
