// src/ui/view/components/Header/Header.jsx
import HeaderActions from "./HeaderActions.jsx";

export default function Header({ visibleQuestionCount, answeredCount, scoreLabel, elapsedTimeLabel, submitted, onSubmitExam, onResetExam }) {
    return (
        <header className="exam-header">
            <div className="exam-header-container">
                <div className="exam-header-layout">
                    <HeaderActions
                        visibleQuestionCount={visibleQuestionCount}
                        answeredCount={answeredCount}
                        scoreLabel={scoreLabel}
                        elapsedTimeLabel={elapsedTimeLabel}
                        submitted={submitted}
                        onSubmitExam={onSubmitExam}
                        onResetExam={onResetExam}
                    />
                </div>
            </div>
        </header>
    );
}
