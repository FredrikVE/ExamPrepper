// src/ui/viewmodel/Utils/createWorkspaceToolsModel.js
export default function createWorkspaceToolsModel(params) {
	if (params.pageToolGroup === null) {
		return null;
	}

	const items = [];

	for (const toolItem of params.pageToolGroup.items) {
		items.push(createWorkspaceActionToolItemModel({ toolItem, t: params.t }));
	}

	for (const topicAreaToolItem of params.topicAreaToolItems) {
		items.push(createTopicAreaToolItemModel({ topicAreaToolItem, activeTopicAreaKey: params.activeTopicAreaKey }));
	}

	return {
		id: params.pageToolGroup.id,
		title: params.t[params.pageToolGroup.titleKey],
		subtitle: params.t[params.pageToolGroup.subtitleKey],
		actionsLabel: params.t[params.pageToolGroup.actionsLabelKey],
		openLabel: params.t.pageToolsOpenLabel,
		closeLabel: params.t.pageToolsCloseLabel,
		mobileHandleLabel: params.t.pageToolsMobileHandleLabel,
		items
	};
}

function createWorkspaceActionToolItemModel(params) {
	const label = params.t[params.toolItem.labelKey];
	const statusLabel = params.toolItem.isDisabled ? params.t.pageToolsUnavailableLabel : "";
	const ariaLabel = statusLabel ? `${label} · ${statusLabel}` : label;

	return {
		id: params.toolItem.id,
		iconKey: params.toolItem.iconKey,
		label,
		statusLabel,
		ariaLabel,
		isDisabled: params.toolItem.isDisabled,
		onSelect: params.toolItem.onSelect
	};
}

function createTopicAreaToolItemModel(params) {
	const isSelected = params.topicAreaToolItem.topicAreaKey === params.activeTopicAreaKey;
	const statusLabel = isSelected ? params.topicAreaToolItem.selectedStatusLabel : "";
	const ariaLabel = statusLabel ? `${params.topicAreaToolItem.label} · ${statusLabel}` : params.topicAreaToolItem.label;

	return {
		id: params.topicAreaToolItem.id,
		topicAreaKey: params.topicAreaToolItem.topicAreaKey,
		iconKey: params.topicAreaToolItem.iconKey,
		label: params.topicAreaToolItem.label,
		statusLabel,
		ariaLabel,
		isSelected,
		isActive: isSelected,
		isDisabled: false,
		onSelect: params.topicAreaToolItem.onSelect
	};
}
