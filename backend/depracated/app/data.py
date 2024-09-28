from app.auth import AuthHelper
from fastapi import Depends
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# https://stackoverflow.com/a/70834382
engine = create_engine("sqlite:////data/db.sqlite3")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    primid = Column(Integer, primary_key=True, index=True)
    mailid = Column(String(64), unique=True, index=True)
    fsname = Column(String(32))
    lsname = Column(String(32))
    hashed = Column(String(64))
    quesct = Column(Integer, default=lambda context: 0)
    goodqn = Column(Integer, default=lambda context: 0)
    userid = Column(String(16), unique=True, index=True,
        # https://stackoverflow.com/a/75678715
        default=lambda context: AuthHelper.getuid(
            context.get_current_parameters()['fsname'],
            context.get_current_parameters()['lsname'],
            context.get_current_parameters()['mailid']
        )
    )

# Must be called after tables are defined
Base.metadata.create_all(bind=engine)

def DB_handle():
    def __innate_handle__():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()
    return Depends(__innate_handle__)

def get_leaders(*args, db=DB_handle(), limit=10):

    score = 1000 * func.floor(case(
        [(User.quesct == 0, 0)],
        else_=func.coalesce( User.goodqn / User.quesct, 0)
    ))
    
    league = case(
        [(score <= 125, "Copper"),
         (score <= 250, "Bronze"),
         (score <= 375, "Iron"),
         (score <= 500, "Silver"),
         (score <= 625, "Gold"),
         (score <= 750, "Platinum"),
         (score <= 875, "Ruby")],
        else_="Diamond"
    )
    
    results = db.query(
        (User.fsname) + ' ' + (User.lsname).label('usname'),
        score.label('uscore'), league.label('league')
    ).order_by(
        score.desc(), User.quesct.desc()
    ).limit(limit).all()

    return results
