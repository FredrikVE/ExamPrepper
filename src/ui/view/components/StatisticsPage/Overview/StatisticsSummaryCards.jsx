// src/ui/view/components/StatisticsPage/Overview/StatisticsSummaryCards.jsx
export default function StatisticsSummaryCards({ model }) {
	return (
		<section className="statistics-summary-cards" aria-label={model.ariaLabel}>
			{model.progressValue !== null && (
				<article className="statistics-summary-card statistics-summary-card-progress">
					<span>{model.progressLabel}</span>
					<strong>{model.progressValue}</strong>
				</article>
			)}
			<article className="statistics-summary-card statistics-summary-card-completed">
				<span>{model.completedLabel}</span>
				<strong>{model.completedValue}</strong>
			</article>
		</section>
	);
}
