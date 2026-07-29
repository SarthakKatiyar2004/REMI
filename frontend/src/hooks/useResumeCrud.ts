import { useState } from "react";

import type {
    Resume,
    Project,
    Education,
    Experience,
    CustomSection,
} from "../types/resume";

const initialResume: Resume = {
    id: 1,
    name: "",
    education: [],
    experience: [],
    projects: [],
    customSections: [],
};

function addSectionItem<T>(items: T[], newItem: T): T[] {
    return [...items, newItem];
}

function updateSectionItem<T extends { id: number }>(
    items: T[],
    updatedItem: T
): T[] {
    return items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
    );
}

function deleteSectionItem<T extends { id: number }>(
    items: T[],
    id: number
): T[] {
    return items.filter((item) => item.id !== id);
}

export function useResumeCrud() {
    const [resume, setResume] = useState(initialResume);

    const updateName = (name: string) => {
        setResume((prev) => ({
            ...prev,
            name,
        }));
    };

    const addProject = () => {
        setResume((prev) => ({
            ...prev,
            projects: addSectionItem(prev.projects, {
                id: Date.now(),
                title: "Untitled Project",
                description: "No description",
                links: [],
            }),
        }));
    };

    const updateProject = (project: Project) => {
        setResume((prev) => ({
            ...prev,
            projects: updateSectionItem(prev.projects, project),
        }));
    };

    const deleteProject = (id: number) => {
        setResume((prev) => ({
            ...prev,
            projects: deleteSectionItem(prev.projects, id),
        }));
    };

    const addEducation = () => {
        setResume((prev) => ({
            ...prev,
            education: addSectionItem(prev.education, {
                id: Date.now(),
                institute: "Institute",
                from: "MM/YYYY",
                to: "MM/YYYY",
                cgpa: undefined,
            }),
        }));
    };

    const updateEducation = (education: Education) => {
        setResume((prev) => ({
            ...prev,
            education: updateSectionItem(prev.education, education),
        }));
    };

    const deleteEducation = (id: number) => {
        setResume((prev) => ({
            ...prev,
            education: deleteSectionItem(prev.education, id),
        }));
    };

    const addExperience = () => {
        setResume((prev) => ({
            ...prev,
            experience: addSectionItem(prev.experience, {
                id: Date.now(),
                role: "Role",
                company: "Company",
                from: "MM/YYYY",
                to: "MM/YYYY",
                description: "Description",
            }),
        }));
    };

    const updateExperience = (experience: Experience) => {
        setResume((prev) => ({
            ...prev,
            experience: updateSectionItem(
                prev.experience,
                experience
            ),
        }));
    };

    const deleteExperience = (id: number) => {
        setResume((prev) => ({
            ...prev,
            experience: deleteSectionItem(
                prev.experience,
                id
            ),
        }));
    };

    const addCustomSection = () => {
        setResume((prev) => ({
            ...prev,
            customSections: addSectionItem(
                prev.customSections,
                {
                    id: Date.now(),
                    title: "New Section",
                    entries: [],
                }
            ),
        }));
    };

    const updateCustomSection = (
        section: CustomSection
    ) => {
        setResume((prev) => ({
            ...prev,
            customSections: updateSectionItem(
                prev.customSections,
                section
            ),
        }));
    };

    const deleteCustomSection = (id: number) => {
        setResume((prev) => ({
            ...prev,
            customSections: deleteSectionItem(
                prev.customSections,
                id
            ),
        }));
    };

    return {
        resume,
        updateName,
        addProject,
        updateProject,
        deleteProject,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
    };
}