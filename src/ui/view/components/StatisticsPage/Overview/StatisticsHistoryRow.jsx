// src/ui/view/components/StatisticsPage/Overview/StatisticsHistoryRow.jsx
import { Check, CircleAlert, TriangleAlert } from "lucide-react";
import StatisticsHistoryDetail from "./StatisticsHistoryDetail.jsx";

export default function StatisticsHistoryRow({ model, isExpanded, onToggle }) {
	const detailId = `statistics-history-detail-${model.attemptId}`;
	const StatusIcon = resolveStatusIcon(model.statusTone);
	let rowClassName = "statistics-history-row";
	let detailsLabel = model.showDetailsLabel;

	if (isExpanded) {
		rowClassName += " statistics-history-row-expanded";
		detailsLabel = model.hideDetailsLabel;
	}

	return (
		<li className={rowClassName}>
			<div className="statistics-history-row-grid">
				<time className="statistics-history-date">{model.submittedAtLabel}</time>
				<strong className="statistics-history-name">{model.title}</strong>
				<span className="statistics-history-status" data-status-tone={model.statusTone}>
					<span className="statistics-history-status-icon" aria-hidden="true">
						<StatusIcon focusable="false" />
					</span>
					<span>{model.statusLabel}</span>
				</span>
				<strong className="statistics-history-score">{model.scoreLabel}</strong>
				<button type="button" className="statistics-history-details-link" aria-expanded={isExpanded} aria-controls={detailId} onClick={() => onToggle(model.attemptId)}>
					{detailsLabel}
				</button>
			</div>
			{isExpanded && <StatisticsHistoryDetail id={detailId} model={model} />}
		</li>
	);
}

function resolveStatusIcon(statusTone) {
	if (statusTone === "positive") {
		return Check;
	}

	if (statusTone === "warning") {
		return TriangleAlert;
	}

	return CircleAlert;
}
