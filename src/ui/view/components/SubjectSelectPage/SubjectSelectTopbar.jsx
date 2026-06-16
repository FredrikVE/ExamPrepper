// src/ui/view/components/SubjectSelectPage/SubjectSelectTopbar.jsx
export default function SubjectSelectTopbar({ t }) {
    return (
        <div className="subject-select-topbar">
            <div>
                <h1 className="subject-select-title">
                    {t.subjectSelectTitle}
                </h1>

                <p className="subject-select-subtitle">
                    {t.subjectSelectSubtitle}
                </p>
            </div>
        </div>
    );
}
