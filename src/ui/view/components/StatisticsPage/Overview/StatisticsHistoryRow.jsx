// src/ui/view/components/StatisticsPage/Overview/StatisticsHistoryRow.jsx
import StatisticsHistoryDetail from "./StatisticsHistoryDetail.jsx";

export default function StatisticsHistoryRow({ model }) {
	return (
		<li className="statistics-history-row">
			<div className="statistics-history-row-primary">
				<time className="statistics-history-date">{model.submittedAtLabel}</time>
				<strong className="statistics-history-name">{model.title}</strong>
				<strong className="statistics-history-score">{model.scoreLabel}</strong>
			</div>
			<StatisticsHistoryDetail model={model} />
		</li>
	);
}
