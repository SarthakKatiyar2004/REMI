from pydantic import BaseModel, Field, ConfigDict, model_validator
from typing import Any, Optional


# =========================
# Header
# =========================

class HeaderBase(BaseModel):
    name: str = ""
    email: str = ""
    contact: str = ""
    portfolio: Optional[str] = None
    address: Optional[str] = None


# =========================
# Education
# =========================

class EducationBase(BaseModel):

    institute_name: str = Field(
        alias="instituteName"
    )

    degree_name: str = Field(
        alias="degreeName"
    )

    from_date: str = Field(
        alias="fromDate"
    )

    to_date: str = Field(
        alias="toDate"
    )

    cgpa: Optional[str] = None


class EducationCreate(EducationBase):
    pass


class EducationResponse(EducationBase):

    id: int

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )


# =========================
# Experience
# =========================

class ExperienceBase(BaseModel):

    role_title: str = Field(
        alias="roleTitle"
    )

    institute_name: str = Field(
        alias="instituteName"
    )

    from_date: str = Field(
        alias="fromDate"
    )

    to_date: str = Field(
        alias="toDate"
    )

    location: Optional[str] = None

    description: str

    certificate_link: Optional[str] = Field(
        default=None,
        alias="certificateLink"
    )


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceResponse(ExperienceBase):

    id: int

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )


# =========================
# Projects
# =========================

class ProjectBase(BaseModel):

    project_title: str = Field(
        alias="projectTitle"
    )

    description: str

    codebase_link: Optional[str] = Field(
        default=None,
        alias="codebaseLink"
    )

    demo_link: Optional[str] = Field(
        default=None,
        alias="demoLink"
    )


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):

    id: int

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )


# =========================
# Custom Sections
# =========================

class CustomEntryBase(BaseModel):

    title: Optional[str] = None

    description: Optional[str] = None

    link: Optional[str] = None


class CustomEntryCreate(CustomEntryBase):
    pass


class CustomEntryResponse(CustomEntryBase):

    id: int

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )



class CustomSectionBase(BaseModel):

    title: str



class CustomSectionCreate(CustomSectionBase):

    entries: list[CustomEntryCreate] = Field(
        default_factory=list
    )



class CustomSectionResponse(CustomSectionBase):

    id: int

    entries: list[CustomEntryResponse] = Field(
        default_factory=list
    )

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )


# =========================
# Resume
# =========================

class ResumeCreate(BaseModel):

    header: HeaderBase

    education: list[EducationCreate] = Field(
        default_factory=list
    )

    experience: list[ExperienceCreate] = Field(
        default_factory=list
    )

    projects: list[ProjectCreate] = Field(
        default_factory=list
    )

    custom_sections: list[CustomSectionCreate] = Field(
        default_factory=list,
        alias="customSections"
    )

    model_config = ConfigDict(
        populate_by_name=True
    )


class ResumeUpdate(ResumeCreate):
    pass


class ResumeResponse(BaseModel):

    id: int

    header: HeaderBase

    education: list[EducationResponse] = Field(
        default_factory=list
    )

    experience: list[ExperienceResponse] = Field(
        default_factory=list
    )

    projects: list[ProjectResponse] = Field(
        default_factory=list
    )

    custom_sections: list[CustomSectionResponse] = Field(
        default_factory=list,
        alias="customSections"
    )

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )

    @model_validator(mode="before")
    @classmethod
    def nest_header_from_orm(cls, data: Any) -> Any:
        if isinstance(data, dict):
            if "header" in data:
                return data

            return {
                "id": data["id"],
                "header": {
                    "name": data.get("name", ""),
                    "email": data.get("email", ""),
                    "contact": data.get("contact", ""),
                    "portfolio": data.get("portfolio"),
                    "address": data.get("address"),
                },
                "education": data.get("education", []),
                "experience": data.get("experience", []),
                "projects": data.get("projects", []),
                "custom_sections": data.get(
                    "custom_sections",
                    data.get("customSections", []),
                ),
            }

        return {
            "id": data.id,
            "header": {
                "name": data.name or "",
                "email": data.email or "",
                "contact": data.contact or "",
                "portfolio": data.portfolio,
                "address": data.address,
            },
            "education": data.education,
            "experience": data.experience,
            "projects": data.projects,
            "custom_sections": data.custom_sections,
        }
