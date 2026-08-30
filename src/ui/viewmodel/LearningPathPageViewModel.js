// src/ui/viewmodel/LearningPathPageViewModel.js
import { useCallback, useState } from "react";
import { APP_AUTH_STATUS } from "../../auth/AppAuthState.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { LEARNING_PATH_ACTION_INTENT } from "./LearningPath/LearningPathActionIntent.js";
import createContinueLearningModel from "./LearningPath/createContinueLearningModel.js";
import createLearningPathRoadmapModel from "./LearningPath/createLearningPathRoadmapModel.js";

export default function useLearningPathPageViewModel(props) {
	const { getLearningPathUseCase, startLearningSessionUseCase, selectedSubject, language, t, isActive, backContract, contentToggleContract, onLearningSessionStarted, onChapterTestSelected, authState } = props;

	const [expandedModuleId, setExpandedModuleId] = useState(null);
	const [startingActionKey, setStartingActionKey] = useState(null);
	const [startSessionError, setStartSessionError] = useState(null);
	const [scrollRequestId, setScrollRequestId] = useState(0);

	let subjectId = null;

	if (selectedSubject !== null) {
		subjectId = selectedSubject.id;
	}

	const isAuthLoading = authState.status === APP_AUTH_STATUS.LOADING;
	const canStartLearningSessions = authState.status === APP_AUTH_STATUS.SIGNED_IN;
	const canLoadLearningPath = isActive && subjectId !== null && !isAuthLoading;
	const resourceKey = createLearningPathResourceKey({ subjectId, language, authState });
	const emptyLearningPath = createEmptyLearningPath(subjectId);

	const executeLoad = useCallback(() => {
		if (!canLoadLearningPath) {
			return Promise.resolve(createEmptyLearningPath(subjectId));
		}

		if (subjectId === null) {
			throw new Error("LearningPath load requires a subject");
		}

		return getLearningPathUseCase.execute({
			subjectId,
			language
		});
	}, [canLoadLearningPath, getLearningPathUseCase, language, subjectId]);

	const loadModel = useLoadModel({
		execute: executeLoad,
		emptyData: emptyLearningPath,
		errorMessage: t.learningPathLoadErrorMessage,
		resourceKey,
		isEnabled: canLoadLearningPath,
		onLoaded: null
	});

	const learningPath = loadModel.data;

	const toggleModule = useCallback((moduleId) => {
		const module = findModuleById(learningPath.modules, moduleId);

		if (module === null) {
			return;
		}

		if (!module.availability.isUnlocked) {
			return;
		}

		setExpandedModuleId((currentModuleId) => {
			if (currentModuleId === moduleId) {
				return null;
			}

			return moduleId;
		});

		setScrollRequestId((currentRequestId) => {
			return currentRequestId + 1;
		});
	}, [learningPath.modules]);

	const startLearningSession = useCallback(async (actionModel) => {
		if (startingActionKey !== null) {
			return;
		}

		if (subjectId === null) {
			return;
		}

		if (typeof actionModel.moduleId !== "string" || typeof actionModel.actionKey !== "string") {
			throw new Error("LearningPath start action requires moduleId and actionKey");
		}

		const module = findModuleById(learningPath.modules, actionModel.moduleId);

		if (module === null) {
			return;
		}

		if (!module.availability.isUnlocked) {
			return;
		}

		setStartingActionKey(actionModel.actionKey);
		setStartSessionError(null);

		try {
			const session = await startLearningSessionUseCase.execute({
				subjectId,
				moduleId: actionModel.moduleId,
				language,
				target: actionModel.target,
				discardActiveSession: false
			});

			onLearningSessionStarted(session.sessionId);
		}

		catch {
			setStartSessionError(t.learningPathStartErrorMessage);
		}

		finally {
			setStartingActionKey(null);
		}
	}, [language, learningPath.modules, onLearningSessionStarted, startLearningSessionUseCase, startingActionKey, subjectId, t.learningPathStartErrorMessage]);

	const roadmapModel = createLearningPathRoadmapModel({
		learningPath,
		expandedModuleId,
		startingActionKey,
		canStartLearningSessions,
		t
	});

	const activeEntry = findActiveModuleEntry({
		entries: roadmapModel.entries,
		activeModuleId: learningPath.activeModuleId
	});

	const continueModel = createContinueLearningModel({
		activeEntry,
		t
	});

	const executeLearningPathAction = useCallback(async (actionModel) => {
		if (actionModel === null) {
			return;
		}

		if (actionModel.isDisabled) {
			return;
		}

		switch (actionModel.intent) {
			case LEARNING_PATH_ACTION_INTENT.RESUME:
				if (typeof actionModel.sessionId !== "string") {
					throw new Error("LearningPath resume action requires sessionId");
				}

				onLearningSessionStarted(actionModel.sessionId);
				return;

			case LEARNING_PATH_ACTION_INTENT.START:
				if (!canStartLearningSessions) {
					return;
				}

				await startLearningSession(actionModel);
				return;

			case LEARNING_PATH_ACTION_INTENT.OPEN_CHAPTER_TEST:
				if (typeof actionModel.examId !== "string") {
					throw new Error("LearningPath chapter test action requires examId");
				}

				onChapterTestSelected(actionModel.examId);
				return;

			default:
				throw new Error(`Unknown LearningPath action intent '${String(actionModel.intent)}'`);
		}
	}, [canStartLearningSessions, onChapterTestSelected, onLearningSessionStarted, startLearningSession]);

	let workspaceErrorBody = t.learningPathLoadErrorMessage;

	if (loadModel.error !== null) {
		workspaceErrorBody = loadModel.error;
	}

	const workspaceState = createWorkspaceState({
		loadStatus: loadModel.status,
		isEmpty: learningPath.modules.length === 0,

		labels: {
			loading: t.learningPathLoadingMessage,
			errorTitle: t.errorPrefix,
			errorBody: workspaceErrorBody,
			emptyTitle: t.learningPathEmptyTitle,
			emptyBody: t.learningPathEmptyBody
		},

		errorAction: null
	});

	let subtitle = t.learningPathSubtitleFallback;

	if (selectedSubject !== null) {
		subtitle = t.learningPathSubtitle(selectedSubject.code);
	}

	const contentHeaderModel = {
		...contentToggleContract,
		title: t.learningPathTitle,
		subtitle,
		titleId: "learning-path-title"
	};

	let scrollRequest = null;

	if (expandedModuleId !== null) {
		scrollRequest = {
			requestId: scrollRequestId,
			targetModuleId: expandedModuleId,
			behavior: "smooth"
		};
	}

	return {
		workspaceState,
		backContract,
		contentHeaderModel,
		continuePanelModel: continueModel,
		roadmapModel,
		onModuleToggle: toggleModule,
		onLearningPathAction: executeLearningPathAction,
		onChapterTestSelected,
		scrollRequest,
		startSessionError
	};
}

