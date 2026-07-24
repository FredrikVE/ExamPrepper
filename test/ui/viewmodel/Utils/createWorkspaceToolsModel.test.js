import { describe, expect, test } from "@jest/globals";
import { NAV_ITEMS, NAV_SCREENS } from "../../../../src/navigation/navigation.js";
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
		const tools = createWorkspaceToolsModel({ pageToolGroup: NAV_ITEMS.popOutMenuItems[NAV_SCREENS.SELECT], t, topicAreaToolItems: [], activeTopicAreaKey: null });
		const importMaterialsTool = tools.items.find((item) => item.id === "app-import-subject-materials");

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
		const tools = createWorkspaceToolsModel({ pageToolGroup: NAV_ITEMS.popOutMenuItems[NAV_SCREENS.SUBJECTS], t, topicAreaToolItems: [], activeTopicAreaKey: null });

		expect(tools.title).toBe("");
		expect(tools.items.map((item) => item.id)).toEqual(["app-create-subject", "app-import-subject-materials"]);
	});

	test("returns null for an explicitly missing page definition", () => {
		expect(createWorkspaceToolsModel({ pageToolGroup: null, t, topicAreaToolItems: [], activeTopicAreaKey: null })).toBeNull();
	});
});
