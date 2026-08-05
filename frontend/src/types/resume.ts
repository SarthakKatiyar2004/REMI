export interface Header {
    name: string;
    email: string;
    contact: string;
    portfolio?: string;
    address?: string;
}

export interface Education {
    id: number;
    instituteName: string;
    degreeName: string;
    fromDate: string;
    toDate: string;
    cgpa?: string;
}

export interface Experience {
    id: number;
    roleTitle: string;
    instituteName: string;
    fromDate: string;
    toDate: string;
    location?: string;
    description: string;
    certificateLink?: string;
}

export interface Project {
    id: number;
    projectTitle: string;
    description: string;
    codebaseLink?: string;
    demoLink?: string;
}

export interface CustomEntry {
    id: number;
    title?: string;
    description?: string;
    link?: string;
}

export interface CustomSection {
    id: number;
    title: string;
    entries: CustomEntry[];
}

export interface Resume {
    id: number;
    header: Header;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    customSections: CustomSection[];
}