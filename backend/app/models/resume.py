from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False,
        default=""
    )

    email = Column(
        String,
        nullable=False,
        default=""
    )

    contact = Column(
        String,
        nullable=False,
        default=""
    )

    portfolio = Column(
        String,
        nullable=True
    )

    address = Column(
        String,
        nullable=True
    )


    education = relationship(
        "Education",
        back_populates="resume",
        cascade="all, delete-orphan"
    )

    experience = relationship(
        "Experience",
        back_populates="resume",
        cascade="all, delete-orphan"
    )

    projects = relationship(
        "Project",
        back_populates="resume",
        cascade="all, delete-orphan"
    )

    custom_sections = relationship(
        "CustomSection",
        back_populates="resume",
        cascade="all, delete-orphan"
    )