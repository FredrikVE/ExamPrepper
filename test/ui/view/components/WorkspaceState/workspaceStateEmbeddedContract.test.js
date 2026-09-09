// test/ui/view/components/WorkspaceState/workspaceStateEmbeddedContract.test.js
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

function renderState(scope, state, emptyIcon, children) {
	return renderToStaticMarkup(createElement(WorkspaceState, {
		scope,
		state,
		emptyIcon,
		children
	}));
}

describe("WorkspaceState embedded contract", () => {
	test("EMBEDDED loading har aria-busy og ingen live-region-role", () => {
		const html = renderState("embedded", { kind: WORKSPACE_STATE_KINDS.LOADING, label: "Laster" }, null, null);

		expect(html).toContain('aria-busy="true"');
		expect(html).not.toContain('role="status"');
	});

	test("EMBEDDED empty har ingen live-region-role og rendrer ikon-slot", () => {
		const html = renderState("embedded", { kind: WORKSPACE_STATE_KINDS.EMPTY, title: "Tom", body: "Tom", action: null }, createElement("svg"), null);

		expect(html).not.toContain('role="status"');
		expect(html).toContain("workspace-state-icon");
	});

	test("CONTENT rendrer children uendret i begge scopes", () => {
		const child = createElement("span", null, "Innhold");
		const pageHtml = renderState("page", { kind: WORKSPACE_STATE_KINDS.CONTENT }, null, child);
		const embeddedHtml = renderState("embedded", { kind: WORKSPACE_STATE_KINDS.CONTENT }, null, child);

		expect(pageHtml).toBe("<span>Innhold</span>");
		expect(embeddedHtml).toBe("<span>Innhold</span>");
	});
});
