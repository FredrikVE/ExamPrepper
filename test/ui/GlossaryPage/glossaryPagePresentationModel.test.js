// test/ui/GlossaryPage/glossaryPagePresentationModel.test.js
import { describe, expect, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/loadStatus/loadStatus.js";
import {
	createGlossaryPageShellModel,
	createGlossaryPageView
} from "../../../src/ui/viewmodel/GlossaryPage/glossaryPagePresentationModel.js";

const labels = {
	pageTitle: "Begrepsliste",
	pageDescription: "Finn begreper",
	searchPlaceholder: "Søk",
	searchClearLabel: "Tøm",
	searchKeyboardHint: "Bruk piltastene",
	termColumnHeader: "Begrep",
	explanationColumnHeader: "Forklaring",
	loadingTitle: "Laster",
	errorTitle: "Kunne ikke laste"
};

const heading = {
	title: "Nettverk",
	subtitle: "2 begreper",
	iconKey: "network"
};

const topicAreaListItems = [
	{
		id: "glossary-topic-area-option-networking",
		topicAreaKey: "networking",
		label: "Nettverk",
		isActive: true,
		isKeyboardTarget: false
	}
];

const tableRows = [
	{
		glossaryEntryKey: "packet",
		termSegments: [{ text: "Pakke", isMatch: false }],
		explanationSegments: [{ text: "En enhet", isMatch: false }]
	}
];

const baseInput = {
	labels,
	pageStatus: LOAD_STATUS.READY,
	pageErrorMessage: "",
	glossarySearchTerm: "",
	isSearching: false,
	isSearchComboboxActive: false,
	searchActiveDescendantId: null,
	searchSummaryLabel: "",
	topicAreaListItems,
	resolvedActiveTopicAreaKey: "networking",
	glossaryPanelHeading: heading,
	glossaryTableRows: tableRows,
	emptyStateKind: null,
	emptyState: null
};

describe("glossaryPagePresentationModel", () => {
	test("creates a shell model without leaking the back callback into presentation data", () => {
		const onBack = () => {};

		expect(createGlossaryPageShellModel({
			backContract: {
				showBackButton: true,
				backLabel: "Tilbake",
				navigationLabel: "Navigasjon",
				onBack
			}
		})).toEqual({
			showBackButton: true,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon"
		});
	});

	test("creates a complete load-state union", () => {
		expect(createGlossaryPageView({
			...baseInput,
			pageStatus: LOAD_STATUS.ERROR,
			pageErrorMessage: "Prøv igjen."
		})).toEqual({
			kind: "load-state",
			status: LOAD_STATUS.ERROR,
			loadingLabel: "Laster",
			errorTitle: "Kunne ikke laste",
			errorBody: "Prøv igjen."
		});
	});

	test("creates cohesive content models for search, navigation, and table presentation", () => {
		const pageView = createGlossaryPageView(baseInput);

		expect(pageView).toMatchObject({
			kind: "content",
			topicAreaPanel: {
				search: {
					term: "",
					input: { kind: "searchbox" }
				},
				navigation: {
					kind: "topic-tabs",
					activeTopicAreaKey: "networking",
					items: topicAreaListItems
				}
			},
			glossaryPanel: {
				kind: "table",
				heading,
				table: {
					rows: tableRows,
					termColumnHeader: "Begrep",
					explanationColumnHeader: "Forklaring"
				}
			}
		});
	});

	test("keeps no-search-results in the panel while sharing one list id with the combobox", () => {
		const pageView = createGlossaryPageView({
			...baseInput,
			glossarySearchTerm: "ukjent",
			isSearching: true,
			isSearchComboboxActive: true,
			searchActiveDescendantId: topicAreaListItems[0].id,
			emptyStateKind: "no-search-results",
			emptyState: {
				kind: "no-search-results",
				title: "Ingen treff",
				body: "Ingen treff."
			}
		});

		expect(pageView.kind).toBe("content");
		expect(pageView.topicAreaPanel.search.input.kind).toBe("combobox");
		expect(pageView.topicAreaPanel.search.input.controlledListId).toBe(pageView.topicAreaPanel.navigation.listId);
		expect(pageView.glossaryPanel).toMatchObject({
			kind: "empty-state",
			emptyState: { kind: "no-search-results" }
		});
	});
});
