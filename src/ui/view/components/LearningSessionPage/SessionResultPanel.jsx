// src/ui/view/components/LearningSessionPage/SessionResultPanel.jsx
import { ArrowRight, Check, CircleHelp, RotateCcw, TrendingUp } from "lucide-react";

function ResultMark({ appearance }) {
	let ResultIcon;

	if (appearance === "understood") {
		ResultIcon = Check;
	}

	else if (appearance === "progress") {
		ResultIcon = TrendingUp;
	}

	else if (appearance === "practice") {
		ResultIcon = RotateCcw;
	}

	else if (appearance === "not-assessed") {
		ResultIcon = CircleHelp;
	}

	else {
		throw new Error(`Unknown learning session result appearance: ${String(appearance)}`);
	}

	return <ResultIcon aria-hidden="true" />;
}

export default function SessionResultPanel(props) {
	const {
		appearance,
		eyebrow,
		title,
		body,
		statsLabel,
		pointsValue,
		pointsLabel,
		scoreValue,
		scoreLabel,
		nextStepLabel,
		nextStepBody,
		primaryLabel,
		isPrimaryDisabled,
		actionErrorMessage,
		onPrimary
	} = props;

	return (
		<section
			className={`learning-session-result learning-session-result--${appearance}`}
			aria-labelledby="learning-session-result-title"
		>
			<div className="learning-session-result__intro">
				<div className="learning-session-result__mark" aria-hidden="true">
					<ResultMark appearance={appearance} />
				</div>

				<p className="learning-session-result__eyebrow">
					{eyebrow}
				</p>

				<h2 id="learning-session-result-title">
					{title}
				</h2>

				<p className="learning-session-result__body">
					{body}
				</p>
			</div>

			<div className="learning-session-result__stats" aria-label={statsLabel}>
				<div>
					<strong>{pointsValue}</strong>
					<span>{pointsLabel}</span>
				</div>

				<span className="learning-session-result__stats-divider" aria-hidden="true" />

				<div>
					<strong>{scoreValue}</strong>
					<span>{scoreLabel}</span>
				</div>
			</div>

			<div className="learning-session-result__module-progress">
				<strong className="learning-session-result__next-step-label">
					{nextStepLabel}
				</strong>

				<p>{nextStepBody}</p>
			</div>

			{actionErrorMessage !== null && (
				<p className="learning-session-result__action-error" role="alert">
					{actionErrorMessage}
				</p>
			)}

			<div className="learning-session-result__actions learning-session-result__actions--single">
				<button
					className="learning-session-result__continue"
					type="button"
					disabled={isPrimaryDisabled}
					onClick={onPrimary}
				>
					<span>{primaryLabel}</span>
					<ArrowRight aria-hidden="true" />
				</button>
			</div>
		</section>
	);
}
