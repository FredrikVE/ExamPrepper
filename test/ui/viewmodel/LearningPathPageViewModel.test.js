// test/ui/viewmodel/LearningPathPageViewModel.test.js
import fs from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";

const stateValues = [];
let stateCursor = 0;
let learningPath;
let onChapterTestSelected;

const useState = jest.fn((initialValue) => {
	const stateIndex = stateCursor;
	stateCursor += 1;

	if (!(stateIndex in stateValues)) {
		stateValues[stateIndex] = typeof initialValue === "function" ? initialValue() : initialValue;
	}

	const setter = jest.fn((nextValue) => {
		stateValues[stateIndex] = typeof nextValue === "function" ? nextValue(stateValues[stateIndex]) : nextValue;
	});

	return [stateValues[stateIndex], setter];
});
const useCallback = jest.fn((callback) => callback);
const useLoadModel = jest.fn(() => ({ status: "ready", data: learningPath, error: null, reload: jest.fn() }));

jest.unstable_mockModule("react", () => ({ useCallback, useState }));
jest.unstable_mockModule("../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({ default: useLoadModel }));

const { default: useLearningPathPageViewModel } = await import("../../../src/ui/viewmodel/LearningPathPageViewModel.js");

const fixture = JSON.parse(fs.readFileSync(path.resolve("test/fixtures/learning-path/learning-path-response.json"), "utf8"));
const t = translations[LANGUAGES.EN];

function renderViewModel({ authState, startLearningSessionUseCase, onLearningSessionStarted }) {
	stateCursor = 0;

	return useLearningPathPageViewModel({
		getLearningPathUseCase: { execute: jest.fn() },
		startLearningSessionUseCase,
		selectedSubject: { id: "in2120", code: "IN2120" },
		language: "no",
		t,
		isActive: true,
		backContract: { onBack: jest.fn() },
		contentToggleContract: {},
		onLearningSessionStarted,
		onChapterTestSelected,
		authState
	});
}

function createDeferred() {
	let resolve;
	let reject;
	const promise = new Promise((resolvePromise, rejectPromise) => {
		resolve = resolvePromise;
		reject = rejectPromise;
	});

	return { promise, resolve, reject };
}

describe("useLearningPathPageViewModel LearningPath actions", () => {
	beforeEach(() => {
		stateValues.length = 0;
		stateCursor = 0;
		learningPath = structuredClone(fixture);
		onChapterTestSelected = jest.fn();
		useState.mockClear();
		useCallback.mockClear();
		useLoadModel.mockClear();
	});

	test("keeps the optional-auth LearningPath load enabled for a signed-out user", () => {
		renderViewModel({ authState: { isLoaded: true, isSignedIn: false, userId: null }, startLearningSessionUseCase: { execute: jest.fn() }, onLearningSessionStarted: jest.fn() });

		expect(useLoadModel).toHaveBeenCalledTimes(1);
		expect(useLoadModel.mock.calls[0][0]).toMatchObject({ resourceKey: "in2120:no:signed-out", isEnabled: true });
	});

	test("keeps authored selectability but blocks anonymous LearningSession starts", async () => {
		const execute = jest.fn();
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: false, userId: null }, startLearningSessionUseCase: { execute }, onLearningSessionStarted: jest.fn() });
		const action = viewModel.roadmapModel.entries[0].actionModel;

		expect(action).toMatchObject({ intent: "start", isDisabled: true });
		await viewModel.onLearningPathAction(action);
		expect(execute).not.toHaveBeenCalled();
	});

	test("starts the backend-selected module target for a signed-in user", async () => {
		const execute = jest.fn().mockResolvedValue({ sessionId: "session-new" });
		const onLearningSessionStarted = jest.fn();
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });
		const action = viewModel.roadmapModel.entries[0].actionModel;

		expect(action).toMatchObject({ intent: "start", isDisabled: false });
		await viewModel.onLearningPathAction(action);
		expect(execute).toHaveBeenCalledWith({ subjectId: "in2120", moduleId: learningPath.modules[0].id, language: "no", target: { kind: "module" }, discardActiveSession: false });
		expect(onLearningSessionStarted).toHaveBeenCalledWith("session-new");
	});

	test("executes the backend-selected resume action while signed out", async () => {
		learningPath.resumableSession = { sessionId: "session-active", moduleId: learningPath.modules[0].id, currentQuestionPosition: 0 };
		const execute = jest.fn();
		const onLearningSessionStarted = jest.fn();
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: false, userId: null }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });
		const action = viewModel.roadmapModel.entries[0].actionModel;

		expect(action).toMatchObject({ intent: "resume", sessionId: "session-active", isDisabled: false });
		await viewModel.onLearningPathAction(action);
		expect(onLearningSessionStarted).toHaveBeenCalledWith("session-active");
		expect(execute).not.toHaveBeenCalled();
	});

	test("does not let a resumable session hijack an explicit start action", async () => {
		const execute = jest.fn().mockResolvedValue({ sessionId: "session-selected" });
		const onLearningSessionStarted = jest.fn();
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });
		const action = viewModel.roadmapModel.entries[0].actionModel;

		learningPath.resumableSession = { sessionId: "session-other", moduleId: "module-other", currentQuestionPosition: 0 };

		await viewModel.onLearningPathAction(action);
		expect(execute).toHaveBeenCalledWith({ subjectId: "in2120", moduleId: learningPath.modules[0].id, language: "no", target: { kind: "module" }, discardActiveSession: false });
		expect(onLearningSessionStarted).toHaveBeenCalledWith("session-selected");
		expect(onLearningSessionStarted).not.toHaveBeenCalledWith("session-other");
	});


	test("opens backend-selected ChapterTest without starting a LearningSession", async () => {
		learningPath.nextActivity = {
			kind: "chapter-test",
			moduleId: learningPath.modules[0].id,
			sectionId: learningPath.modules[0].sections[0].id,
			examId: "chapter-1a-test-no"
		};
		const execute = jest.fn();
		const onLearningSessionStarted = jest.fn();
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });
		const action = viewModel.roadmapModel.entries[0].actionModel;

		expect(action).toMatchObject({ intent: "open-chapter-test", examId: "chapter-1a-test-no", isDisabled: false });
		await viewModel.onLearningPathAction(action);
		expect(onChapterTestSelected).toHaveBeenCalledWith("chapter-1a-test-no");
		expect(execute).not.toHaveBeenCalled();
		expect(onLearningSessionStarted).not.toHaveBeenCalled();
	});

	test("rejects ChapterTest action without examId", async () => {
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute: jest.fn() }, onLearningSessionStarted: jest.fn() });

		await expect(viewModel.onLearningPathAction({ intent: "open-chapter-test", moduleId: learningPath.modules[0].id, isDisabled: false })).rejects.toThrow("LearningPath chapter test action requires examId");
	});

	test("tracks pending state by exact action identity while a session start is in flight", async () => {
		const deferred = createDeferred();
		const execute = jest.fn(() => deferred.promise);
		const onLearningSessionStarted = jest.fn();
		const render = () => renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });
		const initialViewModel = render();
		const moduleId = learningPath.modules[0].id;
		initialViewModel.onModuleToggle(moduleId);
		const expandedViewModel = render();
		const selectedAction = expandedViewModel.roadmapModel.entries[0].detailModel.sections[0].sessions[0].actionModel;
		const startPromise = expandedViewModel.onLearningPathAction(selectedAction);
		const pendingViewModel = render();
		const module = pendingViewModel.roadmapModel.entries[0];
		const section = module.detailModel.sections[0];

		expect(module.actionModel).toMatchObject({ isDisabled: true, isPending: false });
		expect(section.actionModel).toMatchObject({ isDisabled: true, isPending: false });
		expect(section.sessions[0].actionModel).toMatchObject({ actionKey: selectedAction.actionKey, isDisabled: true, isPending: true });
		expect(section.sessions[1].actionModel).toMatchObject({ isDisabled: true, isPending: false });

		deferred.resolve({ sessionId: "session-new" });
		await startPromise;

		const settledViewModel = render();
		expect(settledViewModel.roadmapModel.entries[0].detailModel.sections[0].sessions[0].actionModel.isPending).toBe(false);
	});

	test("sends the selected session target without collapsing request identity to module id", async () => {
		const execute = jest.fn().mockResolvedValue({ sessionId: "session-new" });
		const moduleId = learningPath.modules[0].id;
		const initialViewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted: jest.fn() });
		initialViewModel.onModuleToggle(moduleId);
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted: jest.fn() });
		const action = viewModel.roadmapModel.entries[0].detailModel.sections[0].sessions[0].actionModel;

		expect(action.actionKey).toBe(`module:${moduleId}:session:${action.target.planKey}`);
		await viewModel.onLearningPathAction(action);
		expect(execute).toHaveBeenCalledWith({ subjectId: "in2120", moduleId, language: "no", target: action.target, discardActiveSession: false });
		expect(viewModel).not.toHaveProperty("startSessionState");
	});

	test("exposes the start error without navigating when a start conflict occurs", async () => {
		const conflict = { code: "learning_session_resume_conflict", payload: { activeSessionId: "session-conflict" } };
		const execute = jest.fn().mockRejectedValue(conflict);
		const onLearningSessionStarted = jest.fn();
		const render = () => renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });
		const viewModel = render();

		await viewModel.onLearningPathAction(viewModel.roadmapModel.entries[0].actionModel);
		expect(onLearningSessionStarted).not.toHaveBeenCalled();

		const failedViewModel = render();
		expect(failedViewModel.startSessionError).toBe(t.learningPathStartErrorMessage);
	});

	test("exposes the start error when a LearningSession start fails", async () => {
		const execute = jest.fn().mockRejectedValue(new Error("network failed"));
		const render = () => renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted: jest.fn() });

		const viewModel = render();
		await viewModel.onLearningPathAction(viewModel.roadmapModel.entries[0].actionModel);

		const failedViewModel = render();
		expect(failedViewModel.startSessionError).toBe(t.learningPathStartErrorMessage);
	});

	test("fails fast for an unknown internal action intent", async () => {
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute: jest.fn() }, onLearningSessionStarted: jest.fn() });
		const action = { intent: "unknown", isDisabled: false };

		await expect(viewModel.onLearningPathAction(action)).rejects.toThrow("Unknown LearningPath action intent 'unknown'");
	});
});
