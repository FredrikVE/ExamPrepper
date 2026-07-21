// src/ui/viewmodel/GlossaryPage/glossaryPagePresentationModel.js
import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import { GLOSSARY_TOPIC_AREA_LIST_ID } from "./glossaryTopicAreaListModel.js";

export function createGlossaryPageShellModel({ backContract }) {
	return {
		showBackButton: backContract.showBackButton,
		backLabel: backContract.backLabel,
		navigationLabel: backContract.navigationLabel
	};
}

export function createGlossaryPageView({
	labels,
	pageStatus,
	pageErrorMessage,
	glossarySearchTerm,
	isSearching,
	isSearchComboboxActive,
	searchActiveDescendantId,
	searchSummaryLabel,
	topicAreaListItems,
	resolvedActiveTopicAreaKey,
	glossaryPanelHeading,
	glossaryTableRows,
	emptyStateKind,
	emptyState
}) {
	if (isBlockingLoadStatus(pageStatus)) {
		return {
			kind: "load-state",
			status: pageStatus,
			loadingLabel: labels.loadingTitle,
			errorTitle: labels.errorTitle,
			errorBody: pageErrorMessage
		};
	}

	if (emptyStateKind === "no-topic-areas" || emptyStateKind === "no-glossary-entries") {
		return {
			kind: "empty-state",
			emptyState
		};
	}

	return {
		kind: "content",
		heading: {
			title: labels.pageTitle,
			description: labels.pageDescription
		},
		topicAreaPanel: createTopicAreaPanelModel({
			labels,
			glossarySearchTerm,
			isSearching,
			isSearchComboboxActive,
			searchActiveDescendantId,
			searchSummaryLabel,
			topicAreaListItems,
			resolvedActiveTopicAreaKey
		}),
		glossaryPanel: createGlossaryPanelModel({
			labels,
			glossaryPanelHeading,
			glossaryTableRows,
			emptyStateKind,
			emptyState
		})
	};
}

const createTopicAreaPanelModel = ({
	labels,
	glossarySearchTerm,
	isSearching,
	isSearchComboboxActive,
	searchActiveDescendantId,
	searchSummaryLabel,
	topicAreaListItems,
	resolvedActiveTopicAreaKey
}) => {
	return {
		search: {
			term: glossarySearchTerm,
			placeholder: labels.searchPlaceholder,
			clearLabel: labels.searchClearLabel,
			keyboardHint: labels.searchKeyboardHint,
			summaryLabel: searchSummaryLabel,
			isSearching,
			input: isSearching
				? {
					kind: "combobox",
					isExpanded: isSearchComboboxActive,
					controlledListId: GLOSSARY_TOPIC_AREA_LIST_ID,
					activeDescendantId: searchActiveDescendantId
				}
				: { kind: "searchbox" }
		},
		navigation: isSearching
			? {
				kind: "search-results",
				listId: GLOSSARY_TOPIC_AREA_LIST_ID,
				ariaLabel: labels.pageTitle,
				items: topicAreaListItems
			}
			: {
				kind: "topic-tabs",
				ariaLabel: labels.pageTitle,
				items: topicAreaListItems,
				activeTopicAreaKey: resolvedActiveTopicAreaKey
			}
	};
};

const createGlossaryPanelModel = ({ labels, glossaryPanelHeading, glossaryTableRows, emptyStateKind, emptyState }) => {
	if (emptyStateKind === "no-search-results") {
		return {
			kind: "empty-state",
			emptyState
		};
	}

	return {
		kind: "table",
		heading: glossaryPanelHeading,
		table: {
			rows: glossaryTableRows,
			termColumnHeader: labels.termColumnHeader,
			explanationColumnHeader: labels.explanationColumnHeader
		}
	};
};
