// src/ui/viewmodel/StatisticsPageViewModel.js
import { useEffect } from "react";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import { SUBJECT_SWITCHER_KINDS } from "./SubjectCatalog/subjectSwitcherKinds.js";
import createStatisticsTextModel from "./StatisticsPage/createStatisticsTextModel.js";
import { createStatisticsViewToggleModel, selectStatisticsView } from "./StatisticsPage/statisticsViewToggle.js";
import useStatisticsOverviewModel from "./StatisticsPage/Overview/useStatisticsOverviewModel.js";

export default function useStatisticsPageViewModel(props) {
	const text = createStatisticsTextModel(props.t);
	const viewToggle = createStatisticsViewToggleModel(text);
	const overview = useStatisticsOverviewModel({
		getSubjectStatisticsUseCase: props.getSubjectStatisticsUseCase,
		subjectId: props.subjectId,
		formatDate: props.formatDate,
		language: props.language,
		selectedSubject: props.selectedSubject,
		text,
		authState: props.authState,
		onStartNewExam: props.onStartNewExam
	});

	useEffect(() => {
		if (props.subjectId !== null) {
			return;
		}

		if (props.subjectSwitcher.kind !== SUBJECT_SWITCHER_KINDS.UNSELECTED) {
			return;
		}

		const firstSubject = props.subjectSwitcher.subjects[0];

		if (firstSubject === undefined) {
			throw new Error("Unselected subject switcher requires at least one subject");
		}

		props.onSelectSubject(firstSubject.id);
	}, [props.onSelectSubject, props.subjectId, props.subjectSwitcher.kind, props.subjectSwitcher.subjects]);

	const subjectSelector = {
		...props.subjectSwitcher,
		menuLabel: text.subjectSelectorMenuLabel,
		closeLabel: text.subjectSelectorCloseLabel
	};
	const workspaceState = createStatisticsPageWorkspaceState({
		subjectId: props.subjectId,
		subjectSwitcher: props.subjectSwitcher,
		overviewWorkspaceState: overview.workspaceState,
		t: props.t
	});

	return {
		workspaceState,
		overview: overview.presentation,
		overviewActions: overview.actions,
		subjectId: props.subjectId,
		selectedSubject: props.selectedSubject,
		subjectSwitcher: props.subjectSwitcher,
		subjectSelector,
		onSelectSubject: props.onSelectSubject,
		backContract: props.backContract,
		pageTitle: text.pageTitle,
		pageSubtitle: text.pageSubtitle,
		viewToggle: {
			...viewToggle,
			onSelectEntry: selectStatisticsView
		}
	};
}

function createStatisticsPageWorkspaceState({ subjectId, subjectSwitcher, overviewWorkspaceState, t }) {
	if (subjectId !== null) {
		return overviewWorkspaceState;
	}

	switch (subjectSwitcher.kind) {
		case SUBJECT_SWITCHER_KINDS.LOADING:
			return {
				kind: WORKSPACE_STATE_KINDS.LOADING,
				label: subjectSwitcher.label
			};

		case SUBJECT_SWITCHER_KINDS.ERROR:
			return {
				kind: WORKSPACE_STATE_KINDS.ERROR,
				title: t.errorPrefix,
				body: subjectSwitcher.label,
				action: null
			};

		case SUBJECT_SWITCHER_KINDS.EMPTY:
			return {
				kind: WORKSPACE_STATE_KINDS.EMPTY,
				title: subjectSwitcher.label,
				body: "",
				action: null
			};

		case SUBJECT_SWITCHER_KINDS.UNSELECTED:
			return {
				kind: WORKSPACE_STATE_KINDS.LOADING,
				label: t.statisticsLoadingTitle
			};

		case SUBJECT_SWITCHER_KINDS.READY:
			throw new Error("Ready subject switcher requires a selected subject id");

		default:
			throw new Error(`Unknown subject switcher kind: ${String(subjectSwitcher.kind)}`);
	}
}
