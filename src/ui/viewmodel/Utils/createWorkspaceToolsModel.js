// src/ui/viewmodel/Utils/createWorkspaceToolsModel.js
import { PAGE_TOOL_AVAILABILITY } from "../../../navigation/pageTools.js";

export default function createWorkspaceToolsModel(params) {
	if (!params.pageToolGroup) {
		return null;
	}

	const items = [];
	const workspaceActionToolItems = params.workspaceActionToolItems ?? [];
	const topicAreaToolItems = params.topicAreaToolItems ?? [];

	for (const toolItem of workspaceActionToolItems) {
		items.push(createWorkspaceActionToolItemModel({ toolItem, t: params.t }));
	}

	for (const topicAreaToolItem of topicAreaToolItems) {
		items.push(createTopicAreaToolItemModel({ topicAreaToolItem, activeTopicAreaKey: params.activeTopicAreaKey }));
	}

	return {
		id: params.pageToolGroup.id,
		title: params.pageToolGroup.titleKey ? params.t[params.pageToolGroup.titleKey] : "",
		subtitle: params.pageToolGroup.subtitleKey ? params.t[params.pageToolGroup.subtitleKey] : "",
		actionsLabel: params.t[params.pageToolGroup.actionsLabelKey],
		openLabel: params.t.pageToolsOpenLabel,
		closeLabel: params.t.pageToolsCloseLabel,
		mobileHandleLabel: params.t.pageToolsMobileHandleLabel,
		items
	};
}

function createWorkspaceActionToolItemModel(params) {
	const label = params.t[params.toolItem.labelKey];
	const isDisabled = params.toolItem.availability === PAGE_TOOL_AVAILABILITY.UNAVAILABLE;
	const statusLabel = isDisabled ? params.t.pageToolsUnavailableLabel : "";
	const ariaLabel = statusLabel ? `${label} · ${statusLabel}` : label;

	return {
		id: params.toolItem.id,
		actionId: params.toolItem.actionId,
		iconKey: params.toolItem.iconKey,
		label,
		statusLabel,
		ariaLabel,
		isDisabled,
		onSelect: null
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
