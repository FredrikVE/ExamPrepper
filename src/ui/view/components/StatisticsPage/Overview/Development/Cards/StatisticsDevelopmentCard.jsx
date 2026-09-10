// src/ui/view/components/StatisticsPage/Overview/Development/Cards/StatisticsDevelopmentCard.jsx
import { FileText } from "lucide-react";
import WorkspaceState from "../../../../WorkspaceState/WorkspaceState.jsx";
import { WORKSPACE_STATE_SCOPES } from "../../../../WorkspaceState/workspaceStateVariants.js";
import StatisticsPeriodSelector from "../Controls/StatisticsPeriodSelector.jsx";
import StatisticsScoreChart from "../Charts/StatisticsScoreChart.jsx";

const DEVELOPMENT_CHART_ID = "statistics-development-chart";

export default function StatisticsDevelopmentCard({ model, state, onSelectPeriod }) {
	return (
		<section className="statistics-development-card" aria-label={model.title}>
			<WorkspaceState scope={WORKSPACE_STATE_SCOPES.EMBEDDED} state={state} emptyIcon={<FileText />}>
				<header className="statistics-overview-section-header">
					<div>
						<h2>{model.title}</h2>
						<p>{model.subtitle}</p>
					</div>
				</header>

				<div className="statistics-development-content">
					<div className="statistics-development-summary">
						<div className="statistics-development-mastery">
							<strong>{model.masteryValue}</strong>
							<span>{model.masteryLabel}</span>
							<small>{model.averageLabel}: {model.averageValue}</small>
						</div>
					</div>

					<div className="statistics-development-chart-column">
						<StatisticsScoreChart
							id={DEVELOPMENT_CHART_ID}
							label={model.chartLabel}
							points={model.chartPoints}
							axisTicks={model.chartAxisTicks}
							layoutMode={model.chartLayoutMode}
							emptyLabel={model.chartEmptyLabel}
						/>
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
			</WorkspaceState>
		</section>
	);
}
