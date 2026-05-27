"""
ORM model for storing translations.

Classes:
    translation: maps to the "translation" table with columns:
        - id: primary key integer
        - text: original text (string, up to 255 chars)
        - result: translated text (string, up to 255 chars)
        - lang: target language code or name (string, up to 255 chars)
"""

from sqlalchemy import Column, Integer, String
from database import Base


class translation(Base):
    __tablename__ = "translation"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(255), index=True)
    result = Column(String(255), index=True)
    lang = Column(String(255), index=True)