export interface Resume {
    id: number;
    name: string;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    customSections: CustomSection[];
}

export interface Education {
    id: number;
    institute: string;
    from: string;
    to?: string;
    cgpa?: number;
}

export interface Experience {
    id: number;
    role: string;
    company: string;
    from: string;
    to?: string;
    description: string;
    links?: Link[];
}

export interface Project {
    id: number;
    title: string;
    description: string;
    links?: Link[];
}

export interface CustomSection {
    id: number;
    title: string;
    entries: CustomEntry[];
}

export interface CustomEntry {
    id: number;
    title: string;
    description: string;
    links?: Link[];
}

export interface Link {
    id: number;
    label?: string;
    url: string;
}