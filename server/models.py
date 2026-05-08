from sqlalchemy import Column, Integer, String
from database import Base

class translation(Base):
    __tablename__ = "translation"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(255), index=True)
    result = Column(String(255), index=True)
    lang = Column(String(255), index=True)