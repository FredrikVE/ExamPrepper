// src/ui/view/components/StatisticsPage/Overview/StatisticsDevelopmentCard.jsx
import StatisticsPeriodSelector from "./StatisticsPeriodSelector.jsx";
import StatisticsScoreChart from "./StatisticsScoreChart.jsx";

const DEVELOPMENT_CHART_ID = "statistics-development-chart";

export default function StatisticsDevelopmentCard({ model, onSelectPeriod }) {
	return (
		<section className="statistics-development-card" aria-labelledby="statistics-development-title">
			<header className="statistics-overview-section-header">
				<div>
					<h2 id="statistics-development-title">{model.title}</h2>
					<p>{model.subtitle}</p>
				</div>
			</header>

			<div className="statistics-development-content">
				<div className="statistics-development-summary">
					<div className="statistics-development-average">
						<strong>{model.averageScoreValue}</strong>
						<span>{model.averageScoreLabel}</span>
					</div>
				</div>

				<div className="statistics-development-chart-column">
					<StatisticsScoreChart id={DEVELOPMENT_CHART_ID} label={model.chartLabel} points={model.chartPoints} axisStartLabel={model.chartAxisStartLabel} axisEndLabel={model.chartAxisEndLabel} emptyLabel={model.chartEmptyLabel} />
					<StatisticsPeriodSelector
						label={model.periodLabel}
						options={model.periodOptions}
						selectedPeriod={model.period}
						rangeLabel={model.periodRangeLabel}
						controlsId={DEVELOPMENT_CHART_ID}
						previousLabel={model.previousPeriodLabel}
						nextLabel={model.nextPeriodLabel}
						onSelectPeriod={onSelectPeriod}
					/>
				</div>
			</div>
		</section>
	);
}
