// src/ui/viewmodel/GlossaryPage/useGlossaryPageResources.js
import { useCallback } from "react";
import { LOAD_STATUS } from "../LoadState/loadStatus.js";
import useLoadModel from "../LoadState/useLoadModel.js";
import combineLoadStatuses from "../LoadState/combineLoadStatuses.js";
import resolveFirstLoadError from "../Utils/resolveFirstLoadError.js";

export default function useGlossaryPageResources({ getGlossaryOverviewUseCase, getGlossaryNetworkUseCase, getTopicAreasUseCase, subjectId, language, isActive, expandedGlossaryEntryKey, t }) {
	const executeGlossaryOverviewLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getGlossaryOverviewUseCase.execute({ subjectId });
	}, [getGlossaryOverviewUseCase, isActive, subjectId]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getTopicAreasUseCase.execute({
			subjectId,
			language
		});
	}, [getTopicAreasUseCase, isActive, language, subjectId]);

	const executeGlossaryNetworkLoad = useCallback(() => {
		if (!isActive || !subjectId || !expandedGlossaryEntryKey) {
			return Promise.resolve(null);
		}

		return getGlossaryNetworkUseCase.execute({
			subjectId,
			glossaryEntryKey: expandedGlossaryEntryKey
		});
	}, [getGlossaryNetworkUseCase, isActive, expandedGlossaryEntryKey, subjectId]);

	const isLoadEnabled = isActive && subjectId !== null;
	const glossaryOverviewLoad = useLoadModel({
		execute: executeGlossaryOverviewLoad,
		emptyData: [],
		errorMessage: t.glossaryPageErrorMessage,
		resourceKey: subjectId,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});
	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.glossaryPageErrorMessage,
		resourceKey: subjectId === null ? "no-subject" : `${subjectId}:${language}`,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});
	const pageStatus = combineLoadStatuses([
		glossaryOverviewLoad.status,
		topicAreaLoad.status
	]);
	const isPageContentReady = pageStatus === LOAD_STATUS.READY;
	const activeGlossaryDetailEntryKey = isPageContentReady ? expandedGlossaryEntryKey : null;
	const glossaryNetworkLoad = useLoadModel({
		execute: executeGlossaryNetworkLoad,
		emptyData: null,
		errorMessage: t.glossaryPageNetworkErrorMessage,
		resourceKey: `${subjectId ?? "no-subject"}:${activeGlossaryDetailEntryKey ?? "no-concept"}`,
		isEnabled: isLoadEnabled && activeGlossaryDetailEntryKey !== null,
		onLoaded: null
	});
	const pageErrorMessage = resolveFirstLoadError([
		glossaryOverviewLoad,
		topicAreaLoad
	], t.glossaryPageErrorMessage);

	return {
		glossaryEntries: glossaryOverviewLoad.data,
		topicAreas: topicAreaLoad.data,
		pageStatus,
		isPageContentReady,
		activeGlossaryDetailEntryKey,
		glossaryNetworkLoad,
		pageErrorMessage
	};
}
