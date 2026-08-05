from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class Education(Base):
    __tablename__ = "educations"

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

    institute_name = Column(
        String,
        nullable=False
    )

    degree_name = Column(
        String,
        nullable=False
    )

    from_date = Column(
        String,
        nullable=False
    )

    to_date = Column(
        String,
        nullable=False
    )

    cgpa = Column(
        String,
        nullable=True
    )


    resume = relationship(
        "Resume",
        back_populates="education"
    )