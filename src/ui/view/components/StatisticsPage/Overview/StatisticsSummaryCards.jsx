// src/ui/view/components/StatisticsPage/Overview/StatisticsSummaryCards.jsx
export default function StatisticsSummaryCards({ model }) {
	return (
		<section className="statistics-summary-cards" aria-label={model.ariaLabel}>
			<article className="statistics-summary-card statistics-summary-card-progress" data-direction={model.progressDirection}>
				<span className="statistics-summary-card-label">{model.progressLabel}</span>
				<div className="statistics-summary-progress-value">
					<strong>{model.progressNumberValue}</strong>
					{model.hasProgress && <span className="statistics-summary-progress-unit">{model.progressUnitLabel}</span>}
				</div>
			</article>
			<article className="statistics-summary-card statistics-summary-card-completed">
				<span className="statistics-summary-card-label">{model.completedLabel}</span>
				<strong className="statistics-summary-completed-value">{model.completedValue}</strong>
				<small>{model.completedUnitLabel}</small>
			</article>
		</section>
	);
}
