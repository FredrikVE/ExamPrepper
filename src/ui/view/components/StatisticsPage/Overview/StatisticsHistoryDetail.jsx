// src/ui/view/components/StatisticsPage/Overview/StatisticsHistoryDetail.jsx
export default function StatisticsHistoryDetail({ model }) {
	return (
		<div className="statistics-history-detail">
			<span>{model.pointsLabel}</span>
			<span>{model.correctLabel}</span>
			<span>{model.incorrectLabel}</span>
			<span>{model.durationLabel}</span>
		</div>
	);
}
