// src/ui/viewmodel/GlossaryPage/glossaryInteractionBindings.js
import { GLOSSARY_TABLE_SORT_DIRECTIONS, GLOSSARY_TABLE_SORT_KEYS } from "../../../constants/GlossaryTableSort.js";
import { getInitialGlossaryTableSortDirection } from "./glossaryTableModel.js";
import { GLOSSARY_NETWORK_DISPLAY_KIND } from "./glossaryNetworkModel.js";

export function createGlossaryTableHeaderPresentations({ tableSort, t, onSort }) {
	return [
		createSortableGlossaryTableHeader({ key: GLOSSARY_TABLE_SORT_KEYS.TERM, label: t.glossaryPageTermColumnHeader, tableSort, onSort, t }),
		createSortableGlossaryTableHeader({ key: GLOSSARY_TABLE_SORT_KEYS.EXPLANATION_LENGTH, label: t.glossaryPageExplanationColumnHeader, tableSort, onSort, t }),
		createSortableGlossaryTableHeader({ key: GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT, label: t.glossaryPageConnectionsColumnHeader, tableSort, onSort, t }),
		createSortableGlossaryTableHeader({ key: GLOSSARY_TABLE_SORT_KEYS.MASTERY, label: t.glossaryPageMasteryColumnHeader, tableSort, onSort, t })
	];
}

function createSortableGlossaryTableHeader({ key, label, tableSort, onSort, t }) {
	const isActive = tableSort.key === key;
	const direction = isActive ? tableSort.direction : null;
	const nextDirection = resolveNextGlossaryTableSortDirection({ key, isActive, currentDirection: tableSort.direction });
	const actionLabel = createGlossaryTableSortActionLabel({ key, label, nextDirection, t });

	return {
		key,
		label,
		isActive,
		direction,
		actionLabel,
		onActivate: () => onSort(key)
	};
}

function resolveNextGlossaryTableSortDirection({ key, isActive, currentDirection }) {
	if (!isActive) {
		return getInitialGlossaryTableSortDirection(key);
	}

	if (currentDirection === GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING) {
		return GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING;
	}

	return GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING;
}

function createGlossaryTableSortActionLabel({ key, label, nextDirection, t }) {
	if (key === GLOSSARY_TABLE_SORT_KEYS.EXPLANATION_LENGTH) {
		if (nextDirection === GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING) {
			return t.glossaryPageExplanationSortLongestFirstLabel;
		}

		return t.glossaryPageExplanationSortShortestFirstLabel;
	}

	if (key === GLOSSARY_TABLE_SORT_KEYS.MASTERY) {
		if (nextDirection === GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING) {
			return t.glossaryPageMasterySortStrongestFirstLabel;
		}

		return t.glossaryPageMasterySortWeakestFirstLabel;
	}

	if (nextDirection === GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING) {
		return t.glossaryPageTableSortDescendingLabel(label);
	}

	return t.glossaryPageTableSortAscendingLabel(label);
}

export function bindGlossaryDetailInteractions(params) {
	if (params.presentation === null) {
		return null;
	}

	return {
		...params.presentation,
		isInteractive: true,
		header: {
			...params.presentation.header,
			titleRef: params.titleRef,
			trailBack: params.presentation.header.trailBack === null
				? null
				: {
					...params.presentation.header.trailBack,
					onActivate: params.onNavigateTrailBack
				}
		},
		network: bindGlossaryDetailNetwork(params.presentation.network, params.onExploreConcept),
		relations: bindGlossaryDetailRelations(
			params.presentation.relations,
			params.onExploreConcept,
			params.onToggleRelations
		),
		associations: {
			...params.presentation.associations,
			items: params.presentation.associations.items.map((item) => ({
				...item,
				onActivate: () => params.onExploreConcept(item.glossaryEntryKey)
			}))
		},
		navigation: {
			...params.presentation.navigation,
			previous: {
				...params.presentation.navigation.previous,
				onActivate: params.onNavigatePrevious
			},
			next: {
				...params.presentation.navigation.next,
				onActivate: params.onNavigateNext
			}
		}
	};
}

export function createGlossaryDetailClosingSnapshot(presentation) {
	if (presentation === null) {
		return null;
	}

	return {
		...presentation,
		isInteractive: false
	};
}

function bindGlossaryDetailNetwork(network, onExploreConcept) {
	if (network.display.kind !== GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT) {
		return network;
	}

	return {
		...network,
		display: {
			...network.display,
			model: bindGlossaryNetworkModel(network.display.model, onExploreConcept),
			detailGraph: bindGlossaryNetworkModel(network.display.detailGraph, onExploreConcept)
		}
	};
}

function bindGlossaryDetailRelations(relations, onExploreConcept, onToggleRelations) {
	let display = relations.display;

	if (relations.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT) {
		display = {
			...relations.display,
			items: relations.display.items.map((item) => ({
				...item,
				onActivate: () => {
					onExploreConcept(item.glossaryEntryKey);
				}
			}))
		};
	}

	return {
		...relations,
		display,
		onActivate: onToggleRelations
	};
}


function bindGlossaryNetworkModel(model, onSelectNetworkConcept) {
	return {
		...model,
		nodes: model.nodes.map((node) => ({
			...node,
			onActivate: () => onSelectNetworkConcept(node.glossaryEntryKey)
		}))
	};
}

export function bindGlossaryTableInteractions({ rows, onOpenDetail, resolveDetailTriggerRef }) {
	return rows.map((row) => ({
		...row,
		onActivate: () => onOpenDetail(row.glossaryEntryKey),
		detailTrigger: {
			label: row.detailTriggerLabel,
			ref: resolveDetailTriggerRef(row.glossaryEntryKey),
			onActivate: () => onOpenDetail(row.glossaryEntryKey)
		}
	}));
}

export function bindTopicAreaInteraction(item, onSelectTopicArea) {
	return {
		...item,
		onActivate: () => onSelectTopicArea(item.topicAreaKey)
	};
}
