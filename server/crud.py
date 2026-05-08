# from sqlalchemy.orm import Session
# from models import translation


# def get_translation(db:Session, item_id:int):
#     return db.query(Item).filter(Item.id == item_id).first()

# def create_translation(db:Session, name:str, description: str, price: int):
#     db_item = Item(name=name, description=description, price=price)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item
