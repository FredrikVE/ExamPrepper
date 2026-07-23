import { describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS } from "../../../../src/navigation/navGraph.js";
import { PAGE_TOOL_ITEM_IDS, getLearningContentSelectWorkspaceActionToolItems, getPageToolGroup, getSubjectSelectWorkspaceActionToolItems } from "../../../../src/navigation/pageTools.js";
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
    pageToolsSelectedLabel: "Aktiv",
    pageToolsExamsLabel: "Eksamner",
    pageToolsPracticeTestsLabel: "Øveprøver",
    pageToolsFlipcardsLabel: "Flipcards",
    pageToolsCreateExamLabel: "Opprett ny eksamen",
    pageToolsCreateSubjectLabel: "Opprett nytt fag",
    pageToolsImportSubjectMaterialsLabel: "Legg inn notater eller forelesningsslides",
    pageToolsGlossaryLabel: "Begrepslister",
    pageToolsCurriculumGraphsLabel: "Pensumoversikt",
    pageToolsCurriculumFigureLabel: "Lag pensum-oversiktsfigur",
    pageToolsAiExamLabel: "Lag AI-generert øveeksamen"
};

function createTools(params) {
    return createWorkspaceToolsModel({
        pageToolGroup: getPageToolGroup(params.screen),
        t,
        workspaceActionToolItems: params.screen === NAV_SCREENS.SUBJECTS ? getSubjectSelectWorkspaceActionToolItems() : getLearningContentSelectWorkspaceActionToolItems(),
        onChangeScreen: params.onChangeScreen
    });
}

describe("createWorkspaceToolsModel", () => {
    test("creates a renderable workspace tools model from page tool actions", () => {
        const tools = createTools({
            screen: NAV_SCREENS.SELECT,
            onChangeScreen: jest.fn()
        });

        const importMaterialsTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS);

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

    test("keeps unwanted select page tools out of the renderable workspace model", () => {
        const tools = createTools({
            screen: NAV_SCREENS.SUBJECTS,
            onChangeScreen: jest.fn()
        });

        expect(tools.title).toBe("");
        expect(tools.items.map((toolItem) => toolItem.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
            PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS
        ]);
        expect(tools.items.map((toolItem) => toolItem.id)).not.toContain(PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_FIGURE);
    });

    test("returns null when no group is available", () => {
        const tools = createWorkspaceToolsModel({
            pageToolGroup: null,
            t,
            workspaceActionToolItems: getLearningContentSelectWorkspaceActionToolItems(),
            onChangeScreen: jest.fn()
        });

        expect(tools).toBeNull();
    });
});
