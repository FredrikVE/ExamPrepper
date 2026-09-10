// src/ui/view/components/StatisticsPage/Overview/StatisticsOverview.jsx
import StatisticsChapterOverview from "./Chapters/StatisticsChapterOverview.jsx";
import StatisticsDevelopmentCard from "./Development/Cards/StatisticsDevelopmentCard.jsx";
import StatisticsHistory from "./History/StatisticsHistory.jsx";
import StatisticsSummaryCards from "./Summary/StatisticsSummaryCards.jsx";

export default function StatisticsOverview({ model, cardStates, actions }) {
	return (
		<div className="statistics-overview">
			<div className="statistics-overview-top-grid">
				<StatisticsDevelopmentCard model={model.development} state={cardStates.development} onSelectPeriod={actions.selectPeriod} />
				<StatisticsSummaryCards model={model.summary} progressState={cardStates.progress} completedState={cardStates.completed} />
			</div>
			<StatisticsChapterOverview model={model.chapters} state={cardStates.chapters} onSelectScope={actions.selectMasteryScope} />
			<StatisticsHistory model={model.history} state={cardStates.history} actions={actions} />
		</div>
	);
}