function createEmptyLearningPath(subjectId) {
	let resolvedSubjectId = "";

	if (subjectId !== null) {
		resolvedSubjectId = subjectId;
	}

	return {
		subjectId: resolvedSubjectId,
		activeModuleId: null,
		resumableSession: null,
		nextActivity: null,
		modules: [],

		examGate: {
			isUnlocked: false
		}
	};
}

function createLearningPathResourceKey({ subjectId, language, authState }) {
	if (subjectId === null) {
		return "no-subject";
	}

	if (authState.status === APP_AUTH_STATUS.LOADING) {
		return `${subjectId}:${language}:auth-loading`;
	}

	if (authState.status === APP_AUTH_STATUS.SIGNED_IN) {
		return `${subjectId}:${language}:${authState.userId}`;
	}

	if (
		authState.status === APP_AUTH_STATUS.DISABLED
		|| authState.status === APP_AUTH_STATUS.SIGNED_OUT
	) {
		return `${subjectId}:${language}:signed-out`;
	}

	throw new Error(`Unknown app auth status '${String(authState.status)}'`);
}

function findModuleById(modules, moduleId) {
	const module = modules.find((candidate) => {
		return candidate.id === moduleId;
	});

	if (module === undefined) {
		return null;
	}

	return module;
}

function findActiveModuleEntry({ entries, activeModuleId }) {
	const activeEntry = entries.find((entry) => {
		return entry.kind === "module" && entry.id === activeModuleId;
	});

	if (activeEntry === undefined) {
		return null;
	}

	return activeEntry;
}
