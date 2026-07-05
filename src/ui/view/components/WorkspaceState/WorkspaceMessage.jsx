// src/ui/view/components/WorkspaceState/WorkspaceMessage.jsx
import WorkspaceActionButton from "./WorkspaceActionButton.jsx";

/* Sentrert meldingskort for READY-tilstander uten innhold
   (tom liste, utlogget). Deler visuell drakt med WorkspaceState,
   men er bevisst frikoblet fra LOAD_STATUS.
   action er nullable BY DESIGN (null | { label, onAction }). */
export default function WorkspaceMessage({ title, body, action }) {
	return (
		<div className="workspace-state">
			<section className="workspace-state-card workspace-state-card-message" role="status">
				<h2>{title}</h2>
				<p>{body}</p>

				{action ? (
					<WorkspaceActionButton label={action.label} onAction={action.onAction} />
				) : null}
			</section>
		</div>
	);
}
