// test/ui/architecture/workspaceStateScopeContract.test.js
import { describe, expect, test } from "@jest/globals";
import { WORKSPACE_STATE_SCOPES, createWorkspaceStateClassName } from "../../../src/ui/view/components/WorkspaceState/workspaceStateVariants.js";

describe("workspace state scope", () => {
	test("gir klassenavn for hvert kjent scope", () => {
		expect(createWorkspaceStateClassName(WORKSPACE_STATE_SCOPES.PAGE)).toBe("workspace-state workspace-state--scope-page");
		expect(createWorkspaceStateClassName(WORKSPACE_STATE_SCOPES.EMBEDDED)).toBe("workspace-state workspace-state--scope-embedded");
	});

	test("kaster på ukjent scope", () => {
		expect(() => createWorkspaceStateClassName("unknown")).toThrow("Ukjent workspace state scope: unknown");
	});

	test("kaster på undefined scope", () => {
		expect(() => createWorkspaceStateClassName(undefined)).toThrow("Ukjent workspace state scope: undefined");
	});
});
