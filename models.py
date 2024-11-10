from sqlalchemy import Column, Integer, String, Date, CHAR, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

# Initialize the declarative base
Base = declarative_base()

# Allergen Model
class Allergen(Base):
    __tablename__ = 'allergen'

    allergen_id = Column(Integer, primary_key=True)
    allergen_code = Column(String(5), nullable=False)
    description = Column(String(50), nullable=False)

    # Relationship to MenuAvailability
    menu_availability = relationship("MenuAvailability", back_populates="allergen")

    def __repr__(self):
        return f"<Allergen(id={self.allergen_id}, code='{self.allergen_code}', description='{self.description}')>"

# AlwaysAvailable Model
class AlwaysAvailable(Base):
    __tablename__ = 'always_available'

    meal_type_id = Column(Integer, ForeignKey('meal_type.meal_type_id'), primary_key=True)
    item_id = Column(Integer, ForeignKey('menu_item.item_id'), primary_key=True)

    # Relationships
    meal_type = relationship("MealType", back_populates="always_available")
    item = relationship("MenuItem", back_populates="always_available")

    def __repr__(self):
        return f"<AlwaysAvailable(meal_type_id={self.meal_type_id}, item_id={self.item_id})>"

# Cycle Model
class Cycle(Base):
    __tablename__ = 'cycle'

    cycle_id = Column(Integer, primary_key=True)
    cycle_name = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    cycle_identifier = Column(CHAR, nullable=True)

    # Relationship to Day
    days = relationship("Day", back_populates="cycle")

    def __repr__(self):
        return f"<Cycle(id={self.cycle_id}, name='{self.cycle_name}', start_date={self.start_date})>"

# Day Model
class Day(Base):
    __tablename__ = 'day'

    day_id = Column(Integer, primary_key=True)
    day_name = Column(String(10), nullable=False)
    cycle_id = Column(Integer, ForeignKey('cycle.cycle_id'), nullable=True)

    # Relationship to Cycle
    cycle = relationship("Cycle", back_populates="days")
    menu_availability = relationship("MenuAvailability", back_populates="day")

    def __repr__(self):
        return f"<Day(id={self.day_id}, name='{self.day_name}', cycle_id={self.cycle_id})>"

# Location Model
class Location(Base):
    __tablename__ = 'location'

    location_id = Column(Integer, primary_key=True)
    location_name = Column(String(50), nullable=False)

    # Relationship to MenuAvailability
    menu_availability = relationship("MenuAvailability", back_populates="location")

    def __repr__(self):
        return f"<Location(id={self.location_id}, name='{self.location_name}')>"

# MealType Model
class MealType(Base):
    __tablename__ = 'meal_type'

    meal_type_id = Column(Integer, primary_key=True)
    meal_type_name = Column(String(20), nullable=False)

    # Relationships
    always_available = relationship("AlwaysAvailable", back_populates="meal_type")
    menu_availability = relationship("MenuAvailability", back_populates="meal_type")

    def __repr__(self):
        return f"<MealType(id={self.meal_type_id}, name='{self.meal_type_name}')>"

# MenuAvailability Model
class MenuAvailability(Base):
    __tablename__ = 'menu_availability'

    availability_id = Column(Integer, primary_key=True)
    day_id = Column(Integer, ForeignKey('day.day_id'), nullable=True)
    meal_type_id = Column(Integer, ForeignKey('meal_type.meal_type_id'), nullable=True)
    location_id = Column(Integer, ForeignKey('location.location_id'), nullable=True)
    item_id = Column(Integer, ForeignKey('menu_item.item_id'), nullable=True)
    allergen_id = Column(Integer, ForeignKey('allergen.allergen_id'), nullable=True)

    # Relationships
    day = relationship("Day", back_populates="menu_availability")
    meal_type = relationship("MealType", back_populates="menu_availability")
    location = relationship("Location", back_populates="menu_availability")
    allergen = relationship("Allergen", back_populates="menu_availability")
    item = relationship("MenuItem", back_populates="menu_availability")

    def __repr__(self):
        return f"<MenuAvailability(id={self.availability_id})>"

# MenuItem Model
class MenuItem(Base):
    __tablename__ = 'menu_item'

    item_id = Column(Integer, primary_key=True)
    item_name = Column(String(100), nullable=False)

    # Relationships
    always_available = relationship("AlwaysAvailable", back_populates="item")
    menu_availability = relationship("MenuAvailability", back_populates="item")

    def __repr__(self):
        return f"<MenuItem(id={self.item_id}, name='{self.item_name}')>"

# MenuItemAllergen Model
class MenuItemAllergen(Base):
    __tablename__ = 'menu_item_allergen'

    availability_id = Column(Integer, ForeignKey('menu_availability.availability_id'), primary_key=True)
    allergen_id = Column(Integer, ForeignKey('allergen.allergen_id'), primary_key=True)

    # Relationships
    allergen = relationship("Allergen")

    def __repr__(self):
        return f"<MenuItemAllergen(availability_id={self.availability_id}, allergen_id={self.allergen_id})>"
