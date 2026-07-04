// src/ui/view/components/ExamPage/ExamToolbarStatCard.jsx
export default function ExamToolbarStatCard({ value, label, icon }) {
    return (
        <div className="exam-toolbar-stat-card">
            <div className="exam-toolbar-stat-icon" aria-hidden="true">
                {icon}
            </div>

            <div>
                <div className="exam-toolbar-stat-value">
                    {value}
                </div>

                <div className="exam-toolbar-stat-label">
                    {label}
                </div>
            </div>
        </div>
    );
}
