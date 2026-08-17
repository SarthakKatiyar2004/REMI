import type { Resume } from "../../types/resume";

interface ResumePreviewProps {
    resume: Resume;
    onBack: () => void;
}

function ResumePreview({ resume, onBack }: ResumePreviewProps) {
    return (
        <div className="resume-preview">
            <div className="editor-header">
                <h1>Tailored Resume Preview</h1>
                <button type="button" className="btn-secondary" onClick={onBack}>
                    Back to Master Resume
                </button>
            </div>
            
            <section className="section-card">
                <div className="preview-header text-center">
                    <h2>{resume.header.name}</h2>
                    <p>
                        {resume.header.email} | {resume.header.contact}
                        {resume.header.portfolio && ` | ${resume.header.portfolio}`}
                        {resume.header.address && ` | ${resume.header.address}`}
                    </p>
                </div>
            </section>

            <section className="section-card">
                <h2>Education</h2>
                {resume.education.map(edu => (
                    <div key={edu.id} className="preview-entry">
                        <h3>{edu.degreeName}</h3>
                        <p>{edu.instituteName} | {edu.fromDate} - {edu.toDate}</p>
                        {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                    </div>
                ))}
            </section>

            <section className="section-card">
                <h2>Experience</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="preview-entry">
                        <h3>{exp.roleTitle}</h3>
                        <p>{exp.instituteName} | {exp.fromDate} - {exp.toDate}</p>
                        <p className="preview-desc">{exp.description}</p>
                    </div>
                ))}
            </section>

            <section className="section-card">
                <h2>Projects</h2>
                {resume.projects.map(proj => (
                    <div key={proj.id} className="preview-entry">
                        <h3>{proj.projectTitle}</h3>
                        <p className="preview-desc">{proj.description}</p>
                    </div>
                ))}
            </section>

            {resume.customSections.map(section => (
                <section key={section.id} className="section-card">
                    <h2>{section.title}</h2>
                    {section.entries.map(entry => (
                        <div key={entry.id} className="preview-entry">
                            <h3>{entry.title}</h3>
                            <p className="preview-desc">{entry.description}</p>
                        </div>
                    ))}
                </section>
            ))}
            
            <div className="preview-actions" style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
                <p className="section-hint">Copy and paste this text, or print it to PDF!</p>
            </div>
        </div>
    );
}

export default ResumePreview;
