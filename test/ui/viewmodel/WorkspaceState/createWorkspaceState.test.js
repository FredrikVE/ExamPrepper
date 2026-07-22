// test/ui/viewmodel/WorkspaceState/createWorkspaceState.test.js
import { describe, expect, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { createWorkspaceState } from "../../../../src/ui/viewmodel/WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "../../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

const labels = {
	loading: "Laster",
	errorTitle: "Kunne ikke laste",
	errorBody: "Prøv igjen senere",
	emptyTitle: "Ingen treff",
	emptyBody: "Det finnes ikke noe innhold"
};

describe("createWorkspaceState", () => {
	test("creates loading state", () => {
		expect(createWorkspaceState({
			loadStatus: LOAD_STATUS.LOADING,
			isEmpty: false,
			labels,
			errorAction: null
		})).toEqual({
			kind: WORKSPACE_STATE_KINDS.LOADING,
			label: labels.loading
		});
	});

	test("creates error state with nullable action", () => {
		const errorAction = {
			label: "Prøv igjen",
			onAction: () => {}
		};

		expect(createWorkspaceState({
			loadStatus: LOAD_STATUS.ERROR,
			isEmpty: false,
			labels,
			errorAction
		})).toEqual({
			kind: WORKSPACE_STATE_KINDS.ERROR,
			title: labels.errorTitle,
			body: labels.errorBody,
			action: errorAction
		});
	});

	test("creates empty state when a ready resource has no content", () => {
		expect(createWorkspaceState({
			loadStatus: LOAD_STATUS.READY,
			isEmpty: true,
			labels,
			errorAction: null
		})).toEqual({
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: labels.emptyTitle,
			body: labels.emptyBody,
			action: null
		});
	});

	test("creates content state when a ready resource has content", () => {
		expect(createWorkspaceState({
			loadStatus: LOAD_STATUS.READY,
			isEmpty: false,
			labels,
			errorAction: null
		})).toEqual({
			kind: WORKSPACE_STATE_KINDS.CONTENT
		});
	});

	test("throws for an unknown load status", () => {
		expect(() => createWorkspaceState({
			loadStatus: "stale",
			isEmpty: false,
			labels,
			errorAction: null
		})).toThrow("Ukjent load status: stale");
	});
});
