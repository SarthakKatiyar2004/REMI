from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class Experience(Base):
    __tablename__ = "experiences"

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

    role_title = Column(
        String,
        nullable=False
    )

    institute_name = Column(
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

    location = Column(
        String,
        nullable=True
    )

    description = Column(
        String,
        nullable=False
    )

    certificate_link = Column(
        String,
        nullable=True
    )


    resume = relationship(
        "Resume",
        back_populates="experience"
    )