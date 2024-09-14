import bcrypt
import hashlib
from app.data import TokenModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from pydantic import BaseModel

UAUTH_KEY = "5b22b7$=1e6864e4617b"
TOKEN_KEY = "f92dddf0e41db3034cac3ff632ad18f2bb82603331220e73097ffa47"
TOKEN_EXPIRE_MINUTES = 30

class AuthHelper:
    """Basic user management"""

    def __new__(cls, *args, **kwargs):
        raise RuntimeError('%s should not be instantiated' % cls)

    @staticmethod
    def getuid(fsname, lsname, mailid):
        # generates userid from name & email
        key = f"{UAUTH_KEY}{fsname}{lsname}{mailid}"
        key = hashlib.sha256(key.encode('utf-8')).hexdigest()
        return key[:12] # string

    @staticmethod
    def pwdhsh(mailid, passwd):
        # returns string to be stored in dbms
        key = f"{UAUTH_KEY}!#{mailid}%@{passwd}=+"
        key = key.encode('utf-8')
        slt = bcrypt.gensalt()
        hsh = bcrypt.hashpw(key, slt)
        return hsh.decode('utf-8')

    @staticmethod
    def cmphsh(mailid, passwd, hashed):
        # returns true if credentials are valid
        key = f"{UAUTH_KEY}!#{mailid}%@{passwd}=+"
        key = key.encode('utf-8')
        hsh = hashed.encode('utf-8')
        return bcrypt.checkpw(key, hsh)
        

class JWTHelper:
    """Basic Session management"""

    def __new__(cls, *args, **kwargs):
        raise RuntimeError('%s should not be instantiated' % cls)

    @staticmethod
    def make_token(userid):
        # Generate JWT Token
        expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
        payload = {
            "userid": userid,
            "access": int(datetime.timestamp(expire)),
        }
        token = jwt.encode(payload, TOKEN_KEY, algorithm="HS256")
        return token

    @staticmethod
    def check_token(userid, token):
        # Decode payload & check validity
        try:
            payload = jwt.decode(token, TOKEN_KEY, algorithms=["HS256"])
            val1 = payload['userid']
            val2 = int(datetime.timestamp(payload['userid']))
            val3 = int(datetime.timestamp(datetime.utcnow()))

            if (val1 != userid or val2 != val3):
                raise JWTError
            else:
                return True

        except JWTError:
            return False



