// src/ui/view/pages/GlossaryPage.jsx
import { PRESENTATION_MODE } from "../../presentation/presentationMode.js";
import GlossaryDetailModal from "../components/GlossaryPage/DetailModal/GlossaryDetailModal.jsx";
import GlossaryFooter from "../components/GlossaryPage/GlossaryFooter/GlossaryFooter.jsx";
import GlossaryPanel from "../components/GlossaryPage/GlossaryPanel/GlossaryPanel.jsx";
import TopicAreaPanel from "../components/GlossaryPage/TopicAreaPanel/TopicAreaPanel.jsx";
import Header from "../components/Header/Header.jsx";
import { HEADER_APPEARANCES, HEADER_LAYOUTS } from "../components/Header/headerVariants.js";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import LearningContentHeader from "../components/LearningContentHeader/LearningContentHeader.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import SearchBackdrop from "../components/Search/SearchBackdrop.jsx";
import useSearchSheetEscapeKey from "../components/Search/useSearchSheetEscapeKey.js";

export default function GlossaryPage({ viewModel }) {
	useSearchSheetEscapeKey(viewModel.search.isPopupOpen, viewModel.search.onRequestClose);

	const isMobile = viewModel.presentationMode === PRESENTATION_MODE.MOBILE;

	const header = (
		<Header
			appearance={HEADER_APPEARANCES.TRANSPARENT}
			layout={HEADER_LAYOUTS.DEFAULT}
			backContract={viewModel.backContract}
			heading={null}
			tools={null}
			trailing={null}
		/>
	);

	const footer = viewModel.shouldShowWorkspaceFooter ? (
		<GlossaryFooter
			usesCompactShell={viewModel.usesCompactShell}
			search={viewModel.search}
			mobileSearchKeyboardHint={viewModel.mobileChapterSheetSearchKeyboardHint}
			allTopicAreaListItem={viewModel.allTopicAreaListItem}
			topicAreaListItems={viewModel.topicAreaListItems}
			topicAreaListAriaLabel={viewModel.pageTitle}
			sheetTitle={viewModel.mobileChapterSheetTitle}
			sheetSubtitle={viewModel.mobileChapterSheetSubtitle}
			sheetOpenLabel={viewModel.mobileChapterSheetOpenLabel}
			sheetCloseLabel={viewModel.mobileChapterSheetCloseLabel}
			isMobileChapterSheetOpen={viewModel.isMobileChapterSheetOpen}
			onMobileChapterSheetOpenChange={viewModel.changeMobileChapterSheetOpen}
		/>
	) : null;

	const overlay = (
		<SearchBackdrop
			isOpen={viewModel.search.isPopupOpen}
			closeLabel={viewModel.search.closeLabel}
			onClose={viewModel.search.onRequestClose}
		/>
	);

	return (
		<>
			<WorkspaceScaffold
				className="learning-content-workspace glossary-workspace"
				header={header}
				footer={footer}
				overlay={overlay}
				scrollToTopRequestId={null}
			>
				<section className="glossary-page" aria-labelledby="glossary-page-title">
					<LearningContentHeader
						title={viewModel.pageTitle}
						subtitle={viewModel.pageSubtitle}
						titleId="glossary-page-title"
						entries={viewModel.contentToggleEntries}
						activeEntryId={viewModel.activeContentType}
						mobileActiveEntryId={viewModel.mobileActiveEntryId}
						onSelectEntry={viewModel.selectContentType}
						ariaLabel={viewModel.contentToggleAriaLabel}
						mobileToggleButtonItems={viewModel.mobileToggleButtonItems}
						expandedMobileToggleButtonGroupId={viewModel.expandedMobileToggleButtonGroupId}
						onOpenMobileToggleButtonGroup={viewModel.openMobileToggleButtonGroup}
						onCloseMobileToggleButtonGroup={viewModel.closeMobileToggleButtonGroup}
						contentToggleBackLabel={viewModel.contentToggleBackLabel}
					/>

					<div className="glossary-page__content">
						<WorkspaceState state={viewModel.workspaceState}>
							<>
								{!viewModel.usesCompactShell && (
									<TopicAreaPanel
										allTopicAreaListItem={viewModel.allTopicAreaListItem}
										topicAreaListItems={viewModel.topicAreaListItems}
										topicAreaListAriaLabel={viewModel.pageTitle}
									/>
								)}

								<GlossaryPanel
									heading={viewModel.glossaryPanelHeading}
									rows={viewModel.glossaryTableRows}
									tableHeaders={viewModel.glossaryTableHeaders}
									termColumnHeader={viewModel.termColumnHeader}
									explanationColumnHeader={viewModel.explanationColumnHeader}
									directNeighborColumnHeader={viewModel.directNeighborColumnHeader}
									detailPresentation={viewModel.glossaryMobileDetailPresentation}
									emptyState={viewModel.glossaryPanelEmptyState}
									isMobile={isMobile}
								/>
							</>
						</WorkspaceState>
					</div>
				</section>
			</WorkspaceScaffold>

			<GlossaryDetailModal model={viewModel.glossaryDetailModal} />
		</>
	);
}
