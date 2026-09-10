// src/ui/view/components/StatisticsPage/Overview/Summary/StatisticsSummaryCards.jsx
import { ArrowDown, ArrowUp, FileText } from "lucide-react";
import WorkspaceState from "../../../WorkspaceState/WorkspaceState.jsx";
import { WORKSPACE_STATE_SCOPES } from "../../../WorkspaceState/workspaceStateVariants.js";

export default function StatisticsSummaryCards({ model, progressState, completedState }) {
	const ProgressIcon = resolveProgressIcon(model.progressDirection);

	return (
		<section className="statistics-summary-cards" aria-label={model.ariaLabel}>
			<article className="statistics-summary-card statistics-summary-card-progress" data-direction={model.progressDirection} aria-label={model.progressLabel}>
				<WorkspaceState scope={WORKSPACE_STATE_SCOPES.EMBEDDED} state={progressState} emptyIcon={<FileText />}>
					<span className="statistics-summary-card-label">{model.progressLabel}</span>
					<div className="statistics-summary-progress-value">
						<div className="statistics-summary-progress-number-row">
							{renderProgressIcon(ProgressIcon)}
							<strong>{model.progressNumberValue}</strong>
						</div>
						<span className="statistics-summary-progress-unit">{model.progressUnitLabel}</span>
					</div>
					<small className="statistics-summary-progress-context">{model.progressAttemptSummaryLabel}</small>
				</WorkspaceState>
			</article>
			<article className="statistics-summary-card statistics-summary-card-completed" aria-label={model.completedLabel}>
				<WorkspaceState scope={WORKSPACE_STATE_SCOPES.EMBEDDED} state={completedState} emptyIcon={<FileText />}>
					<span className="statistics-summary-card-label">{model.completedLabel}</span>
					<strong className="statistics-summary-completed-value">{model.completedValue}</strong>
					<small>{model.completedUnitLabel}</small>
				</WorkspaceState>
			</article>
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

	return null;
}

function renderProgressIcon(ProgressIcon) {
	if (ProgressIcon === null) {
		return null;
	}

	return <ProgressIcon className="statistics-summary-progress-icon" aria-hidden="true" focusable="false" strokeWidth={3} />;
}
