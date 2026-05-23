//src/ui/view/components/ExamHeader/ExamHeaderStatCard.jsx
export default function ExamHeaderStatCard({ value, label }) {
    return (
        <div className="exam-header-stat-card">
            <div className="exam-header-stat-value">
                {value}
            </div>

            <div className="exam-header-stat-label">
                {label}
            </div>
        </div>
    );
}