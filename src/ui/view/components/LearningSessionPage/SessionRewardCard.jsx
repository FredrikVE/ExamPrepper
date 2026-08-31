// src/ui/view/components/LearningSessionPage/SessionRewardCard.jsx
import { ArrowRight, Check, X } from "lucide-react";

const PARTICLE_COUNT = 18;

export default function SessionRewardCard(props) {
	const { title, body, closeLabel, statsLabel, comboValue, comboLabel, xpValue, xpLabel, dismissLabel, onContinue } = props;

	return (
		<section
			className="learning-session-reward"
			role="dialog"
			aria-modal="true"
			aria-labelledby="learning-session-reward-title"
			aria-describedby="learning-session-reward-body"
		>
			<div className="learning-session-reward__card">
				<button
					className="learning-session-reward__close"
					type="button"
					aria-label={closeLabel}
					onClick={onContinue}
				>
					<X aria-hidden="true" />
				</button>

				<div className="learning-session-reward__burst" aria-hidden="true">
					<div className="learning-session-reward__particles">
						{Array.from({ length: PARTICLE_COUNT }, (_value, index) => {
							return <span key={index} />;
						})}
					</div>

					<div className="learning-session-reward__mark">
						<Check />
					</div>
				</div>

				<h2 id="learning-session-reward-title">
					{title}
				</h2>

				<p
					id="learning-session-reward-body"
					className="learning-session-reward__body"
				>
					{body}
				</p>

				<div
					className="learning-session-reward__stats"
					aria-label={statsLabel}
				>
					<div>
						<strong>{comboValue}</strong>
						<span>{comboLabel}</span>
					</div>

					<span
						className="learning-session-reward__stats-divider"
						aria-hidden="true"
					/>

					<div>
						<strong>{xpValue}</strong>
						<span>{xpLabel}</span>
					</div>
				</div>

				<button
					className="learning-session-reward__continue"
					type="button"
					onClick={onContinue}
				>
					<span>{dismissLabel}</span>
					<ArrowRight aria-hidden="true" />
				</button>
			</div>
		</section>
	);
}
