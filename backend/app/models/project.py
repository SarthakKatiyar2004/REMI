from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base


class Project(Base):
    __tablename__ = "projects"

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

    project_title = Column(
        String,
        nullable=False
    )

    description = Column(
        String,
        nullable=False
    )

    codebase_link = Column(
        String,
        nullable=True
    )

    demo_link = Column(
        String,
        nullable=True
    )


    resume = relationship(
        "Resume",
        back_populates="projects"
    )