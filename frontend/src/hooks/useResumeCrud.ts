import { useState } from "react";
import { updateResume } from "../api/resumeApi";

import type {
    Resume,
    Header,
    Project,
    Education,
    Experience,
    CustomSection,
    CustomEntry,
} from "../types/resume";

import {
    createProject,
    createEducation,
    createExperience,
    createCustomSection,
    createCustomEntry,
} from "../utils/resumeFactories";


type ResumeSectionArrays = {
    education: Education[];
    experience: Experience[];
    projects: Project[];
    customSections: CustomSection[];
};


export function useResumeCrud(initialResume: Resume) {

    const [resume, setResume] = useState(initialResume);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    async function saveResume() {
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);

        try {
            const { id, ...resumePayload } = resume;
            const savedResume = await updateResume(id, resumePayload);
            setResume(savedResume);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error(error);
            setSaveError("Unable to save resume.");
        } finally {
            setIsSaving(false);
        }
    }


    function updateHeader(header: Header) {
        setResume((prev) => ({
            ...prev,
            header,
        }));
    }


    // -------------------------
    // Generic Top-Level CRUD
    // -------------------------


    function addItem<K extends keyof ResumeSectionArrays>(
        section: K,
        item: ResumeSectionArrays[K][number]
    ) {
        setResume((prev) => ({
            ...prev,
            [section]: [
                ...prev[section],
                item,
            ],
        }));
    }


    function updateItem<K extends keyof ResumeSectionArrays>(
        section: K,
        item: ResumeSectionArrays[K][number]
    ) {
        setResume((prev) => ({
            ...prev,
            [section]: prev[section].map(
                (currentItem) =>
                    currentItem.id === item.id
                        ? item
                        : currentItem
            ),
        }));
    }


    function deleteItem<K extends keyof ResumeSectionArrays>(
        section: K,
        id: number
    ) {
        setResume((prev) => ({
            ...prev,
            [section]: prev[section].filter(
                (item) => item.id !== id
            ),
        }));
    }



    // -------------------------
    // Generic Nested CRUD
    // -------------------------


    function addNestedItem(
        sectionId: number,
        item: CustomEntry
    ) {
        setResume((prev) => ({
            ...prev,
            customSections:
                prev.customSections.map(
                    (section) =>
                        section.id === sectionId
                            ? {
                                ...section,
                                entries: [
                                    ...section.entries,
                                    item,
                                ],
                            }
                            : section
                ),
        }));
    }


    function updateNestedItem(
        sectionId: number,
        item: CustomEntry
    ) {
        setResume((prev) => ({
            ...prev,
            customSections:
                prev.customSections.map(
                    (section) =>
                        section.id === sectionId
                            ? {
                                ...section,
                                entries:
                                    section.entries.map(
                                        (entry) =>
                                            entry.id === item.id
                                                ? item
                                                : entry
                                    ),
                            }
                            : section
                ),
        }));
    }


    function deleteNestedItem(
        sectionId: number,
        entryId: number
    ) {
        setResume((prev) => ({
            ...prev,
            customSections:
                prev.customSections.map(
                    (section) =>
                        section.id === sectionId
                            ? {
                                ...section,
                                entries:
                                    section.entries.filter(
                                        (entry) =>
                                            entry.id !== entryId
                                    ),
                            }
                            : section
                ),
        }));
    }



    // -------------------------
    // Projects
    // -------------------------


    const addProject = () => {
        addItem(
            "projects",
            createProject()
        );
    };


    const updateProject = (
        project: Project
    ) => {
        updateItem(
            "projects",
            project
        );
    };


    const deleteProject = (
        id: number
    ) => {
        deleteItem(
            "projects",
            id
        );
    };



    // -------------------------
    // Education
    // -------------------------


    const addEducation = () => {
        addItem(
            "education",
            createEducation()
        );
    };


    const updateEducation = (
        education: Education
    ) => {
        updateItem(
            "education",
            education
        );
    };


    const deleteEducation = (
        id: number
    ) => {
        deleteItem(
            "education",
            id
        );
    };



    // -------------------------
    // Experience
    // -------------------------


    const addExperience = () => {
        addItem(
            "experience",
            createExperience()
        );
    };


    const updateExperience = (
        experience: Experience
    ) => {
        updateItem(
            "experience",
            experience
        );
    };


    const deleteExperience = (
        id: number
    ) => {
        deleteItem(
            "experience",
            id
        );
    };



    // -------------------------
    // Custom Sections
    // -------------------------


    const addCustomSection = () => {
        addItem(
            "customSections",
            createCustomSection()
        );
    };


    const updateCustomSection = (
        section: CustomSection
    ) => {
        updateItem(
            "customSections",
            section
        );
    };


    const deleteCustomSection = (
        id:number
    ) => {
        deleteItem(
            "customSections",
            id
        );
    };



    // -------------------------
    // Custom Entries
    // -------------------------


    const addCustomEntry = (
        sectionId:number
    ) => {
        addNestedItem(
            sectionId,
            createCustomEntry()
        );
    };


    const updateCustomEntry = (
        sectionId:number,
        entry:CustomEntry
    ) => {
        updateNestedItem(
            sectionId,
            entry
        );
    };


    const deleteCustomEntry = (
        sectionId:number,
        entryId:number
    ) => {
        deleteNestedItem(
            sectionId,
            entryId
        );
    };



    return {

        resume,
        saveResume,
        isSaving,
        saveError,
        saveSuccess,

        updateHeader,


        addEducation,
        updateEducation,
        deleteEducation,


        addExperience,
        updateExperience,
        deleteExperience,


        addProject,
        updateProject,
        deleteProject,


        addCustomSection,
        updateCustomSection,
        deleteCustomSection,


        addCustomEntry,
        updateCustomEntry,
        deleteCustomEntry,

    };
}