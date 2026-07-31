//src/ui/view/components/LearningSessionPage/SessionResultPanel.jsx
import { ArrowRight, Check, RotateCcw, TrendingUp } from "lucide-react";

function ResultMark({ appearance }) {
	if (appearance === "strong") return <Check aria-hidden="true" />;
	if (appearance === "medium") return <TrendingUp aria-hidden="true" />;
	return <RotateCcw aria-hidden="true" />;
}

export default function SessionResultPanel({ appearance, eyebrow, title, body, statsLabel, pointsValue, pointsLabel, roundScoreValue, roundScoreLabel, moduleMasteryValue, moduleMasteryPercent, moduleMasteryLabel, nextStepBody, continueLabel, onContinue }) {
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
				<p>{nextStepBody}</p>
			</div>

			<button className="learning-session-result__continue" type="button" onClick={onContinue}>
				<span>{continueLabel}</span>
				<ArrowRight aria-hidden="true" />
			</button>
		</section>
	);
}
