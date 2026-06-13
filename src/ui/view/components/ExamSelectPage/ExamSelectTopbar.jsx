// src/ui/view/components/ExamSelectPage/ExamSelectTopbar.jsx
import { ChevronRight, Trophy } from "lucide-react";

export default function ExamSelectTopbar({ title, statisticsLabel, onShowStatistics }) {
    return (
        <div className="exam-select-topbar">
            <h1 className="exam-select-title">
                {title}
            </h1>

            <button type="button" className="exam-select-statistics-button" onClick={onShowStatistics}>
                <Trophy className="exam-select-statistics-icon" />
                <span>{statisticsLabel}</span>
                <ChevronRight className="exam-select-statistics-chevron" />
            </button>
        </div>
    );
}
