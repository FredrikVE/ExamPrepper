// src/ui/view/components/WorkspaceState/WorkspaceState.jsx
import { LOAD_STATUS } from "../../../presentation/loadStatus.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function WorkspaceState({
	status,
	loadingLabel,
	errorTitle,
	errorBody,
	actionLabel,
	onAction
}) {
	if (status === LOAD_STATUS.ERROR) {
		return (
			<div className="workspace-state">
				<section className="workspace-state-card workspace-state-card-error" role="alert">
					<h2>{errorTitle}</h2>
					<p>{errorBody}</p>

					{actionLabel && onAction ? (
						<button type="button" className="workspace-state-action" onClick={onAction}>
							{actionLabel}
						</button>
					) : null}
				</section>
			</div>
		);
	}

	if (status === LOAD_STATUS.READY) {
		return (
			<div className="workspace-state">
				<section className="workspace-state-card workspace-state-card-message" role="status">
					<h2>{errorTitle}</h2>
					<p>{errorBody}</p>

					{actionLabel && onAction ? (
						<button type="button" className="workspace-state-action" onClick={onAction}>
							{actionLabel}
						</button>
					) : null}
				</section>
			</div>
		);
	}

	return (
		<div className="workspace-state">
			<section className="workspace-state-card" role="status">
				<LoadingSpinner />
				<p className="workspace-state-loading-label">{loadingLabel}</p>
			</section>
		</div>
	);
}
