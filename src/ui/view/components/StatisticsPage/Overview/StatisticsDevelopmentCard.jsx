// src/ui/view/components/StatisticsPage/Overview/StatisticsDevelopmentCard.jsx
import StatisticsPeriodSelector from "./StatisticsPeriodSelector.jsx";
import StatisticsScoreChart from "./StatisticsScoreChart.jsx";

export default function StatisticsDevelopmentCard({ model, onSelectPeriod }) {
	return (
		<section className="statistics-development-card" aria-labelledby="statistics-development-title">
			<header className="statistics-overview-section-header">
				<div>
					<h2 id="statistics-development-title">{model.title}</h2>
					<p>{model.subtitle}</p>
				</div>
				<StatisticsPeriodSelector
					label={model.periodLabel}
					options={model.periodOptions}
					selectedPeriod={model.period}
					onSelectPeriod={onSelectPeriod}
				/>
			</header>

			<div className="statistics-development-metrics">
				<div className="statistics-development-metric">
					<span>{model.averageScoreLabel}</span>
					<strong>{model.averageScoreValue}</strong>
				</div>
				{model.progressValue !== null && (
					<div className="statistics-development-metric">
						<span>{model.progressLabel}</span>
						<strong>{model.progressValue}</strong>
					</div>
				)}
			</div>

			<StatisticsScoreChart label={model.chartLabel} points={model.chartPoints} emptyLabel={model.chartEmptyLabel} />
		</section>
	);
}
