# Put into a Python file in your project.
# Activate your virtual environment.
# Run with python file_name.py.
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

pony_handlers = Table(
    "pony_handlers",
    Base.metadata,
    Column("pony_id", ForeignKey("ponies.id"), primary_key=True),
    Column("handler_id", ForeignKey("handlers.id"), primary_key=True))


class Owner(Base):
    __tablename__ = 'owners'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))

    ponies = relationship("Pony", back_populates="owner")


class Pony(Base):
    __tablename__ = "ponies"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    birth_year = Column(Integer)
    breed = Column(String(255))
    owner_id = Column(Integer, ForeignKey("owners.id"))

    owner = relationship("Owner", back_populates="ponies")
    handlers = relationship("Handler",
                            secondary=pony_handlers,
                            back_populates="ponies")


class Handler(Base):
    __tablename__ = "handlers"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    employee_id = Column(String(12))

    ponies = relationship("Pony",
                          secondary=pony_handlers,
                          back_populates="handlers")


db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()


pony_query = session.query(Pony).filter(Pony.name.ilike("%u%")).filter(Pony.birth_year < 2015)
print(pony_query)


# # Do stuff with the session

# you = Owner(first_name="your first name",
#             last_name="your last name",
#             email="your email")

# your_pony = Pony(name="your pony's name",
#                  birth_year=2020,
#                  breed="whatever you want",
#                  owner=you)

# print(you.id)         # > None
# print(your_pony.id)   # > None

# # The Session object has already been created and
# # bound to the engine.
# session.add(you)      # Connects you and your_pony objects
# session.commit()      # Saves data to the database

# print(you.id)         # > 4 (or whatever the new id is)
# print(your_pony.id)   # > 4 (or whatever the new id is)







session.close()
engine.dispose()