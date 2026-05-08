from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import redis
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from pydantic import BaseModel
import models
from typing import Annotated, List
from crud import get_item, create_item

app = FastAPI()

models.Base.metadata.create_all(bind=engine)
redis_client = redis.Redis(host='localhost',port=6379,db=0)

#Used for CORs when interacting with React
#FASTAPI uses LocalHost 8000 while React uses LocalHost 3000
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#Default check to make sure API is working
@app.get('/')
async def check():
    return 'hello'

#Allow for inheritence of the ID when ItemModel is called
#Create a Pydantic Model 
class WordBase(BaseModel):
    word: str
    translation: str
    setence: str

class WordModel(WordBase):
    id: int
    
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

#Update Database
@app.post("/items/", response_model=WordModel)
async def create_items(item: WordBase, db: db_dependency):
    # print('he')
    db_dict = models.Item(**word.model_dump())
    db.add(db_dict)
    db.commit()
    db.refresh(db_dict)
    return db_dict


@app.get("/items/", response_model=List[WordModel])
async def read_items(db: db_dependency, skip: int=0, limit: int=100):
    items = db.query(models.Item).offset(skip).limit(limit).all()
    return items

@app.put("/items/{item_id}")
async def update_item(item_id: int, name: str, description: str, price:int, db: db_dependency):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    item.name = name
    item.description = description
    item.price = price
    db.commit()
    db.refresh(item)
    return item


@app.delete("/items/{item_id}")
async def delete_items(item_id: int, db:Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()

    return {"detail":"Item Deleted"}

