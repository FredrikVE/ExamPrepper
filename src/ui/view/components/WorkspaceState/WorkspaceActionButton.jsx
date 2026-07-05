// src/ui/view/components/WorkspaceState/WorkspaceActionButton.jsx
export default function WorkspaceActionButton({ label, onAction }) {
	return (
		<button type="button" className="workspace-state-action" onClick={onAction}>
			{label}
		</button>
	);
}
