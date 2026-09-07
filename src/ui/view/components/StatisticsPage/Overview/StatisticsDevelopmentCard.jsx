// src/ui/view/components/StatisticsPage/Overview/StatisticsDevelopmentCard.jsx
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import StatisticsPeriodSelector from "./StatisticsPeriodSelector.jsx";
import StatisticsScoreChart from "./StatisticsScoreChart.jsx";

const DEVELOPMENT_CHART_ID = "statistics-development-chart";

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
							<ProgressIcon aria-hidden="true" focusable="false" strokeWidth={3} />
							<strong>{model.progressValue}</strong>
						</div>
						<div className="statistics-development-progress-copy">
							<span>{model.progressLabel}</span>
							<span>{model.progressAttemptContextLabel}</span>
						</div>
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

function resolveProgressIcon(direction) {
	if (direction === "up") {
		return ArrowUp;
	}

	if (direction === "down") {
		return ArrowDown;
	}

	return Minus;
}
