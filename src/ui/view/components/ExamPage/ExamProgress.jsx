//src/ui/view/components/ExamPage/ExamProgress.jsx
import { Flag } from "lucide-react";
import { buildExamProgressPoints } from "../../../../utils/examPageUtils/buildExamProgressPoints.js";

const getProgressPointClassName = (isActive) => {
    if (isActive) {
        return "exam-progress-point exam-progress-point-active";
    }

    return "exam-progress-point";
};

const ExamProgressPointIcon = ({ isFlag }) => {
    if (isFlag) {
        return <Flag className="exam-progress-flag" />;
    }

    return <span className="exam-progress-dot" />;
};

const ExamProgressPoint = ({
    point,
    currentQuestionNumber,
    onGoToQuestion
}) => {
    const isActive = currentQuestionNumber >= point.question;

    return (
        <button
            type="button"
            className={getProgressPointClassName(isActive)}
            style={{ left: `${point.left}%` }}
            onClick={() => onGoToQuestion(point.question - 1)}
        >
            <ExamProgressPointIcon isFlag={point.isFlag} />
            <span>{point.label}</span>
        </button>
    );
};

export default function ExamProgress({
    visibleQuestions,
    currentQuestionIndex,
    onGoToQuestion
}) {
    const total = Math.max(visibleQuestions.length, 1);
    const currentQuestionNumber = Math.min(currentQuestionIndex + 1, total);

    const { fillPercent, points } = buildExamProgressPoints({
        total,
        currentQuestionNumber
    });

    return (
        <div className="exam-progress" aria-label="Exam progress">
            <div className="exam-progress-track">
                <div className="exam-progress-line" />

                <div
                    className="exam-progress-fill"
                    style={{
                        width: `calc(${fillPercent}% - ${fillPercent === 100 ? 8 : 0}px)`
                    }}
                />

                {points.map((point) => (
                    <ExamProgressPoint
                        key={`${point.label}-${point.question}`}
                        point={point}
                        currentQuestionNumber={currentQuestionNumber}
                        onGoToQuestion={onGoToQuestion}
                    />
                ))}
            </div>
        </div>
    );
}