import os
from app.data import Base, db_handler, engine
from app.auth import new_user, chk_user
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

CORS_ORIGIN = os.getenv("CORS_ALLOWED_HOST", "http://localhost:5000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORS_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/signin")
async def signin():
    pass


@app.post("/api/signup")
async def signup():
    pass


@app.post("/api/leader")
async def leader():
    pass
