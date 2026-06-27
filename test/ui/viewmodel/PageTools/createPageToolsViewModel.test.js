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
    pageToolsMobileHandleLabel: "Verktøy",
    pageToolsUnavailableLabel: "Kommer senere",
    pageToolsSelectSubjectFirstLabel: "Velg fag først",
    pageToolsExamTitle: "Eksamen-verktøy",
    pageToolsExamSubtitle: "Handlinger for aktiv øving",
    pageToolsExamActionsLabel: "Eksamen-handlinger",
    pageToolsExamPreviousQuestionLabel: "Forrige spørsmål",
    pageToolsExamNextQuestionLabel: "Neste spørsmål",
    pageToolsExamSubmitLabel: "Lever eksamen",
    pageToolsExamResetLabel: "Start på nytt",
    pageToolsFirstQuestionLabel: "Første spørsmål",
    pageToolsLastQuestionLabel: "Siste spørsmål",
    pageToolsAlreadySubmittedLabel: "Allerede levert",
    pageToolsSubmitFirstLabel: "Lever først",
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
            disabledLabelKeysByActionId: {}
        });

        const examsTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.APP_EXAMS);
        const createExamTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.APP_CREATE_EXAM);

        expect(tools.title).toBe("Verktøy og handlinger");
        expect(tools.openLabel).toBe("Åpne verktøymeny");
        expect(tools.mobileHandleLabel).toBe("Verktøy");
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
            disabledLabelKeysByActionId: {
                [PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]: "pageToolsSelectSubjectFirstLabel"
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


    test("creates exam tools with question navigation disabled state", () => {
        const previousQuestion = jest.fn();
        const nextQuestion = jest.fn();
        const submitExam = jest.fn();
        const resetExam = jest.fn();

        const tools = createPageToolsViewModel({
            pageToolGroup: getPageToolGroup(NAV_SCREENS.EXAM),
            t,
            actionHandlers: {
                [PAGE_TOOL_ACTION_IDS.EXAM_PREVIOUS_QUESTION]: previousQuestion,
                [PAGE_TOOL_ACTION_IDS.EXAM_NEXT_QUESTION]: nextQuestion,
                [PAGE_TOOL_ACTION_IDS.EXAM_SUBMIT]: submitExam,
                [PAGE_TOOL_ACTION_IDS.EXAM_RESET]: resetExam
            },
            disabledLabelKeysByActionId: {
                [PAGE_TOOL_ACTION_IDS.EXAM_PREVIOUS_QUESTION]: "pageToolsFirstQuestionLabel",
                [PAGE_TOOL_ACTION_IDS.EXAM_RESET]: "pageToolsSubmitFirstLabel"
            }
        });

        const previousTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.EXAM_PREVIOUS_QUESTION);
        const nextTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.EXAM_NEXT_QUESTION);
        const resetTool = tools.items.find((toolItem) => toolItem.id === PAGE_TOOL_ITEM_IDS.EXAM_RESET);

        expect(tools.title).toBe("Eksamen-verktøy");
        expect(previousTool).toEqual(expect.objectContaining({
            label: "Forrige spørsmål",
            statusLabel: "Første spørsmål",
            ariaLabel: "Forrige spørsmål · Første spørsmål",
            isDisabled: true,
            onSelect: null
        }));
        expect(nextTool).toEqual(expect.objectContaining({
            label: "Neste spørsmål",
            ariaLabel: "Neste spørsmål",
            isDisabled: false,
            onSelect: nextQuestion
        }));
        expect(resetTool).toEqual(expect.objectContaining({
            label: "Start på nytt",
            statusLabel: "Lever først",
            isDisabled: true
        }));
    });

    test("returns null when no group is available", () => {
        const tools = createPageToolsViewModel({
            pageToolGroup: null,
            t,
            actionHandlers: {},
            disabledLabelKeysByActionId: {}
        });

        expect(tools).toBeNull();
    });
});
