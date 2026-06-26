import { describe, expect, jest, test } from "@jest/globals";
import createPageToolsViewModel from "../../../../src/ui/viewmodel/PageTools/createPageToolsViewModel.js";
import { NAV_SCREENS } from "../../../../src/navigation/navGraph.js";
import { PAGE_TOOL_ACTION_IDS, PAGE_TOOL_ITEM_IDS, getPageToolGroup } from "../../../../src/navigation/pageTools.js";

const t = {
    pageToolsWorkspaceTitle: "Verktøy og handlinger",
    pageToolsWorkspaceSubtitle: "Alt du trenger for å lære smartere",
    pageToolsWorkspaceActionsLabel: "Sideverktøy",
    pageToolsOpenLabel: "Åpne verktøymeny",
    pageToolsCloseLabel: "Lukk verktøymeny",
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

describe("createPageToolsViewModel", () => {
    test("creates a renderable tools model with labels and handlers", () => {
        const showExams = jest.fn();
        const tools = createPageToolsViewModel({
            pageToolGroup: getPageToolGroup(NAV_SCREENS.SELECT),
            t,
            actionHandlers: {
                [PAGE_TOOL_ACTION_IDS.SHOW_EXAMS]: showExams
            },
            disabledLabelsByActionId: {}
        });

        const examsTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.APP_EXAMS);
        const createExamTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.APP_CREATE_EXAM);

        expect(tools.title).toBe("Verktøy og handlinger");
        expect(tools.openLabel).toBe("Åpne verktøymeny");
        expect(examsTool).toEqual(expect.objectContaining({
            label: "Eksamner",
            ariaLabel: "Eksamner",
            isDisabled: false,
            onSelect: showExams
        }));
        expect(createExamTool).toEqual(expect.objectContaining({
            statusLabel: "Kommer senere",
            ariaLabel: "Opprett en ny eksamen · Kommer senere",
            isDisabled: true,
            onSelect: null
        }));
    });

    test("uses dynamic disabled labels for tools that need page context", () => {
        const tools = createPageToolsViewModel({
            pageToolGroup: getPageToolGroup(NAV_SCREENS.SUBJECTS),
            t,
            actionHandlers: {
                [PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]: jest.fn()
            },
            disabledLabelsByActionId: {
                [PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]: t.pageToolsSelectSubjectFirstLabel
            }
        });

        const flipcardsTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.APP_FLIPCARDS);

        expect(flipcardsTool).toEqual(expect.objectContaining({
            label: "Flipcards",
            statusLabel: "Velg fag først",
            ariaLabel: "Flipcards · Velg fag først",
            isDisabled: true,
            onSelect: null
        }));
    });

    test("returns null when no group is available", () => {
        const tools = createPageToolsViewModel({
            pageToolGroup: null,
            t,
            actionHandlers: {},
            disabledLabelsByActionId: {}
        });

        expect(tools).toBeNull();
    });
});
