// src/ui/view/components/WorkspaceState/WorkspaceState.jsx
import { WORKSPACE_STATE_KINDS } from "../../../viewmodel/WorkspaceState/workspaceStateKinds.js";
import LoadingSpinner from "./LoadingSpinner.jsx";
import WorkspaceActionButton from "./WorkspaceActionButton.jsx";

/* Én uttømmende render-boundary for page-nivå loading, error, empty og content.
   state og children er påkrevde. action er alltid til stede på error/empty og
   uttrykker fravær som eksplisitt null. */
export default function WorkspaceState({ state, children }) {
	switch (state.kind) {
		case WORKSPACE_STATE_KINDS.LOADING:
			return (
				<div className="workspace-state">
					<section className="workspace-state-card" role="status">
						<LoadingSpinner />
						<p className="workspace-state-loading-label">{state.label}</p>
					</section>
				</div>
			);

		case WORKSPACE_STATE_KINDS.ERROR:
			return (
				<div className="workspace-state">
					<section className="workspace-state-card workspace-state-card-error" role="alert">
						<h2>{state.title}</h2>
						<p>{state.body}</p>
						{renderAction(state.action)}
					</section>
				</div>
			);

		case WORKSPACE_STATE_KINDS.EMPTY:
			return (
				<div className="workspace-state">
					<section className="workspace-state-card workspace-state-card-message" role="status">
						<h2>{state.title}</h2>
						<p>{state.body}</p>
						{renderAction(state.action)}
					</section>
				</div>
			);

		case WORKSPACE_STATE_KINDS.CONTENT:
			return children;

		default:
			throw new Error(`Ukjent workspace state: ${String(state.kind)}`);
	}
}

const renderAction = (action) => {
	if (action === null) {
		return null;
	}

	return <WorkspaceActionButton label={action.label} onAction={action.onAction} />;
};
