// src/ui/view/pages/LearningSessionPage.jsx
import { useEffect, useRef } from "react";
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import LearningSessionHeader from "../components/LearningSessionPage/LearningSessionHeader.jsx";
import MatchCardsGrid from "../components/MatchCards/MatchCardsGrid.jsx";
import LearningSessionStage from "../components/LearningSessionPage/LearningSessionStage.jsx";
import SessionActionPanel from "../components/LearningSessionPage/SessionActionPanel.jsx";
import SessionResultPanel from "../components/LearningSessionPage/SessionResultPanel.jsx";
import SessionRewardCard from "../components/LearningSessionPage/SessionRewardCard.jsx";
import QuestionCard from "../components/QuestionCard/QuestionCard.jsx";
import ProgressBar from "../components/Shared/ProgressBar/ProgressBar.jsx";
import { PROGRESS_BAR_VARIANTS } from "../components/Shared/ProgressBar/progressBarVariants.js";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";

export default function LearningSessionPage({ viewModel }) {
	const questionFocusRef = useRef(null);

	useEffect(() => {
		if (viewModel.currentQuestionRenderKey === null) {
			return;
		}

		if (questionFocusRef.current === null) {
			return;
		}

		questionFocusRef.current.focus();
	}, [viewModel.currentQuestionRenderKey]);

	let heading = null;

	if (viewModel.progressBarModel !== null) {
		heading = (
			<ProgressBar
				variant={PROGRESS_BAR_VARIANTS.HEADER}
				model={viewModel.progressBarModel}
			/>
		);
	}

	const header = (
		<Header
			appearance={HEADER_APPEARANCES.DEFAULT}
			layout={HEADER_LAYOUTS.FULL_PROGRESS}
			backContract={viewModel.backContract}
			heading={heading}
			tools={null}
			trailing={null}
		/>
	);

	let overlay = null;

	if (viewModel.rewardModel !== null) {
		overlay = (
			<SessionRewardCard {...viewModel.rewardModel} />
		);
	}

	return (
		<WorkspaceScaffold
			className="exam-workspace learning-session-workspace"
			header={header}
			footer={null}
			overlay={overlay}
			scrollToTopRequestId={viewModel.currentQuestionRenderKey}
		>
			<WorkspaceState state={viewModel.workspaceState}>
				<div className="learning-session-content">
					<LearningSessionHeader model={viewModel.headerModel} />

					{viewModel.matchCardsModel !== null && (
						<div className="learning-session-matchcards">
							<MatchCardsGrid {...viewModel.matchCardsModel} />
						</div>
					)}

					{viewModel.questionCardModel !== null && (
						<LearningSessionStage
							focusRef={questionFocusRef}
							focusLabel={viewModel.questionFocusLabel}
						>
							<QuestionCard
								key={viewModel.currentQuestionRenderKey}
								{...viewModel.questionCardModel}
							/>
						</LearningSessionStage>
					)}

					{viewModel.actionPanelModel !== null && (
						<SessionActionPanel {...viewModel.actionPanelModel} />
					)}

					{viewModel.sessionResultModel !== null && (
						<SessionResultPanel {...viewModel.sessionResultModel} />
					)}
				</div>
			</WorkspaceState>
		</WorkspaceScaffold>
	);
}
