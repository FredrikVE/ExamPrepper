// src/ui/view/components/StatisticsPage/Overview/StatisticsDevelopmentCard.jsx
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import StatisticsPeriodSelector from "./StatisticsPeriodSelector.jsx";
import StatisticsScoreChart from "./StatisticsScoreChart.jsx";

export default function StatisticsDevelopmentCard({ model, onSelectPeriod }) {
	const ProgressIcon = resolveProgressIcon(model.progressDirection);

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
					<div className="statistics-development-progress" data-direction={model.progressDirection}>
						<div className="statistics-development-progress-value">
							<ProgressIcon aria-hidden="true" focusable="false" />
							<strong>{model.progressValue}</strong>
						</div>
						<span>{model.progressLabel}</span>
					</div>
				</div>

				<div className="statistics-development-chart-column">
					<StatisticsScoreChart label={model.chartLabel} points={model.chartPoints} emptyLabel={model.chartEmptyLabel} />
					<StatisticsPeriodSelector
						label={model.periodLabel}
						options={model.periodOptions}
						selectedPeriod={model.period}
						previousLabel={model.previousPeriodLabel}
						nextLabel={model.nextPeriodLabel}
						onSelectPeriod={onSelectPeriod}
					/>
				</div>
			</div>
		</section>
	);
}

function resolveProgressIcon(direction) {
	if (direction === "up") {
		return TrendingUp;
	}

	if (direction === "down") {
		return TrendingDown;
	}

	return Minus;
}
