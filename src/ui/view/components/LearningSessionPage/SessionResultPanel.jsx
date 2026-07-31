//src/ui/view/components/LearningSessionPage/SessionResultPanel.jsx
import { ArrowRight, Check, LogOut, RotateCcw, TrendingUp } from "lucide-react";

function ResultMark({ appearance }) {
	if (appearance === "strong") return <Check aria-hidden="true" />;
	if (appearance === "medium") return <TrendingUp aria-hidden="true" />;
	return <RotateCcw aria-hidden="true" />;
}

export default function SessionResultPanel({ appearance, eyebrow, title, body, statsLabel, pointsValue, pointsLabel, roundScoreValue, roundScoreLabel, moduleMasteryValue, moduleMasteryPercent, moduleMasteryLabel, nextStepLabel, nextStepBody, primaryLabel, secondaryLabel, isPrimaryDisabled, isSecondaryDisabled, actionErrorMessage, onPrimary, onSecondary }) {
	return (
		<section className={`learning-session-result learning-session-result--${appearance}`} aria-labelledby="learning-session-result-title">
			<div className="learning-session-result__intro">
				<div className="learning-session-result__mark" aria-hidden="true">
					<ResultMark appearance={appearance} />
				</div>
				<p className="learning-session-result__eyebrow">{eyebrow}</p>
				<h2 id="learning-session-result-title">{title}</h2>
				<p className="learning-session-result__body">{body}</p>
			</div>

			<div className="learning-session-result__stats" aria-label={statsLabel}>
				<div>
					<strong>{pointsValue}</strong>
					<span>{pointsLabel}</span>
				</div>
				<span className="learning-session-result__stats-divider" aria-hidden="true" />
				<div>
					<strong>{roundScoreValue}</strong>
					<span>{roundScoreLabel}</span>
				</div>
			</div>

			<div className="learning-session-result__module-progress">
				<div className="learning-session-result__module-progress-heading">
					<span>{moduleMasteryLabel}</span>
					<strong>{moduleMasteryValue}</strong>
				</div>
				<div className="learning-session-result__module-progress-track" aria-hidden="true">
					<span style={{ width: `${moduleMasteryPercent}%` }} />
				</div>
				<strong className="learning-session-result__next-step-label">{nextStepLabel}</strong>
				<p>{nextStepBody}</p>
			</div>

			{actionErrorMessage !== null && <p className="learning-session-result__action-error" role="alert">{actionErrorMessage}</p>}

			<div className={`learning-session-result__actions${secondaryLabel === null ? " learning-session-result__actions--single" : ""}`}>
				{secondaryLabel !== null && (
					<button className="learning-session-result__secondary" type="button" disabled={isSecondaryDisabled} onClick={onSecondary}>
						<LogOut aria-hidden="true" />
						<span>{secondaryLabel}</span>
					</button>
				)}
				<button className="learning-session-result__continue" type="button" disabled={isPrimaryDisabled} onClick={onPrimary}>
					<span>{primaryLabel}</span>
					<ArrowRight aria-hidden="true" />
				</button>
			</div>
		</section>
	);
}
