from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey, Table, CHAR
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Initialize the base class for declarative models
Base = declarative_base()

# Define your engine (replace with your actual database URL)
DATABASE_URL = "postgresql://user:password@localhost/dining_hall"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()
