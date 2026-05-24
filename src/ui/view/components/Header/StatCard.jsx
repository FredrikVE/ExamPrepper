//src/ui/view/components/Header/StatCard.jsx
export default function StatCard({ value, label, icon }) {
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
