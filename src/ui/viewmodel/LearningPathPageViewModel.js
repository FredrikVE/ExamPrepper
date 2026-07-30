//src/ui/viewmodel/LearningPathPageViewModel.js
import { useCallback, useState } from "react";
import useLoadModel from "./LoadState/useLoadModel.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import createModuleStatus from "./LearningPath/createModuleStatus.js";

export default function useLearningPathPageViewModel({ getLearningPathUseCase, startLearningSessionUseCase, selectedSubject, language, t, isActive, backContract, contentToggleContract, onLearningSessionStarted }) {
	const [expandedModuleId, setExpandedModuleId] = useState(null);
	const [startingModuleId, setStartingModuleId] = useState(null);
	const [startSessionError, setStartSessionError] = useState(null);
	const [scrollRequestId, setScrollRequestId] = useState(0);
	const subjectId = selectedSubject === null ? null : selectedSubject.id;
	const resourceKey = subjectId === null ? "no-subject" : `${subjectId}:${language}`;

	const executeLoad = useCallback(() => {
		if (!isActive || subjectId === null) {
			return Promise.resolve({ subjectId: subjectId ?? "", modules: [] });
		}

		return getLearningPathUseCase.execute({ subjectId, language });
	}, [getLearningPathUseCase, isActive, language, subjectId]);

	const loadModel = useLoadModel({ execute: executeLoad, emptyData: { subjectId: subjectId ?? "", modules: [] }, errorMessage: t.learningPathLoadErrorMessage, resourceKey, isEnabled: isActive && subjectId !== null, onLoaded: null });
	const modules = loadModel.data.modules;
	const activeModule = findActiveModule(modules);
	const activeModuleId = activeModule === null ? null : activeModule.id;

	const toggleModule = useCallback((moduleId) => {
		setExpandedModuleId((currentId) => currentId === moduleId ? null : moduleId);
		setScrollRequestId((currentId) => currentId + 1);
	}, []);

	const moduleCardModels = modules.map((module, index) => createModuleCardModel({ module, index, modules, activeModuleId, expandedModuleId, startingModuleId, t, onModulePressed: toggleModule }));

	const startSession = useCallback(async (moduleId) => {
		if (!moduleId || startingModuleId !== null || selectedSubject === null) {
			return;
		}

		const moduleModel = moduleCardModels.find((module) => module.id === moduleId);
		if (!moduleModel || moduleModel.isStartDisabled) {
			return;
		}

		setStartingModuleId(moduleId);
		setStartSessionError(null);

		try {
			const session = await startLearningSessionUseCase.execute({ subjectId: selectedSubject.id, moduleId, language, round: moduleModel.nextRound });
			onLearningSessionStarted(session.sessionId);
		} catch (error) {
			setStartSessionError(t.learningPathStartErrorMessage);
		} finally {
			setStartingModuleId(null);
		}
	}, [language, moduleCardModels, onLearningSessionStarted, selectedSubject, startLearningSessionUseCase, startingModuleId, t.learningPathStartErrorMessage]);

	for (const model of moduleCardModels) {
		model.onStartPressed = () => startSession(model.id);
	}

	const workspaceState = createWorkspaceState({
		loadStatus: loadModel.status,
		isEmpty: modules.length === 0,
		labels: { loading: t.learningPathLoadingMessage, errorTitle: t.errorPrefix, errorBody: loadModel.error ?? t.learningPathLoadErrorMessage, emptyTitle: t.learningPathEmptyTitle, emptyBody: t.learningPathEmptyBody },
		errorAction: null
	});

	const continuePanelModel = createContinuePanelModel({ activeModule, moduleCardModels, t, startSession });
	const scrollRequest = expandedModuleId === null ? null : { requestId: scrollRequestId, targetModuleId: expandedModuleId, behavior: "smooth" };

	return {
		workspaceState,
		backContract,
		contentHeaderModel: { ...contentToggleContract, title: t.learningPathTitle, subtitle: selectedSubject === null ? t.learningPathSubtitleFallback : t.learningPathSubtitle(selectedSubject.code), titleId: "learning-path-title" },
		continuePanelModel,
		moduleTrackModel: { modules: moduleCardModels, onModulePressed: toggleModule, onStartPressed: startSession },
		scrollRequest,
		startSessionError
	};
}

function findActiveModule(modules) {
	for (const module of modules) {
		if (module.progress.completedRounds < 3) {
			return module;
		}
	}

	return modules[0] ?? null;
}

function createModuleCardModel({ module, index, modules, activeModuleId, expandedModuleId, startingModuleId, t, onModulePressed }) {
	const previousModule = index === 0 ? null : modules[index - 1];
	const isLocked = previousModule !== null && previousModule.progress.masteryPercent < 1;
	const isCompleted = module.progress.completedRounds >= 3;
	const status = createModuleStatus({ masteryPercent: module.progress.masteryPercent, isActive: module.id === activeModuleId, isCompleted, isLocked });

	return {
		id: module.id,
		position: module.position,
		title: module.title,
		description: module.description,
		statusLabel: t[status.labelKey],
		statusAppearance: status.appearance,
		statusIconKey: status.iconKey,
		masteryPercentage: module.progress.masteryPercent,
		masteryLabel: t.learningPathMasteryLabel(module.progress.masteryPercent),
		isExpanded: expandedModuleId === module.id,
		isStartDisabled: isLocked || startingModuleId !== null,
		isStarting: startingModuleId === module.id,
		nextRound: module.progress.nextRound,
		roundLabel: t.learningPathRoundLabel(module.progress.nextRound),
		topicLabels: [...module.topicLabels],
		startLabel: t.learningPathStartLabel,
		onPressed: () => onModulePressed(module.id),
		onStartPressed: null
	};
}

function createContinuePanelModel({ activeModule, moduleCardModels, t, startSession }) {
	if (activeModule === null) {
		return { isVisible: false, title: "", body: "", buttonLabel: "", isButtonDisabled: true, onStartPressed: null };
	}

	const model = moduleCardModels.find((module) => module.id === activeModule.id);
	return { isVisible: true, title: t.learningPathContinueTitle, body: activeModule.title, buttonLabel: t.learningPathContinueLabel, isButtonDisabled: model?.isStartDisabled ?? true, onStartPressed: () => startSession(activeModule.id) };
}
