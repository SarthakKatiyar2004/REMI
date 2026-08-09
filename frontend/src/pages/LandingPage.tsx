interface LandingPageProps {
    onStart: () => void;
}

function LandingPage({ onStart }: LandingPageProps) {
    return (
        <div className="landing">
            <div className="landing-content">
                <p className="landing-eyebrow">Resume Management &amp; Intelligence</p>

                <h1 className="landing-title">
                    <span className="landing-title-highlight">REMI</span>
                </h1>

                <p className="landing-description">
                    Keep one master resume. Give REMI a job description, and it
                    picks out the details worth leading with — so every
                    application reads like it was written for that role.
                </p>

                <button
                    type="button"
                    className="btn-primary landing-cta"
                    onClick={onStart}
                >
                    Try It Out
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
