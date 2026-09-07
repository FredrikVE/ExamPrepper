// src/ui/view/components/StatisticsPage/Overview/StatisticsOverview.jsx
import StatisticsChapterOverview from "./StatisticsChapterOverview.jsx";
import StatisticsDevelopmentCard from "./StatisticsDevelopmentCard.jsx";
import StatisticsHistory from "./StatisticsHistory.jsx";
import StatisticsSummaryCards from "./StatisticsSummaryCards.jsx";

export default function StatisticsOverview({ model, actions }) {
	return (
		<div className="statistics-overview">
			<div className="statistics-overview-top-grid">
				<StatisticsDevelopmentCard model={model.development} onSelectPeriod={actions.selectPeriod} />
				<StatisticsSummaryCards model={model.summary} />
			</div>
			<StatisticsChapterOverview model={model.chapters} onSelectScope={actions.selectMasteryScope} />
			<StatisticsHistory model={model.history} actions={actions} />
		</div>
	);
}
