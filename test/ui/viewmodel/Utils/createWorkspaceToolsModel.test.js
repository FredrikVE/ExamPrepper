import { describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS } from "../../../../src/navigation/navGraph.js";
import { PAGE_NAV_TOOL_IDS, PAGE_NAV_TOOL_ITEMS } from "../../../../src/navigation/navItems.js";
import { PAGE_TOOL_ITEM_IDS, getPageToolGroup, getWorkspaceActionToolItems } from "../../../../src/navigation/pageTools.js";
import createWorkspaceToolsModel from "../../../../src/ui/viewmodel/Utils/createWorkspaceToolsModel.js";

const t = {
    pageToolsWorkspaceTitle: "Verktøy og handlinger",
    pageToolsWorkspaceSubtitle: "Alt du trenger for å lære smartere",
    pageToolsWorkspaceActionsLabel: "Sideverktøy",
    pageToolsOpenLabel: "Åpne verktøymeny",
    pageToolsCloseLabel: "Lukk verktøymeny",
    pageToolsMobileHandleLabel: "Verktøy",
    pageToolsUnavailableLabel: "Kommer senere",
    pageToolsSelectSubjectFirstLabel: "Velg fag først",
    pageToolsExamsLabel: "Eksamner",
    pageToolsPracticeTestsLabel: "Øveprøver",
    pageToolsFlipcardsLabel: "Flipcards",
    pageToolsCreateExamLabel: "Opprett en ny eksamen",
    pageToolsConceptListLabel: "Lag begrepsliste",
    pageToolsCurriculumGraphsLabel: "Lag pensumgrafer",
    pageToolsCurriculumFigureLabel: "Lag pensum-oversiktsfigur",
    pageToolsAiExamLabel: "Lag AI-generert øve-eksamen"
};

function createTools(params) {
    return createWorkspaceToolsModel({
        pageToolGroup: getPageToolGroup(params.screen),
        t,
        navToolItems: PAGE_NAV_TOOL_ITEMS,
        workspaceActionToolItems: getWorkspaceActionToolItems(),
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

        expect(tools.title).toBe("Verktøy og handlinger");
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
            ariaLabel: "Opprett en ny eksamen · Kommer senere",
            isDisabled: true,
            onSelect: null
        }));

        examsTool.onSelect();

        expect(onChangeScreen).toHaveBeenCalledWith(NAV_SCREENS.SELECT);
    });

    test("uses requiresSubject from navItems for select-subject-first disabled state", () => {
        const tools = createTools({
            screen: NAV_SCREENS.SUBJECTS,
            hasSelectedSubject: false,
            onChangeScreen: jest.fn()
        });

        const flipcardsTool = tools.items.find((toolItem) => toolItem.id === PAGE_NAV_TOOL_IDS.FLIPCARDS);

        expect(flipcardsTool).toEqual(expect.objectContaining({
            label: "Flipcards",
            statusLabel: "Velg fag først",
            ariaLabel: "Flipcards · Velg fag først",
            isDisabled: true,
            onSelect: null
        }));
    });

    test("returns null when no group is available", () => {
        const tools = createWorkspaceToolsModel({
            pageToolGroup: null,
            t,
            navToolItems: PAGE_NAV_TOOL_ITEMS,
            workspaceActionToolItems: getWorkspaceActionToolItems(),
            hasSelectedSubject: true,
            onChangeScreen: jest.fn()
        });

        expect(tools).toBeNull();
    });
});
