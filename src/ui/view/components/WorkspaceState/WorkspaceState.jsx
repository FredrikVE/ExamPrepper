// src/ui/view/components/WorkspaceState/WorkspaceState.jsx
import { WORKSPACE_STATE_KINDS } from "../../../viewmodel/WorkspaceState/workspaceStateKinds.js";
import { WORKSPACE_STATE_SCOPES, createWorkspaceStateClassName } from "./workspaceStateVariants.js";
import LoadingSpinner from "./LoadingSpinner.jsx";
import WorkspaceActionButton from "./WorkspaceActionButton.jsx";

/* Én uttømmende render-boundary for loading, error, empty og content.
   scope, state, emptyIcon og children er påkrevde.

   scope velger presentasjonsvariant og live-region-oppførsel. Page-scope annonserer
   loading/empty som status; embedded-scope kan opptre flere ganger og gjør ikke det.
   Error beholder role="alert" i begge scopes.

   Fraværende aria-attributter uttrykkes som null. emptyIcon er en slot og fravær
   uttrykkes som eksplisitt null. action er alltid til stede på error/empty. */
export default function WorkspaceState({ scope, state, emptyIcon, children }) {
	const className = createWorkspaceStateClassName(scope);

	switch (state.kind) {
		case WORKSPACE_STATE_KINDS.LOADING:
			return (
				<div className={className} aria-busy={resolveBusyState(scope)}>
					<section className="workspace-state-card" role={resolveStatusRole(scope)}>
						<LoadingSpinner />
						<p className="workspace-state-loading-label">{state.label}</p>
					</section>
				</div>
			);

		case WORKSPACE_STATE_KINDS.ERROR:
			return (
				<div className={className}>
					<section className="workspace-state-card workspace-state-card-error" role="alert">
						<h2>{state.title}</h2>
						<p>{state.body}</p>
						{renderAction(state.action)}
					</section>
				</div>
			);

		case WORKSPACE_STATE_KINDS.EMPTY:
			return (
				<div className={className}>
					<section className="workspace-state-card workspace-state-card-message" role={resolveStatusRole(scope)}>
						{renderEmptyIcon(emptyIcon)}
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

function resolveStatusRole(scope) {
	if (scope === WORKSPACE_STATE_SCOPES.PAGE) {
		return "status";
	}

	return null;
}

function resolveBusyState(scope) {
	if (scope === WORKSPACE_STATE_SCOPES.EMBEDDED) {
		return true;
	}

	return null;
}

function renderEmptyIcon(emptyIcon) {
	if (emptyIcon === null) {
		return null;
	}

	return (
		<span className="workspace-state-icon" aria-hidden="true">
			{emptyIcon}
		</span>
	);
}

function renderAction(action) {
	if (action === null) {
		return null;
	}

	return <WorkspaceActionButton label={action.label} onAction={action.onAction} />;
}
