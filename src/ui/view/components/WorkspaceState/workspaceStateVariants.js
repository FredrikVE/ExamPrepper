// src/ui/view/components/WorkspaceState/workspaceStateVariants.js
export const WORKSPACE_STATE_SCOPES = {
	PAGE: "page",
	EMBEDDED: "embedded"
};

const WORKSPACE_STATE_SCOPE_CLASS_NAMES = {
	[WORKSPACE_STATE_SCOPES.PAGE]: "workspace-state--scope-page",
	[WORKSPACE_STATE_SCOPES.EMBEDDED]: "workspace-state--scope-embedded"
};

export function createWorkspaceStateClassName(scope) {
	const scopeClassName = WORKSPACE_STATE_SCOPE_CLASS_NAMES[scope];

	if (scopeClassName === undefined) {
		throw new Error(`Ukjent workspace state scope: ${String(scope)}`);
	}

	return `workspace-state ${scopeClassName}`;
}
