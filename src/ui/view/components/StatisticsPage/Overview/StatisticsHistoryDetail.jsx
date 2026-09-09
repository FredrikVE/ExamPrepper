// src/ui/view/components/StatisticsPage/Overview/StatisticsHistoryDetail.jsx
export default function StatisticsHistoryDetail({ id, model }) {
	return (
		<div id={id} className="statistics-history-detail">
			{model.detailMetrics.map((metric) => (
				<div key={metric.key} className="statistics-history-detail-metric">
					<span>{metric.label}</span>
					<strong>{metric.value}</strong>
				</div>
			))}
		</div>
	);
}
