//src/ui/view/pages/LearningPathPage.jsx
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import LearningContentHeader from "../components/LearningContentHeader/LearningContentHeader.jsx";
import ContinueLearningPanel from "../components/LearningPathPage/ContinueLearningPanel.jsx";
import LearningPathRoadmap from "../components/LearningPathPage/LearningPathRoadmap.jsx";
import useLearningPathScrollAdapter from "../components/LearningPathPage/useLearningPathScrollAdapter.js";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";

export default function LearningPathPage({ viewModel }) {
	const scrollAdapter = useLearningPathScrollAdapter({ scrollRequest: viewModel.scrollRequest });
	const header = <Header appearance={HEADER_APPEARANCES.DEFAULT} layout={HEADER_LAYOUTS.DEFAULT} backContract={viewModel.backContract} heading={null} tools={null} trailing={null} />;

	return (
		<WorkspaceScaffold className="learning-content-workspace learning-path-workspace" header={header} footer={null} overlay={null} scrollToTopRequestId={null}>
			<WorkspaceState state={viewModel.workspaceState}>
				<div className="learning-path-page-content">
					<LearningContentHeader {...viewModel.contentHeaderModel} />
					<ContinueLearningPanel model={viewModel.continuePanelModel} onPressed={viewModel.onContinue} />
					{viewModel.startSessionError === null ? null : <p className="learning-path-error" role="alert">{viewModel.startSessionError}</p>}
					<LearningPathRoadmap model={viewModel.roadmapModel} onModuleToggle={viewModel.onModuleToggle} onStartModule={viewModel.onStartModule} registerModuleElement={scrollAdapter.registerModuleElement} />
				</div>
			</WorkspaceState>
		</WorkspaceScaffold>
	);
}
