import os
import app.data as DBMS
from app.auth import AuthHelper, JWTHelper
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

CORS_ORIGIN = os.getenv("CORS_ALLOWED_HOST", "http://frontend:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/signin", response_model=DBMS.TokenModel)
async def signin(payload: DBMS.UserLogin, db: Session = Depends(DBMS.handle)):
    eid = payload.mailid
    pwd = payload.passwd
    usr = db.query(DBMS.User).filter(DBMS.User.mailid==eid).first()

    if (usr is None):
        raise HTTPException(status_code=404, detail="User Not Found")

    if (AuthHelper.cmphsh(eid, pwd, usr.hashed) == 0):
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    return {"token": JWTHelper.make_token(usr.userid)}


@app.post("/api/signup", response_model=DBMS.TokenModel)
async def signup(payload: DBMS.UserCreate, db: Session = Depends(DBMS.handle)):
    
    usr = DBMS.User(
        fsname=payload.fsname,
        lsname=payload.lsname,
        mailid=payload.mailid,
        hashed=AuthHelper.pwdhsh(payload.mailid, payload.passwd)
    )

    print(usr)

    db.add(usr)
    db.commit()
    db.refresh(usr)

    return {"token": JWTHelper.make_token(usr.userid)}
    

@app.post("/api/leader")
async def leader():
    pass
