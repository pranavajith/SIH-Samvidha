import bcrypt
import hashlib
from app.data import TokenModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from pydantic import BaseModel

__UAUTH_KEY__ = "5b22b7$=1e6864e4617b"
__TOKEN_KEY__ = "f92dddf0e41db3034cac3ff632ad18f2bb82603331220e73097ffa47"
__TOKEN_EXPIRE_MINUTES__ = 30

class AuthHelper:
    """Basic user management"""

    def __new__(cls, *args, **kwargs):
        raise RuntimeError('%s should not be instantiated' % cls)

    @staticmethod
    def getuid(fsname, lsname, mailid):
        # generates userid from name & email
        key = f"{__UAUTH_KEY__}{fsname}{lsname}{mailid}"
        key = hashlib.sha256(key.encode('utf-8')).hexdigest()
        return key[:12] # string

    @staticmethod
    def pwdhsh(mailid, passwd):
        # returns string to be stored in dbms
        key = f"{__UAUTH_KEY__}!#{mailid}%@{passwd}=+"
        key = key.encode('utf-8')
        slt = bcrypt.gensalt()
        hsh = bcrypt.hashpw(key, slt)
        return hsh.decode('utf-8')

    @staticmethod
    def cmphsh(mailid, passwd, hashed):
        # returns true if credentials are valid
        key = f"{__UAUTH_KEY__}!#{mailid}%@{passwd}=+"
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
        expire = datetime.utcnow() + timedelta(minutes=__TOKEN_EXPIRE_MINUTES__)
        payload = {
            "userid": userid,
            "access": int(datetime.timestamp(expire)),
        }
        token = jwt.encode(payload, __TOKEN_KEY__, algorithm="HS256")
        return token

    @staticmethod
    def check_token(userid, token):
        # Decode payload & check validity
        try:
            payload = jwt.decode(token, __TOKEN_KEY__, algorithms=["HS256"])
            val1 = int(datetime.timestamp(datetime.utcnow()))
            val2 = int(datetime.timestamp(payload['userid']))

            if (payload['userid'] != userid or val1 != val2):
                raise JWTError
            else:
                return True

        except JWTError:
            # either decode error or invalidity
            return False



