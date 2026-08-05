from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class CustomSection(Base):
    __tablename__ = "custom_sections"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )


    resume = relationship(
        "Resume",
        back_populates="custom_sections"
    )


    entries = relationship(
        "CustomEntry",
        back_populates="section",
        cascade="all, delete-orphan"
    )



class CustomEntry(Base):
    __tablename__ = "custom_entries"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    section_id = Column(
        Integer,
        ForeignKey("custom_sections.id"),
        nullable=False
    )

    title = Column(
        String,
        nullable=True
    )

    description = Column(
        String,
        nullable=True
    )

    link = Column(
        String,
        nullable=True
    )


    section = relationship(
        "CustomSection",
        back_populates="entries"
    )