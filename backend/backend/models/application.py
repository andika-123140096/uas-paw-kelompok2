from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship

from .meta import Base


class Application(Base):
    __tablename__ = 'applications'

    id = Column(Integer, primary_key=True)
    job_id = Column(Integer, ForeignKey('jobs.id'))
    seeker_id = Column(Integer, ForeignKey('job_seekers.id'))
    status = Column(String(50))
    applied_date = Column(DateTime, default=datetime.utcnow)
    
    job = relationship('Job', backref='applications')
    seeker = relationship('JobSeeker', backref='applications')