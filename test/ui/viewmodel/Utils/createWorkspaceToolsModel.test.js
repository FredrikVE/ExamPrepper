import { describe, expect, test } from "@jest/globals";
import {
	LEARNING_CONTENT_SELECT_PAGE_TOOLS,
	PAGE_TOOL_ITEM_IDS,
	SUBJECT_SELECT_PAGE_TOOLS
} from "../../../../src/ui/pageTools/pageTools.js";
import createWorkspaceToolsModel from "../../../../src/ui/viewmodel/Utils/createWorkspaceToolsModel.js";

const t = {
	pageToolsWorkspaceTitle: "Velg læringsverktøy",
	pageToolsSubjectWorkspaceTitle: "",
	pageToolsWorkspaceSubtitle: "",
	pageToolsWorkspaceActionsLabel: "Læringsverktøy",
	pageToolsOpenLabel: "Åpne verktøymeny",
	pageToolsCloseLabel: "Lukk verktøymeny",
	pageToolsMobileHandleLabel: "Verktøy",
	pageToolsUnavailableLabel: "Kommer senere",
	pageToolsCreateSubjectLabel: "Opprett nytt fag",
	pageToolsImportSubjectMaterialsLabel: "Legg inn notater eller forelesningsslides"
};

describe("createWorkspaceToolsModel", () => {
	test("creates a renderable model from a direct page definition", () => {
		const tools = createWorkspaceToolsModel({
			pageToolGroup: LEARNING_CONTENT_SELECT_PAGE_TOOLS,
			t
		});
		const importMaterialsTool = tools.items.find((item) => item.id === PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS);

		expect(tools.title).toBe("Velg læringsverktøy");
		expect(tools.subtitle).toBe("");
		expect(tools.actionsLabel).toBe("Læringsverktøy");
		expect(tools.openLabel).toBe("Åpne verktøymeny");
		expect(tools.mobileHandleLabel).toBe("Verktøy");
		expect(importMaterialsTool).toEqual(expect.objectContaining({
			statusLabel: "Kommer senere",
			ariaLabel: "Legg inn notater eller forelesningsslides · Kommer senere",
			isDisabled: true,
			onSelect: null
		}));
	});

	test("uses only the actions defined for that page", () => {
		const tools = createWorkspaceToolsModel({
			pageToolGroup: SUBJECT_SELECT_PAGE_TOOLS,
			t
		});

		expect(tools.title).toBe("");
		expect(tools.items.map((item) => item.id)).toEqual([
			PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
			PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS
		]);
	});

	test("returns null without a page definition", () => {
		expect(createWorkspaceToolsModel({ pageToolGroup: null, t })).toBeNull();
	});
});
