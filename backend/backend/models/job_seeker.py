from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from .meta import Base


class JobSeeker(Base):
    __tablename__ = 'job_seekers'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    skills = Column(Text)
    experience = Column(Text)
    cv_url = Column(String(255))
    
    user = relationship('User', backref='job_seeker')