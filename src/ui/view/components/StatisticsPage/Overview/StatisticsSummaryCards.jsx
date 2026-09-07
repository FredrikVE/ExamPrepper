// src/ui/view/components/StatisticsPage/Overview/StatisticsSummaryCards.jsx
import { ArrowDown, ArrowUp } from "lucide-react";

export default function StatisticsSummaryCards({ model }) {
	const ProgressIcon = resolveProgressIcon(model.progressDirection);

	return (
		<section className="statistics-summary-cards" aria-label={model.ariaLabel}>
			<article className="statistics-summary-card statistics-summary-card-progress" data-direction={model.progressDirection}>
				<span className="statistics-summary-card-label">{model.progressLabel}</span>
				<div className="statistics-summary-progress-value">
					<div className="statistics-summary-progress-number-row">
						{ProgressIcon !== null && <ProgressIcon className="statistics-summary-progress-icon" aria-hidden="true" focusable="false" strokeWidth={3} />}
						<strong>{model.progressNumberValue}</strong>
					</div>
					{model.hasProgress && <span className="statistics-summary-progress-unit">{model.progressUnitLabel}</span>}
				</div>
				{model.hasProgress && <small className="statistics-summary-progress-context">{model.progressAttemptSummaryLabel}</small>}
			</article>
			<article className="statistics-summary-card statistics-summary-card-completed">
				<span className="statistics-summary-card-label">{model.completedLabel}</span>
				<strong className="statistics-summary-completed-value">{model.completedValue}</strong>
				<small>{model.completedUnitLabel}</small>
			</article>
		</section>
	);
}

function resolveProgressIcon(direction) {
	if (direction === "up") {
		return ArrowUp;
	}

	if (direction === "down") {
		return ArrowDown;
	}

	return null;
}
