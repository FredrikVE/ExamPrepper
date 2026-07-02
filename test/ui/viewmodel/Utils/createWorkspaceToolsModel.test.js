import { describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS } from "../../../../src/navigation/navGraph.js";
import { PAGE_NAV_TOOL_IDS, getExamSelectPageNavToolItems } from "../../../../src/navigation/navItems.js";
import { PAGE_TOOL_ITEM_IDS, getExamSelectWorkspaceActionToolItems, getPageToolGroup, getSubjectSelectWorkspaceActionToolItems } from "../../../../src/navigation/pageTools.js";
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
    pageToolsSelectSubjectFirstLabel: "Velg fag først",
    pageToolsExamsLabel: "Eksamner",
    pageToolsPracticeTestsLabel: "Øveprøver",
    pageToolsFlipcardsLabel: "Flipcards",
    pageToolsCreateExamLabel: "Opprett ny eksamen",
    pageToolsCreateSubjectLabel: "Opprett nytt fag",
    pageToolsImportSubjectMaterialsLabel: "Legg inn notater eller forelesningsslides",
    pageToolsConceptListLabel: "Begrepslister",
    pageToolsCurriculumGraphsLabel: "Pensumoversikt",
    pageToolsCurriculumFigureLabel: "Lag pensum-oversiktsfigur",
    pageToolsAiExamLabel: "Lag AI-generert øveeksamen"
};

function createTools(params) {
    return createWorkspaceToolsModel({
        pageToolGroup: getPageToolGroup(params.screen),
        t,
        navToolItems: params.screen === NAV_SCREENS.SUBJECTS ? [] : getExamSelectPageNavToolItems(),
        workspaceActionToolItems: params.screen === NAV_SCREENS.SUBJECTS ? getSubjectSelectWorkspaceActionToolItems() : getExamSelectWorkspaceActionToolItems(),
        hasSelectedSubject: params.hasSelectedSubject,
        onChangeScreen: params.onChangeScreen
    });
}

describe("createWorkspaceToolsModel", () => {
    test("creates a renderable workspace tools model from navItems and page tool actions", () => {
        const onChangeScreen = jest.fn();
        const tools = createTools({
            screen: NAV_SCREENS.SELECT,
            hasSelectedSubject: true,
            onChangeScreen
        });

        const examsTool = tools.items.find((toolItem) => toolItem.id === PAGE_NAV_TOOL_IDS.EXAMS);
        const createExamTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.APP_CREATE_EXAM);

        expect(tools.title).toBe("Velg læringsverktøy");
        expect(tools.subtitle).toBe("");
        expect(tools.actionsLabel).toBe("Læringsverktøy");
        expect(tools.openLabel).toBe("Åpne verktøymeny");
        expect(tools.mobileHandleLabel).toBe("Verktøy");
        expect(examsTool).toEqual(expect.objectContaining({
            label: "Eksamner",
            ariaLabel: "Eksamner",
            screen: NAV_SCREENS.SELECT,
            isDisabled: false
        }));
        expect(createExamTool).toEqual(expect.objectContaining({
            statusLabel: "Kommer senere",
            ariaLabel: "Opprett ny eksamen · Kommer senere",
            isDisabled: true,
            onSelect: null
        }));

        examsTool.onSelect();

        expect(onChangeScreen).toHaveBeenCalledWith(NAV_SCREENS.SELECT);
    });

    test("keeps unwanted select page tools out of the renderable workspace model", () => {
        const tools = createTools({
            screen: NAV_SCREENS.SUBJECTS,
            hasSelectedSubject: false,
            onChangeScreen: jest.fn()
        });

        expect(tools.title).toBe("");
        expect(tools.items.map((toolItem) => toolItem.id)).toEqual([
            PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
            PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS
        ]);
        expect(tools.items.map((toolItem) => toolItem.id)).not.toContain(PAGE_NAV_TOOL_IDS.PRACTICE_TESTS);
        expect(tools.items.map((toolItem) => toolItem.id)).not.toContain(PAGE_NAV_TOOL_IDS.FLIPCARDS);
        expect(tools.items.map((toolItem) => toolItem.id)).not.toContain(PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_FIGURE);
    });

    test("returns null when no group is available", () => {
        const tools = createWorkspaceToolsModel({
            pageToolGroup: null,
            t,
            navToolItems: getExamSelectPageNavToolItems(),
            workspaceActionToolItems: getExamSelectWorkspaceActionToolItems(),
            hasSelectedSubject: true,
            onChangeScreen: jest.fn()
        });

        expect(tools).toBeNull();
    });
});
