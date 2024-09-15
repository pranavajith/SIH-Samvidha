import os
import app.data as DBMS
import app.resp as RESP
from app.auth import AuthHelper, JWTHelper
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import func, case
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

@app.post("/api/user/signin", response_model=RESP.TokenModel)
async def user_signin(payload: RESP.UserLogin, db=DBMS.DB_handle()):
    eid = payload.mailid
    pwd = payload.passwd
    usr = db.query(DBMS.User).filter(DBMS.User.mailid==eid).first()

    if (usr is None):
        raise HTTPException(status_code=404, detail="User Not Found")

    if (AuthHelper.cmphsh(eid, pwd, usr.hashed) == 0):
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    return RESP.TokenModel(jtoken=JWTHelper.make_token(usr.userid))


@app.post("/api/user/signup", response_model=RESP.TokenModel)
async def user_signup(payload: RESP.UserCreate, db=DBMS.DB_handle()):
    
    usr = DBMS.User(
        fsname=payload.fsname,
        lsname=payload.lsname,
        mailid=payload.mailid,
        hashed=AuthHelper.pwdhsh(payload.mailid, payload.passwd)
    )

    db.add(usr); db.commit(); db.refresh(usr)

    return RESP.TokenModel(jtoken=JWTHelper.make_token(usr.userid))


@app.post("/api/user/update", response_model=RESP.TokenModel)
async def user_update(payload: RESP.UserUpdate, db=DBMS.DB_handle()):
    
    jwtload = JWTHelper.from_token(payload['jtoken'])

    if (jwtload[0] != 200):
        raise HTTPException(status_code=jwtload[0], detail=jwtload[1])

    oldusr = db.query(User).filter_by(userid=jwtload[1]).first()

    if oldusr is None:
        raise HTTPException(status_code=404, detail="User Not Found")
    else:
        # userid is indexed; edits are costly
        oldusr.fsname = payload['fsname']
        oldusr.lsname = payload['lsname']
        db.commit(); db.refresh();

    return RESP.TokenModel(jtoken=JWTHelper.make_token(jwtload[1]))


@app.post("/api/game/leader", response_model=RESP.LeaderBoard)
async def game_leader(json_token: RESP.TokenModel):

    jwtload = JWTHelper.from_token(json_token['jtoken'])

    if (jwtload[0] != 200):
        raise HTTPException(status_code=jwtload[0], detail=jwtload[1])

    board_list = list()

    for usrank, user in enumerate(DBMS.get_leaders(), 1):
        leader = RESP.LeaderItem(
            usrank=usrank,
            usname=user.usname,
            uscore=user.uscore,
            league=user.league
        )

        board_list.append(leader)

    return RESP.LeaderBoard(
        b_list=board_list, 
        jtoken=JWTHelper.make_token(jwtload[1])
    )

