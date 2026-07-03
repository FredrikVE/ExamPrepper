// src/ui/view/components/ExamPage/ExamToolbarStatCard.jsx
export default function ExamToolbarStatCard({ value, label, icon }) {
    return (
        <div className="exam-header-stat-card">
            <div className="exam-header-stat-icon" aria-hidden="true">
                {icon}
            </div>

            <div>
                <div className="exam-header-stat-value">
                    {value}
                </div>

                <div className="exam-header-stat-label">
                    {label}
                </div>
            </div>
        </div>
    );
}
