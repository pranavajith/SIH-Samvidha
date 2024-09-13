from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite3 does not need migrations
DB_PATH = "/db.sqlite3"
DB__URL = "sqlite://" + DB_PATH

engine = create_engine(DB__URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def db_handler():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class User(Base):
    __tablename__ = "users"
    
    primid = Column(Integer, primary_key=True, index=True)
    userid = Column(String, unique=True, index=True)
    hashed = Column(String)
    mailid = Column(String)
    quesct = Column(Integer)
    goodqn = Column(Integer)


class UserCreate(BaseModel):
    userid: str
    passwd: str
    mailid: str

# Must be called after models are defined
Base.metadata.create_all(bind=engine)
