//src/ui/view/components/LearningSessionPage/SessionActionPanel.jsx
import { ArrowRight } from "lucide-react";

export default function SessionActionPanel({ feedbackAppearance, feedbackTitle, feedbackBody, primaryLabel, primaryAppearance, isPrimaryDisabled, onPrimaryPressed }) {
	const hasFeedback = feedbackTitle !== null || feedbackBody !== null;

	return (
		<section className={`learning-session-action-panel learning-session-action-panel--${feedbackAppearance}`} aria-live="polite">
			{hasFeedback ? (
				<div className="learning-session-action-panel__feedback">
					{feedbackTitle === null ? null : <h2>{feedbackTitle}</h2>}
					{feedbackBody === null ? null : <p>{feedbackBody}</p>}
				</div>
			) : null}
			<button className={`learning-session-primary learning-session-primary--${primaryAppearance}`} type="button" disabled={isPrimaryDisabled} onClick={onPrimaryPressed}>
				<span>{primaryLabel}</span>
				<ArrowRight aria-hidden="true" />
			</button>
		</section>
	);
}
