from sqlalchemy import Column, Integer, String, Text, ForeignKey

from .meta import Base


class JobSeeker(Base):
    __tablename__ = 'job_seekers'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    skills = Column(Text)
    experience = Column(Text)
    cv_url = Column(String(255))