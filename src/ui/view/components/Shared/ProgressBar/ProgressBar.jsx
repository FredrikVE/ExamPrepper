// src/ui/view/components/Shared/ProgressBar/ProgressBar.jsx
import { Flag } from "lucide-react";
import { getProgressBarClassName } from "./progressBarVariants.js";

export default function ProgressBar({ variant, model }) {
	const className = getProgressBarClassName(variant);

	return (
		<section className={className} aria-label={model.ariaLabel}>
			<div className="progress-bar-track">
				<div className="progress-bar-line" />
				<div className="progress-bar-fill" style={{ width: `${model.fillPercent}%` }} />

				{model.points.map((point) => (
					<ProgressBarPoint key={point.key} point={point} />
				))}
			</div>
		</section>
	);
}

function ProgressBarPoint({ point }) {
	if (point.onActivatePoint) {
		return (
			<button type="button" className={point.className} style={{ left: `${point.left}%` }} onClick={point.onActivatePoint}>
				<ProgressBarPointBody point={point} />
			</button>
		);
	}

	return (
		<div className={point.className} style={{ left: `${point.left}%` }}>
			<ProgressBarPointBody point={point} />
		</div>
	);
}

function ProgressBarPointBody({ point }) {
	return (
		<>
			<span className="progress-bar-icon-slot">
				<ProgressBarPointIcon isFlag={point.isFlag} />
			</span>
			<span className="progress-bar-label">{point.label}</span>
		</>
	);
}

function ProgressBarPointIcon({ isFlag }) {
	if (isFlag) {
		return <Flag className="progress-bar-flag" />;
	}

	return <span className="progress-bar-dot" />;
}
