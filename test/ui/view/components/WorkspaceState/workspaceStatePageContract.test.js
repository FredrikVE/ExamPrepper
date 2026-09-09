// test/ui/view/components/WorkspaceState/workspaceStatePageContract.test.js
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WORKSPACE_STATE_KINDS } from "../../../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import { closeJsxModuleLoader, loadJsxModule } from "../../../../helpers/loadJsxModule.js";

let WorkspaceState = null;

beforeAll(async () => {
	const module = await loadJsxModule("/src/ui/view/components/WorkspaceState/WorkspaceState.jsx");
	WorkspaceState = module.default;
});

afterAll(async () => {
	await closeJsxModuleLoader();
});

function renderPageScope(state) {
	return renderToStaticMarkup(createElement(WorkspaceState, {
		scope: "page",
		state,
		emptyIcon: null,
		children: null
	}));
}

describe("WorkspaceState PAGE-regresjonskontrakt", () => {
	test("loading har role=status og ingen aria-busy", () => {
		const html = renderPageScope({ kind: WORKSPACE_STATE_KINDS.LOADING, label: "Laster" });

		expect(html).toContain('role="status"');
		expect(html).not.toContain("aria-busy");
	});

	test("empty beholder role=status og har ingen ikon-wrapper", () => {
		const html = renderPageScope({ kind: WORKSPACE_STATE_KINDS.EMPTY, title: "Tom", body: "Tom", action: null });

		expect(html).toContain('role="status"');
		expect(html).not.toContain("workspace-state-icon");
	});

	test("error beholder role=alert", () => {
		const html = renderPageScope({ kind: WORKSPACE_STATE_KINDS.ERROR, title: "Feil", body: "Feil", action: null });

		expect(html).toContain('role="alert"');
	});
});
