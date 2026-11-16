// src/ui/view/components/StatisticsPage/Overview/History/StatisticsHistoryRow.jsx
import { Check, ChevronRight, CircleAlert, TriangleAlert } from "lucide-react";
import StatisticsHistoryDetail from "./StatisticsHistoryDetail.jsx";

export default function StatisticsHistoryRow({ model, isExpanded, onToggle, onOpenAttempt }) {
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
				<StatisticsHistoryName model={model} onOpenAttempt={onOpenAttempt} />
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

/* Navnet åpner det leverte forsøket i lesemodus når statistikksiden kan navigere dit. */
function StatisticsHistoryName({ model, onOpenAttempt }) {
	if (typeof onOpenAttempt !== "function") {
		return <strong className="statistics-history-name">{model.title}</strong>;
	}

	return (
		<button type="button" className="statistics-history-name statistics-history-name-button" aria-label={model.openAttemptLabel} title={model.openAttemptLabel} onClick={() => onOpenAttempt(model.openAttemptRequest)}>
			<span className="statistics-history-name-text">{model.title}</span>
			<ChevronRight className="statistics-history-name-icon" aria-hidden="true" focusable="false" />
		</button>
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
