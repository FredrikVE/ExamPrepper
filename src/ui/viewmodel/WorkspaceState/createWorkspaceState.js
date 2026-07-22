// src/ui/viewmodel/WorkspaceState/createWorkspaceState.js
import { LOAD_STATUS } from "../LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "./workspaceStateKinds.js";

export function createWorkspaceState({
	loadStatus,
	isEmpty,
	labels,
	errorAction
}) {
	switch (loadStatus) {
		case LOAD_STATUS.LOADING:
			return {
				kind: WORKSPACE_STATE_KINDS.LOADING,
				label: labels.loading
			};

		case LOAD_STATUS.ERROR:
			return {
				kind: WORKSPACE_STATE_KINDS.ERROR,
				title: labels.errorTitle,
				body: labels.errorBody,
				action: errorAction
			};

		case LOAD_STATUS.READY:
			if (isEmpty) {
				return {
					kind: WORKSPACE_STATE_KINDS.EMPTY,
					title: labels.emptyTitle,
					body: labels.emptyBody,
					action: null
				};
			}

			return {
				kind: WORKSPACE_STATE_KINDS.CONTENT
			};

		default:
			throw new Error(`Ukjent load status: ${String(loadStatus)}`);
	}
}
