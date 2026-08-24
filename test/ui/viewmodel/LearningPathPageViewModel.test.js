// test/ui/viewmodel/LearningPathPageViewModel.test.js
import fs from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";

const stateValues = [];
let stateCursor = 0;
let learningPath;

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
		onChapterTestSelected: jest.fn(),
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
		useState.mockClear();
		useCallback.mockClear();
		useLoadModel.mockClear();
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

	test("resumes the active backend session before evaluating start auth", async () => {
		learningPath.resumableSession = { sessionId: "session-active", moduleId: learningPath.modules[0].id, currentQuestionPosition: 0 };
		const execute = jest.fn();
		const onLearningSessionStarted = jest.fn();
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: false, userId: null }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });

		await viewModel.onLearningPathAction(viewModel.roadmapModel.entries[0].actionModel);
		expect(onLearningSessionStarted).toHaveBeenCalledWith("session-active");
		expect(execute).not.toHaveBeenCalled();
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

	test("navigates to the active session returned by a start conflict", async () => {
		const conflict = { code: "learning_session_resume_conflict", payload: { activeSessionId: "session-conflict" } };
		const execute = jest.fn().mockRejectedValue(conflict);
		const onLearningSessionStarted = jest.fn();
		const viewModel = renderViewModel({ authState: { isLoaded: true, isSignedIn: true, userId: "user-1" }, startLearningSessionUseCase: { execute }, onLearningSessionStarted });

		await viewModel.onLearningPathAction(viewModel.roadmapModel.entries[0].actionModel);
		expect(onLearningSessionStarted).toHaveBeenCalledWith("session-conflict");
	});
});
