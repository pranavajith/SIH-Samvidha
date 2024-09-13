# basic scaffold to encrypt passwords
# although its all meaningless if http is used over https

import bcrypt

def getkey(userid, passwd):
    key = userid + passwd + str(hash(userid))
    return key.encode('utf-8')

def hashid(userid, passwd):
    key = getkey(userid, passwd)
    slt = bcrypt.gensalt()
    hsh = bcrypt.hashpw(key, slt)
    return hsh.decode('utf-8')

def check(userid, passwd, hashed):
    key = getkey(userid, passwd)
    hsh = hashed.encode('utf-8')
    return bcrypt.checkpw(key, hsh)

def new_user():
    pass

def chk_user():
    pass
