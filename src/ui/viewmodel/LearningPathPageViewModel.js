//src/ui/viewmodel/LearningPathPageViewModel.js
import { useCallback, useState } from "react";
import useLoadModel from "./LoadState/useLoadModel.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import createContinueLearningModel from "./LearningPath/createContinueLearningModel.js";
import createLearningPathRoadmapModel from "./LearningPath/createLearningPathRoadmapModel.js";

const EMPTY_LEARNING_PATH = Object.freeze({ subjectId: "", activeModuleId: null, resumableSession: null, modules: [], examGate: { isUnlocked: false, requiredCompletedRounds: 3 } });

export default function useLearningPathPageViewModel({ getLearningPathUseCase, startLearningSessionUseCase, selectedSubject, language, t, isActive, backContract, contentToggleContract, onLearningSessionStarted }) {
	const [expandedModuleId, setExpandedModuleId] = useState(null);
	const [startingModuleId, setStartingModuleId] = useState(null);
	const [startSessionError, setStartSessionError] = useState(null);
	const [scrollRequestId, setScrollRequestId] = useState(0);
	const subjectId = selectedSubject === null ? null : selectedSubject.id;
	const resourceKey = subjectId === null ? "no-subject" : `${subjectId}:${language}`;

	const executeLoad = useCallback(() => {
		if (!isActive || subjectId === null) return Promise.resolve({ ...EMPTY_LEARNING_PATH, subjectId: subjectId ?? "" });
		return getLearningPathUseCase.execute({ subjectId, language });
	}, [getLearningPathUseCase, isActive, language, subjectId]);

	const loadModel = useLoadModel({ execute: executeLoad, emptyData: { ...EMPTY_LEARNING_PATH, subjectId: subjectId ?? "" }, errorMessage: t.learningPathLoadErrorMessage, resourceKey, isEnabled: isActive && subjectId !== null, onLoaded: null });
	const learningPath = loadModel.data;

	const toggleModule = useCallback((moduleId) => {
		const module = learningPath.modules.find((candidate) => candidate.id === moduleId);
		if (!module?.availability.isUnlocked) return;
		setExpandedModuleId((currentId) => currentId === moduleId ? null : moduleId);
		setScrollRequestId((currentId) => currentId + 1);
	}, [learningPath.modules]);

	const startSession = useCallback(async (actionModel) => {
		if (actionModel === null || !actionModel.moduleId || !Number.isInteger(actionModel.round) || startingModuleId !== null || selectedSubject === null) return;
		const module = learningPath.modules.find((candidate) => candidate.id === actionModel.moduleId);
		if (!module?.availability.isUnlocked) return;

		setStartingModuleId(actionModel.moduleId);
		setStartSessionError(null);

		try {
			const session = await startLearningSessionUseCase.execute({ subjectId: selectedSubject.id, moduleId: actionModel.moduleId, language, round: actionModel.round });
			onLearningSessionStarted(session.sessionId);
		} catch (_error) {
			setStartSessionError(t.learningPathStartErrorMessage);
		} finally {
			setStartingModuleId(null);
		}
	}, [language, learningPath.modules, onLearningSessionStarted, selectedSubject, startLearningSessionUseCase, startingModuleId, t.learningPathStartErrorMessage]);

	const roadmapModel = createLearningPathRoadmapModel({ learningPath, expandedModuleId, startingModuleId, t });
	const activeEntry = roadmapModel.entries.find((entry) => entry.kind === "module" && entry.id === learningPath.activeModuleId) ?? null;
	const continueModel = createContinueLearningModel({ activeEntry, resumableSession: learningPath.resumableSession, t });
	const executeLearningPathAction = useCallback(async (actionModel) => {
		if (actionModel === null || actionModel.isDisabled) return;
		if (actionModel.intent === "resume" && actionModel.sessionId !== null) {
			onLearningSessionStarted(actionModel.sessionId);
			return;
		}
		await startSession(actionModel);
	}, [onLearningSessionStarted, startSession]);

	const workspaceState = createWorkspaceState({
		loadStatus: loadModel.status,
		isEmpty: learningPath.modules.length === 0,
		labels: { loading: t.learningPathLoadingMessage, errorTitle: t.errorPrefix, errorBody: loadModel.error ?? t.learningPathLoadErrorMessage, emptyTitle: t.learningPathEmptyTitle, emptyBody: t.learningPathEmptyBody },
		errorAction: null
	});


	return {
		workspaceState,
		backContract,
		contentHeaderModel: { ...contentToggleContract, title: t.learningPathTitle, subtitle: selectedSubject === null ? t.learningPathSubtitleFallback : t.learningPathSubtitle(selectedSubject.code), titleId: "learning-path-title" },
		continuePanelModel: continueModel,
		roadmapModel,
		onModuleToggle: toggleModule,
		onLearningPathAction: executeLearningPathAction,
		scrollRequest: expandedModuleId === null ? null : { requestId: scrollRequestId, targetModuleId: expandedModuleId, behavior: "smooth" },
		startSessionState: { isStarting: startingModuleId !== null, moduleId: startingModuleId, errorMessage: startSessionError },
		startSessionError
	};
}
