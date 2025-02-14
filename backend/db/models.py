from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship

Base = declarative_base()

class Allergen(Base):
    __tablename__ = "allergen"

    allergen_id = Column(Integer, primary_key=True)
    allergen_code = Column(String(5), nullable=False, unique=True)
    description = Column(String(50), nullable=False)

    menu_items = relationship("MenuItemAllergen", back_populates="allergen")

class Location(Base):
    __tablename__ = "location"
    location_id = Column(Integer, primary_key=True)
    location_name = Column(String(50), nullable=False, unique=True)

class MealType(Base):
    __tablename__ = "meal_type"
    meal_type_id = Column(Integer, primary_key=True)
    meal_type_name = Column(String(20), nullable=False, unique=True)

class MenuItem(Base):
    __tablename__ = "menu_item"
    item_id = Column(Integer, primary_key=True)
    item_name = Column(String(100), nullable=False, unique=True)
    ai_description = Column(String(255), nullable=True) 
    
class MenuItemAllergen(Base):
    __tablename__ = "menu_item_allergen"

    availability_id = Column(Integer, ForeignKey("menu_availability.availability_id", ondelete="CASCADE"), primary_key=True)
    allergen_id = Column(Integer, ForeignKey("allergen.allergen_id", ondelete="CASCADE"), primary_key=True)

    # Relationships
    availability = relationship("MenuAvailability", back_populates="allergens")
    allergen = relationship("Allergen", back_populates="menu_items")

class AlwaysAvailable(Base):
    __tablename__ = "always_available"
    meal_type_id = Column(Integer, ForeignKey("meal_type.meal_type_id"), primary_key=True)
    item_id = Column(Integer, ForeignKey("menu_item.item_id"), primary_key=True)
    meal_type = relationship("MealType")
    menu_item = relationship("MenuItem")

class MenuAvailability(Base):
    __tablename__ = "menu_availability"

    availability_id = Column(Integer, primary_key=True)
    day_id = Column(Integer, ForeignKey("day.day_id"))
    meal_type_id = Column(Integer, ForeignKey("meal_type.meal_type_id"))
    location_id = Column(Integer, ForeignKey("location.location_id"))
    item_id = Column(Integer, ForeignKey("menu_item.item_id"))
    allergen_id = Column(Integer, ForeignKey("allergen.allergen_id", ondelete="SET NULL"))

    meal_type = relationship("MealType")
    location = relationship("Location")
    menu_item = relationship("MenuItem")
    allergen = relationship("Allergen")
    day = relationship("Day", back_populates="menu_availabilities")
    allergens = relationship("MenuItemAllergen", back_populates="availability")

class Cycle(Base):
    __tablename__ = "cycle"
    cycle_id = Column(Integer, primary_key=True)
    cycle_name = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    cycle_identifier = Column(String, nullable=False)

    days = relationship("Day", back_populates="cycle")
class Day(Base):
    __tablename__ = "day"
    day_id = Column(Integer, primary_key=True)
    day_name = Column(String(10), nullable=False)
    cycle_id = Column(Integer, ForeignKey("cycle.cycle_id"))

    cycle = relationship("Cycle", back_populates="days")
    menu_availabilities = relationship("MenuAvailability", back_populates="day")

    


