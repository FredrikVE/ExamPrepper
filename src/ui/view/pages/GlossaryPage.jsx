// src/ui/view/pages/GlossaryPage.jsx
import GlossaryPanel from "../components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx";
import TopicAreaPanel from "../components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx";
import Header from "../components/Header/Header.jsx";
import WorkSpaceScaffold from "../components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx";
import WorkspaceMessage from "../components/WorkspaceState/WorkspaceMessage.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";

export default function GlossaryPage({ viewModel }) {
	const pageContent = renderPageView(viewModel.pageView, viewModel.actions.topicAreaPanel);

	return (
		<GlossaryPageShell model={viewModel.shellModel} actions={viewModel.actions.shell}>
			{pageContent}
		</GlossaryPageShell>
	);
}

const renderPageView = (pageView, topicAreaPanelActions) => {
	if (pageView.kind === "load-state") {
		return (
			<WorkspaceState
				status={pageView.status}
				loadingLabel={pageView.loadingLabel}
				errorTitle={pageView.errorTitle}
				errorBody={pageView.errorBody}
				errorAction={null}
			/>
		);
	}

	if (pageView.kind === "empty-state") {
		return (
			<WorkspaceMessage
				title={pageView.emptyState.title}
				body={pageView.emptyState.body}
				action={null}
			/>
		);
	}

	return (
		<section className="glossary-page" aria-labelledby="glossary-page-title">
			<header className="glossary-page__heading">
				<h1 id="glossary-page-title">{pageView.heading.title}</h1>
				<p>{pageView.heading.description}</p>
			</header>

			<div className="glossary-page__content">
				<TopicAreaPanel model={pageView.topicAreaPanel} actions={topicAreaPanelActions} />
				<GlossaryPanel model={pageView.glossaryPanel} />
			</div>
		</section>
	);
};

const GlossaryPageShell = ({ model, actions, children }) => {
	const header = (
		<Header
			showBackButton={model.showBackButton}
			backLabel={model.backLabel}
			navigationLabel={model.navigationLabel}
			onBack={actions.onBack}
			progressBarModel={null}
			tools={null}
		/>
	);

	return (
		<WorkSpaceScaffold className="glossary-workspace" header={header} scrollToTopRequestId={0}>
			{children}
		</WorkSpaceScaffold>
	);
};
