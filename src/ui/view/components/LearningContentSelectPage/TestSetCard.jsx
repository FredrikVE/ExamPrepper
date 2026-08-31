// src/ui/view/components/LearningContentSelectPage/TestSetCard.jsx
import { BookOpen, ChevronRight, CircleHelp, Clock3 } from "lucide-react";
import FormattedText from "../Shared/FormattedText.jsx";

const DEFAULT_ESTIMATED_MINUTES = "45–60";

export default function TestSetCard({ testSet, index, practiceExamLabel, questionLabel, minuteLabel, onSelectTestSet }) {
	const modeLabel = testSet.modeLabel ?? practiceExamLabel(index + 1);
	const estimatedMinutes = testSet.estimatedMinutes ?? DEFAULT_ESTIMATED_MINUTES;
	const accentIndex = index % 6 + 1;
	const titleId = `exam-select-card-title-${testSet.id}`;
	const descriptionId = `exam-select-card-description-${testSet.id}`;

	return (
		<article className={`exam-select-card exam-select-card-${accentIndex}`}>
			<button
				type="button"
				className="exam-select-card-action"
				onClick={() => onSelectTestSet(testSet.id)}
				aria-labelledby={`${titleId} ${descriptionId}`}
			/>

			<div className="exam-select-card-main-row">
				<div className="exam-select-card-icon-wrapper" aria-hidden="true">
					<BookOpen className="exam-select-card-icon" />
				</div>

				<div className="exam-select-card-copy">
					<p className="exam-select-card-eyebrow">
						{modeLabel}
					</p>

					<h2 id={titleId} className="exam-select-card-title">
						{testSet.title}
					</h2>

					<p id={descriptionId} className="exam-select-card-description">
						<FormattedText text={testSet.description} />
					</p>
				</div>
			</div>

			<div className="exam-select-card-footer">
				<div className="exam-select-card-meta">
					<CircleHelp className="exam-select-card-meta-icon" />
					<div>
						<strong>{testSet.questionCount}</strong>
						<span>{questionLabel}</span>
					</div>
				</div>

				<div className="exam-select-card-footer-divider" aria-hidden="true" />

				<div className="exam-select-card-meta">
					<Clock3 className="exam-select-card-meta-icon" />
					<div>
						<strong>{estimatedMinutes}</strong>
						<span>{minuteLabel}</span>
					</div>
				</div>

				<span className="exam-select-card-arrow" aria-hidden="true">
					<ChevronRight className="exam-select-card-arrow-icon" />
				</span>
			</div>
		</article>
	);
}
