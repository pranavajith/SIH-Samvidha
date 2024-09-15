import bcrypt
import hashlib
from datetime import datetime, timedelta
from jose import JWTError, jwt
from pydantic import BaseModel

__UAUTH_KEY__ = "5b22b7$=1e6864e4617b"
__TOKEN_KEY__ = "f92dddf0e41db3034cac3ff632ad18f2bb82603331220e73097ffa47"
__TOKEN_EXPIRE_MINUTES__ = 10

class AuthHelper:
    """
    Class for User Validation, and ID Generation
    """

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
    """
    Session management with JSON Web Tokens
    Reset timer/token for every valid request
    """

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
    def from_token(token):
        # Returns userid on valid token
        # Return values: 
        #   valid:   -> 200: OK
        #   invalid: -> 403: Forbidden
        #   expired: -> 401: Unauthorized
        try:
            payload = jwt.decode(token, __TOKEN_KEY__, algorithms=["HS256"])
            val1 = int(datetime.timestamp(datetime.utcnow()))
            val2 = int(datetime.timestamp(payload['access']))

            if (val1 != val2):
                return [401, "Session Timeout"]
            else:
                return [200, payload['userid']]

        except JWTError:
            return [403, "Malformed Request"]



