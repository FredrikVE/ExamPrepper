//src/ui/view/pages/LearningSessionPage.jsx
import { useEffect, useRef } from "react";
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import ProgressBar from "../components/Shared/ProgressBar/ProgressBar.jsx";
import { PROGRESS_BAR_VARIANTS } from "../components/Shared/ProgressBar/progressBarVariants.js";
import QuestionCard from "../components/QuestionCard/QuestionCard.jsx";
import SessionActionPanel from "../components/LearningSessionPage/SessionActionPanel.jsx";
import SessionResultPanel from "../components/LearningSessionPage/SessionResultPanel.jsx";
import SessionRewardCard from "../components/LearningSessionPage/SessionRewardCard.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";

export default function LearningSessionPage({ viewModel }) {
	const questionFocusRef = useRef(null);

	useEffect(() => {
		if (viewModel.currentQuestionRenderKey !== null) {
			questionFocusRef.current?.focus();
		}
	}, [viewModel.currentQuestionRenderKey]);

	const heading = viewModel.progressBarModel === null ? null : <ProgressBar variant={PROGRESS_BAR_VARIANTS.HEADER} model={viewModel.progressBarModel} />;
	const header = <Header appearance={HEADER_APPEARANCES.DEFAULT} layout={HEADER_LAYOUTS.EXAM_PROGRESS} backContract={viewModel.backContract} heading={heading} tools={null} trailing={null} />;
	const overlay = viewModel.rewardModel === null ? null : <SessionRewardCard {...viewModel.rewardModel} />;

	return (
		<WorkspaceScaffold className="exam-workspace learning-session-workspace" header={header} footer={null} overlay={overlay} scrollToTopRequestId={viewModel.scrollToTopRequestId}>
			<WorkspaceState state={viewModel.workspaceState}>
				<div className="learning-session-content">
					<div ref={questionFocusRef} tabIndex={-1} aria-label={viewModel.questionFocusLabel}>{viewModel.questionCardModel !== null && <QuestionCard key={viewModel.currentQuestionRenderKey} {...viewModel.questionCardModel} />}</div>
					{viewModel.actionPanelModel !== null && <SessionActionPanel {...viewModel.actionPanelModel} />}
					{viewModel.sessionResultModel !== null && <SessionResultPanel {...viewModel.sessionResultModel} />}
				</div>
			</WorkspaceState>
		</WorkspaceScaffold>
	);
}
