// src/ui/view/components/ExamPage/ExamToolbar.jsx
import ExamToolbarActions from "./ExamToolbarActions.jsx";

export default function ExamToolbar(props) {
    return (
        <header className="exam-header">
            <div className="exam-header-container">
                <div className="exam-header-layout">
                    <ExamToolbarActions
                        answeredPercentLabel={props.answeredPercentLabel}
                        scoreLabel={props.scoreLabel}
                        elapsedTimeLabel={props.elapsedTimeLabel}
                        submitted={props.submitted}
                        onSubmit={props.onSubmit}
                        onReset={props.onReset}
                    />
                </div>
            </div>
        </header>
    );
}
