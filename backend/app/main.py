import os
import app.data as db
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
async def signin():
    # HTTPException(status_code=401, detail="Invalid Credentials")
    pass

@app.post("/api/signup")
async def signup():
    pass

@app.post("/api/leader")
async def leader():
    pass
