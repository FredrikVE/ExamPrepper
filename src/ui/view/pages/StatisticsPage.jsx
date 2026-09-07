// src/ui/view/pages/StatisticsPage.jsx
import Header from "../components/Header/Header.jsx";
import HeaderTitle from "../components/Header/HeaderTitle.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import StatisticsOverview from "../components/StatisticsPage/Overview/StatisticsOverview.jsx";
import StatisticsSubjectSelector from "../components/StatisticsPage/StatisticsSubjectSelector.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";

export default function StatisticsPage({ viewModel }) {
	const header = (
		<Header
			appearance={HEADER_APPEARANCES.DEFAULT}
			layout={HEADER_LAYOUTS.PAGE_TITLE}
			backContract={viewModel.backContract}
			heading={<HeaderTitle title={viewModel.pageTitle} subtitle={viewModel.pageSubtitle} />}
			tools={null}
			trailing={null}
		/>
	);

	return (
		<WorkspaceScaffold className="statistics-page-workspace" header={header} footer={null} overlay={null} scrollToTopRequestId={null}>
			<div className="statistics-page-content">
				<StatisticsSubjectSelector model={viewModel.subjectSelector} onSelectSubject={viewModel.onSelectSubject} />
				<WorkspaceState state={viewModel.workspaceState}>
					<StatisticsOverview model={viewModel.overview} actions={viewModel.overviewActions} />
				</WorkspaceState>
			</div>
		</WorkspaceScaffold>
	);
}
