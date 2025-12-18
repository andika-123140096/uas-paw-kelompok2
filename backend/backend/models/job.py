from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from .meta import Base


class Job(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True)
    employer_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String(255))
    description = Column(Text)
    requirements = Column(Text)
    salary = Column(String(100))
    location = Column(String(255))
    type = Column(String(50))
    
    employer = relationship('User', backref='jobs')