from sqlalchemy import Column, Integer, String

from app.db.database import Base

class ResumeEntry(Base):
    __tablename__ = "resume_entries"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    