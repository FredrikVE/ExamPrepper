// src/ui/viewmodel/StatisticsPageViewModel.js
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import { SUBJECT_SWITCHER_KINDS } from "./SubjectCatalog/subjectSwitcherKinds.js";
import createStatisticsTextModel from "./StatisticsPage/createStatisticsTextModel.js";
import { createStatisticsViewToggleModel, selectStatisticsView } from "./StatisticsPage/statisticsViewToggle.js";
import useStatisticsOverviewModel from "./StatisticsPage/Overview/useStatisticsOverviewModel.js";

export default function useStatisticsPageViewModel(props) {
	const text = createStatisticsTextModel(props.t);
	const viewToggle = createStatisticsViewToggleModel(text);
	const displayedSubject = resolveDisplayedStatisticsSubject({ subjectId: props.subjectId, selectedSubject: props.selectedSubject, subjectSwitcher: props.subjectSwitcher });
	const displayedSubjectId = displayedSubject?.id ?? props.subjectId;
	const overview = useStatisticsOverviewModel({
		getSubjectStatisticsUseCase: props.getSubjectStatisticsUseCase,
		subjectId: displayedSubjectId,
		formatDate: props.formatDate,
		language: props.language,
		selectedSubject: displayedSubject,
		text,
		authState: props.authState,
		onStartNewExam: props.onStartNewExam
	});

	const subjectSelector = createStatisticsSubjectSelector({
		subjectSwitcher: props.subjectSwitcher,
		displayedSubject,
		text
	});
	const workspaceState = createStatisticsPageWorkspaceState({
		subjectId: displayedSubjectId,
		subjectSwitcher: props.subjectSwitcher,
		overviewWorkspaceState: overview.workspaceState,
		t: props.t
	});
	const backContract = createStatisticsBackContract({
		backContract: props.backContract,
		displayedSubjectId,
		onBackToLearningPath: props.onBackToLearningPath
	});

	return {
		workspaceState,
		overview: overview.presentation,
		overviewCardStates: overview.cardStates,
		overviewActions: overview.actions,
		subjectId: displayedSubjectId,
		selectedSubject: displayedSubject,
		subjectSwitcher: props.subjectSwitcher,
		subjectSelector,
		onSelectSubject: props.onSelectSubject,
		backContract,
		pageTitle: text.pageTitle,
		pageSubtitle: text.pageSubtitle,
		viewToggle: {
			...viewToggle,
			onSelectEntry: selectStatisticsView
		}
	};
}

function createStatisticsBackContract({ backContract, displayedSubjectId, onBackToLearningPath }) {
	if (displayedSubjectId === null) {
		return backContract;
	}

	return {
		...backContract,
		onBack: () => onBackToLearningPath(displayedSubjectId)
	};
}

function resolveDisplayedStatisticsSubject({ subjectId, selectedSubject, subjectSwitcher }) {
	if (subjectId !== null) {
		return selectedSubject;
	}

	if (subjectSwitcher.kind !== SUBJECT_SWITCHER_KINDS.UNSELECTED) {
		return null;
	}

	const firstSubject = subjectSwitcher.subjects[0];

	if (firstSubject === undefined) {
		throw new Error("Unselected subject switcher requires at least one subject");
	}

	return firstSubject;
}

function createStatisticsSubjectSelector({ subjectSwitcher, displayedSubject, text }) {
	if (displayedSubject === null) {
		return {
			...subjectSwitcher,
			menuLabel: text.subjectSelectorMenuLabel,
			closeLabel: text.subjectSelectorCloseLabel
		};
	}

	return {
		...subjectSwitcher,
		kind: SUBJECT_SWITCHER_KINDS.READY,
		currentSubject: displayedSubject,
		label: displayedSubject.name,
		menuLabel: text.subjectSelectorMenuLabel,
		closeLabel: text.subjectSelectorCloseLabel
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

		default:
			throw new Error(`Unknown subject switcher kind: ${String(subjectSwitcher.kind)}`);
	}
}
