// src/ui/viewmodel/LearningPathPageViewModel.js
import { useCallback, useMemo, useState } from "react";
import { APP_AUTH_STATUS } from "../../auth/AppAuthState.js";
import { LEARNING_CONTENT_TYPES, TEST_TYPES } from "../../navigation/navigation.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import { createContentToggleEntries, createMobileToggleButtonItems } from "./Shared/contentToggleModel.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import createLearningPathPagePresentation, {
	LEARNING_PATH_ACTION_INTENT
} from "./LearningPathPagePresentation.js";

const EMPTY_LEARNING_PATH = Object.freeze({
	activeModuleId: null,
	resumableSession: null,
	nextActivity: null,
	modules: Object.freeze([]),
	examGate: Object.freeze({
		isUnlocked: false
	})
});

export default function useLearningPathPageViewModel({
	getLearningPathUseCase,
	startLearningSessionUseCase,
	selectedSubject,
	language,
	t,
	backContract,
	onSelectContentType,
	onLearningSessionStarted,
	onChapterTestSelected,
	authState
}) {
	const [expandedModuleId, setExpandedModuleId] = useState(null);
	const [startingActionKey, setStartingActionKey] = useState(null);
	const [startSessionError, setStartSessionError] = useState(null);

	const subjectId = selectedSubject?.id ?? null;
	const isAuthLoading = authState.status === APP_AUTH_STATUS.LOADING;
	const canStartLearningSessions =
		authState.status === APP_AUTH_STATUS.SIGNED_IN;
	const canLoadLearningPath =
		subjectId !== null
		&& !isAuthLoading;

	const executeLoad = useCallback(() => {
		if (subjectId === null) {
			throw new Error("LearningPath load requires a subject");
		}

		return getLearningPathUseCase.execute({
			subjectId,
			language
		});
	}, [getLearningPathUseCase, language, subjectId]);

	const loadModel = useLoadModel({
		execute: executeLoad,
		emptyData: EMPTY_LEARNING_PATH,
		errorMessage: t.learningPathLoadErrorMessage,
		resourceKey: createLearningPathResourceKey({
			subjectId,
			language,
			authState
		}),
		isEnabled: canLoadLearningPath,
		onLoaded: null
	});

	const learningPath = loadModel.data;

	const onModuleToggle = useCallback((moduleId) => {
		const module = learningPath.modules.find(
			(candidate) => candidate.id === moduleId
		);

		if (module === undefined) {
			throw new Error(
				`Unknown LearningPath module '${String(moduleId)}'`
			);
		}

		if (!module.availability.isUnlocked) {
			return;
		}

		setExpandedModuleId(
			(current) => current === moduleId ? null : moduleId
		);

	}, [learningPath.modules]);

	const startLearningSession = useCallback(async (actionModel) => {
		if (startingActionKey !== null) {
			return;
		}

		if (subjectId === null) {
			throw new Error("LearningPath start requires a subject");
		}

		if (
			typeof actionModel.moduleId !== "string"
			|| typeof actionModel.actionKey !== "string"
		) {
			throw new Error(
				"LearningPath start action requires moduleId and actionKey"
			);
		}

		const module = learningPath.modules.find(
			(candidate) => candidate.id === actionModel.moduleId
		);

		if (module === undefined) {
			throw new Error(
				`Unknown LearningPath module '${String(actionModel.moduleId)}'`
			);
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
	}, [
		language,
		learningPath.modules,
		onLearningSessionStarted,
		startLearningSessionUseCase,
		startingActionKey,
		subjectId,
		t.learningPathStartErrorMessage
	]);

	const onLearningPathAction = useCallback(async (actionModel) => {
		if (actionModel === null || actionModel.isDisabled) {
			return;
		}

		switch (actionModel.intent) {
			case LEARNING_PATH_ACTION_INTENT.RESUME:
				if (typeof actionModel.sessionId !== "string") {
					throw new Error(
						"LearningPath resume action requires sessionId"
					);
				}

				onLearningSessionStarted(actionModel.sessionId);
				return;

			case LEARNING_PATH_ACTION_INTENT.START:
				if (canStartLearningSessions) {
					await startLearningSession(actionModel);
				}

				return;

			case LEARNING_PATH_ACTION_INTENT.OPEN_CHAPTER_TEST:
				if (typeof actionModel.examId !== "string") {
					throw new Error(
						"LearningPath chapter test action requires examId"
					);
				}

				onChapterTestSelected(
					actionModel.examId,
					TEST_TYPES.CHAPTER_TEST
				);
				return;

			default:
				throw new Error(
					`Unknown LearningPath action intent '${String(actionModel.intent)}'`
				);
		}
	}, [
		canStartLearningSessions,
		onChapterTestSelected,
		onLearningSessionStarted,
		startLearningSession
	]);

	const presentation = createLearningPathPagePresentation({
		learningPath,
		expandedModuleId,
		startingActionKey,
		canStartLearningSessions,
		t
	});

	const workspaceState = createWorkspaceState({
		loadStatus: loadModel.status,
		isEmpty: learningPath.modules.length === 0,
		labels: {
			loading: t.learningPathLoadingMessage,
			errorTitle: t.errorPrefix,
			errorBody: loadModel.error ?? t.learningPathLoadErrorMessage,
			emptyTitle: t.learningPathEmptyTitle,
			emptyBody: t.learningPathEmptyBody
		},
		errorAction: null
	});

	const contentToggleEntries = useMemo(
		() => createContentToggleEntries(t),
		[t]
	);

	const mobileToggleButtonItems = useMemo(() => createMobileToggleButtonItems({
		contentToggleEntries,
		activeContentType: LEARNING_CONTENT_TYPES.LEARNING_PATH,
		selectedTestType: null,
		t
	}), [contentToggleEntries, t]);

	return {
		workspaceState,
		backContract,
		contentHeaderModel: {
			entries: contentToggleEntries,
			activeEntryId: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			mobileItems: mobileToggleButtonItems,
			mobileActiveEntryId: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			onSelectEntry: onSelectContentType,
			mobileBackLabel: t.contentToggleBackLabel,
			ariaLabel: t.contentToggleAriaLabel,
			title: t.learningPathTitle,
			subtitle: selectedSubject === null
				? t.learningPathSubtitleFallback
				: t.learningPathSubtitle(selectedSubject.code),
			titleId: "learning-path-title"
		},
		continuePanelModel: presentation.continuePanelModel,
		roadmapModel: presentation.roadmapModel,
		onModuleToggle,
		onLearningPathAction,
		scrollToModuleId: expandedModuleId,
		startSessionError
	};
}

function createLearningPathResourceKey({
	subjectId,
	language,
	authState
}) {
	if (subjectId === null) {
		return "no-subject";
	}

	switch (authState.status) {
		case APP_AUTH_STATUS.LOADING:
			return `${subjectId}:${language}:auth-loading`;

		case APP_AUTH_STATUS.SIGNED_IN:
			return `${subjectId}:${language}:user:${authState.userId}`;

		case APP_AUTH_STATUS.DISABLED:
			return `${subjectId}:${language}:auth-disabled`;

		case APP_AUTH_STATUS.SIGNED_OUT:
			return `${subjectId}:${language}:signed-out`;

		default:
			throw new Error(
				`Unknown app auth status '${String(authState.status)}'`
			);
	}
}
