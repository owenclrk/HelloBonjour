from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from pydantic import BaseModel
import models
from typing import Annotated, List
from translate import translate_word
from ai import query_gemini
#from crud import get_item, create_item

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

#Used for CORs when interacting with React
#FASTAPI uses LocalHost 8000 while React uses LocalHost 3000
origins = [
    "http://localhost:3000",
    "http://frontend:3000",
    "https://hellobonjour-production-65d0.up.railway.app"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



#Allow for inheritence of the ID when WordModel is called
#Create a Pydantic Model 
class WordBase(BaseModel):
    text: str
    result: str
    lang: str

class WordModel(WordBase):
    id: int

class QuestionModel(BaseModel):
    word: str
    question: str
    
#Function to connect to Database. Insures proper connectiona and closure.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Allows for neater and cleaner way to call database. Called from typing library. If not here, this code would need to always used: db: Session = Depends(get_db)
db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

#Default check to make sure API is working
@app.get('/')
async def check():
    return 'Hello'

#Read the dictionary 
@app.get("/dict/", response_model=List[WordModel])
async def read_items(db: db_dependency, skip: int=0, limit: int=100):
    dict = db.query(models.translation).order_by(models.translation.id.desc()).offset(skip).limit(limit).all()
    return dict



# --- CREATE ---
#Create an entry for a translated word
@app.post("/dict/", response_model=WordModel)
async def create_translation(item: WordBase, db: db_dependency):
    db_dict = models.translation(**item.model_dump())
    db_dict.result = translate_word(db_dict.text,db_dict.lang)
    print (db_dict.result)
    db.add(db_dict)
    db.commit()
    db.refresh(db_dict)
    return db_dict


#Check the dictonary for a word based on its ID
@app.put("/dict/{id}")
async def update_item(id: int, text: str, result: str, lang: str, db: db_dependency):
    dict = db.query(models.translation).filter(models.translation.id == id).first()
    if dict is None:
        raise HTTPException(status_code=404, detail="Item not found")
    dict.text = text
    dict.result = result
    dict.lang = lang
    db.commit()
    db.refresh(dict)
    return dict

#Remove translation from the history
@app.delete("/dict/{id}")
async def delete_items(id: int, db:Session = Depends(get_db)):
    item = db.query(models.translation).filter(models.translation.id == id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()

    return {"detail":"Item Deleted"}


#In Progress
#Access database and get a list of the translated words
#Create interface to allow client to interact and check spelling.
@app.get("/questions/", response_model=List[WordModel])
async def generate_questions(db: db_dependency):
    list = []
    dict = db.query(models.translation).all()
    for query in dict:
        list.append(query.result)
    return dict