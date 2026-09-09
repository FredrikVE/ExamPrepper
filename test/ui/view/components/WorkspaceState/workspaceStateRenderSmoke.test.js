// test/ui/view/components/WorkspaceState/workspaceStateRenderSmoke.test.js
import { afterAll, beforeAll, expect, test } from "@jest/globals";
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

test("Vite SSR kan rendre WorkspaceState", () => {
	const html = renderToStaticMarkup(createElement(WorkspaceState, {
		scope: "page",
		state: { kind: WORKSPACE_STATE_KINDS.LOADING, label: "Laster" },
		emptyIcon: null,
		children: null
	}));

	expect(html).toContain("Laster");
});
