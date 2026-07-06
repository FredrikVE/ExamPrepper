import { Flag } from "lucide-react";

export default function MatchCardsProgress({ progress }) {
	return (
		<section className="matchcards-progress" aria-label={progress.ariaLabel}>
			<div className="matchcards-progress-track">
				<div className="matchcards-progress-line" />
				<div
					className="matchcards-progress-fill"
					style={{ width: `${progress.fillPercent}%` }}
				/>

				{progress.points.map((point) => (
					<MatchCardsProgressPoint key={point.key} point={point} />
				))}
			</div>
		</section>
	);
}

function MatchCardsProgressPoint({ point }) {
	const className = point.isActive
		? "matchcards-progress-point matchcards-progress-point-active"
		: "matchcards-progress-point";

	return (
		<div className={className} style={{ left: `${point.left}%` }}>
			<span className="matchcards-progress-icon-slot">
				<MatchCardsProgressPointIcon isFlag={point.isFlag} />
			</span>
			<span className="matchcards-progress-label">{point.label}</span>
		</div>
	);
}

function MatchCardsProgressPointIcon({ isFlag }) {
	if (isFlag) {
		return <Flag className="matchcards-progress-flag" />;
	}

	return <span className="matchcards-progress-dot" />;
}
