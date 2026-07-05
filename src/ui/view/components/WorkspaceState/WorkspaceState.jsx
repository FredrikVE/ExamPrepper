// src/ui/view/components/WorkspaceState/WorkspaceState.jsx
import { LOAD_STATUS } from "../../../loadStatus/loadStatus.js";
import LoadingSpinner from "./LoadingSpinner.jsx";
import WorkspaceActionButton from "./WorkspaceActionButton.jsx";

/* Rendrer utelukkende blokkerende lasttilstander (LOADING/ERROR).
   Meldinger i READY-tilstand (tomt innhold, utlogget) hører i
   WorkspaceMessage — status-enumen er ikke en variantvelger.
   errorAction er nullable BY DESIGN (null | { label, onAction });
   tekstpropene er påkrevde og rendres uten defensive sjekker. */
export default function WorkspaceState({
	status,
	loadingLabel,
	errorTitle,
	errorBody,
	errorAction
}) {
	if (status === LOAD_STATUS.ERROR) {
		return (
			<div className="workspace-state">
				<section className="workspace-state-card workspace-state-card-error" role="alert">
					<h2>{errorTitle}</h2>
					<p>{errorBody}</p>

					{errorAction ? (
						<WorkspaceActionButton label={errorAction.label} onAction={errorAction.onAction} />
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
