from pydantic import BaseModel

# Request (Input) Data Models

class UserCreate(BaseModel):
    fsname: str
    lsname: str
    passwd: str
    mailid: str

class UserLogin(BaseModel):
    mailid: str
    passwd: str

class UserUpdate(BaseModel):
    fsname: str
    lsname: str
    jtoken: str

# Response (Output) Data Models

class LeaderItem(BaseModel):
    usrank: int
    usname: str
    uscore: int
    league: str

class LeaderBoard(BaseModel):
    b_list: list[LeaderItem]
    jtoken: str

class TokenModel(BaseModel):
    jtoken: str
