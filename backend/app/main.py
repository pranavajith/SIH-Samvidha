import os
import app.data as DBMS
import app.auth as AuthHelper, JWTHelper
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

CORS_ORIGIN = os.getenv("CORS_ALLOWED_HOST", "*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/signin")
async def signin(payload: DBMS.UserLogin, db: Session = Depends(DBMS.handle)):
    eid = payload['mailid']
    pwd = payload['passwd']
    usr = db.query(User).filter(User.mailid==eid).first()

    if (usr is None):
        raise HTTPException(status_code=404, detail="User Not Found")

    chk = AuthHelper.cmphsh(eid, pwd, usr.hashed)
    
    if (chk == 0):
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    tkn = JWTHelper.make_token(usr.userid)

    return {"token": tkn}


@app.post("/api/signup")
async def signup():
    pass

@app.post("/api/leader")
async def leader():
    pass
