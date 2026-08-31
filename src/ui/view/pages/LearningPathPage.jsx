// src/ui/view/pages/LearningPathPage.jsx
import { ArrowRight } from "lucide-react";
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import LearningContentHeader from "../components/LearningContentHeader/LearningContentHeader.jsx";
import LearningPathRoadmap from "../components/LearningPathPage/LearningPathRoadmap.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";

export default function LearningPathPage({ viewModel }) {
	const header = (
		<Header
			appearance={HEADER_APPEARANCES.DEFAULT}
			layout={HEADER_LAYOUTS.DEFAULT}
			backContract={viewModel.backContract}
			heading={null}
			tools={null}
			trailing={null}
		/>
	);

	return (
		<WorkspaceScaffold
			className="learning-content-workspace learning-path-workspace"
			header={header}
			footer={null}
			overlay={null}
			scrollToTopRequestId={null}
		>
			<div className="learning-path-page">
				<LearningContentHeader {...viewModel.contentHeaderModel} />

				<div className="learning-path-page-content">
					<WorkspaceState state={viewModel.workspaceState}>
						<div className="learning-path-page-state-content">
							<ContinueLearningPanel
								model={viewModel.continuePanelModel}
								onActionPressed={viewModel.onLearningPathAction}
							/>

							{viewModel.startSessionError === null
								? null
								: (
									<p
										className="learning-path-error"
										role="alert"
									>
										{viewModel.startSessionError}
									</p>
								)}

							<LearningPathRoadmap
								model={viewModel.roadmapModel}
								onModuleToggle={viewModel.onModuleToggle}
								onActionPressed={viewModel.onLearningPathAction}
								scrollToModuleId={viewModel.scrollToModuleId}
							/>
						</div>
					</WorkspaceState>
				</div>
			</div>
		</WorkspaceScaffold>
	);
}

function ContinueLearningPanel({ model, onActionPressed }) {
	if (!model.isVisible) {
		return null;
	}

	return (
		<section
			className="learning-path-continue-panel"
			aria-labelledby="learning-path-continue-title"
		>
			<div className="learning-path-continue-panel__copy">
				<h2 id="learning-path-continue-title">{model.title}</h2>
				<p>{model.description}</p>
			</div>

			<button
				type="button"
				className="learning-path-continue-action"
				disabled={model.actionModel.isDisabled}
				onClick={() => onActionPressed(model.actionModel)}
			>
				<span>{model.buttonLabel}</span>
				<ArrowRight aria-hidden="true" />
			</button>
		</section>
	);
}
