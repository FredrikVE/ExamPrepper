//src/ui/view/pages/ExamSelectPage.jsx
import { ClipboardList, ChevronRight, BookOpen } from "lucide-react";

export default function ExamSelectPage({ exams, onSelectExam }) {
    return (
        <div className="exam-select-page">
            <div className="exam-select-container">
                <header className="exam-select-header">
                    <div className="exam-select-icon-wrapper">
                        <ClipboardList className="exam-select-main-icon" />
                    </div>

                    <h1 className="exam-select-title">
                        IN5431 Eksamens-emulator
                    </h1>

                    <p className="exam-select-subtitle">
                        Velg en øveeksamen for å starte
                    </p>
                </header>

                <div className="exam-select-list">
                    {exams.map((exam) => (
                        <button
                            key={exam.id}
                            onClick={() => onSelectExam(exam.id)}
                            className="exam-select-card"
                        >
                            <div className="exam-select-card-icon-wrapper">
                                <BookOpen className="exam-select-card-icon" />
                            </div>

                            <div className="exam-select-card-content">
                                <h2 className="exam-select-card-title">
                                    {exam.title}
                                </h2>

                                <p className="exam-select-card-description">
                                    {exam.description}
                                </p>

                                <span className="exam-select-card-meta">
                                    {exam.questionCount} spørsmål
                                </span>
                            </div>

                            <ChevronRight className="exam-select-card-arrow" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}