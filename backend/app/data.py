from app.auth import AuthHelper
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, validates

# https://stackoverflow.com/a/70834382
engine = create_engine("sqlite:////data/db.sqlite3")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def handle():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def make_userid(context):
    # https://stackoverflow.com/a/75678715
    params = context.get_current_parameters()
    return AuthHelper.getuid(params['fsname'], params['lsname'], params['mailid'])


class User(Base):
    __tablename__ = "users"
    
    primid = Column(Integer, primary_key=True, index=True)
    mailid = Column(String(64), unique=True, index=True)
    fsname = Column(String(32))
    lsname = Column(String(32))
    hashed = Column(String(64))
    quesct = Column(Integer, default=lambda context: 0)
    goodqn = Column(Integer, default=lambda context: 0)
    userid = Column(String(16), unique=True, index=True, default=make_userid)


class UserCreate(BaseModel):
    fsname: str
    lsname: str
    passwd: str
    mailid: str

class UserLogin(BaseModel):
    mailid: str
    passwd: str

class TokenModel(BaseModel):
    token: str

# Must be called after models are defined
Base.metadata.create_all(bind=engine)
