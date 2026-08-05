import type {
    Project,
    Education,
    Experience,
    CustomSection,
    CustomEntry,
} from "../types/resume";


export function createProject(): Project {
    return {
        id: Date.now(),
        projectTitle: "Untitled Project",
        description: "No description",
        codebaseLink: "",
        demoLink: "",
    };
}


export function createEducation(): Education {
    return {
        id: Date.now(),
        instituteName: "Institute Name",
        degreeName: "Degree Name",
        fromDate: "MM/YYYY",
        toDate: "MM/YYYY",
        cgpa: "",
    };
}


export function createExperience(): Experience {
    return {
        id: Date.now(),
        roleTitle: "Role Title",
        instituteName: "Company/Organization",
        fromDate: "MM/YYYY",
        toDate: "MM/YYYY",
        location: "",
        description: "Description",
        certificateLink: "",
    };
}


export function createCustomSection(): CustomSection {
    return {
        id: Date.now(),
        title: "New Section",
        entries: [],
    };
}


export function createCustomEntry(): CustomEntry {
    return {
        id: Date.now(),
        title: "New Entry",
        description: "",
        link: "",
    };
}