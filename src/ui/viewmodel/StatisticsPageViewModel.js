// src/ui/viewmodel/StatisticsPageViewModel.js
import createStatisticsTextModel from "./StatisticsPage/createStatisticsTextModel.js";
import useStatisticsOverviewModel from "./StatisticsPage/Overview/useStatisticsOverviewModel.js";

export default function useStatisticsPageViewModel(props) {
	const text = createStatisticsTextModel(props.t);
	const overview = useStatisticsOverviewModel({
		getSubjectStatisticsUseCase: props.getSubjectStatisticsUseCase,
		subjectId: props.subjectId,
		formatDate: props.formatDate,
		language: props.language,
		text,
		authState: props.authState,
		onStartNewExam: props.onStartNewExam
	});

	const subjectSelector = {
		...props.subjectSwitcher,
		menuLabel: text.subjectSelectorMenuLabel,
		closeLabel: text.subjectSelectorCloseLabel
	};

	return {
		workspaceState: overview.workspaceState,
		overview: overview.presentation,
		overviewActions: overview.actions,
		subjectId: props.subjectId,
		selectedSubject: props.selectedSubject,
		subjectSwitcher: props.subjectSwitcher,
		subjectSelector,
		onSelectSubject: props.onSelectSubject,
		backContract: props.backContract,
		pageTitle: text.pageTitle,
		pageSubtitle: text.pageSubtitle
	};
}
