import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from dotenv import load_dotenv

# Load the variables from .env into the environment
load_dotenv()


# Read the database URL from the environment to avoid committing secrets.
# Example: export DATABASE_URL='mysql+pymysql://user:password@localhost:3306/dbname'
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
	raise RuntimeError("DATABASE_URL environment variable is not set")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()