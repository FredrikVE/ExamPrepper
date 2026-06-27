// src/ui/viewmodel/Utils/createWorkspaceToolsModel.js
import { PAGE_TOOL_AVAILABILITY } from "../../../navigation/pageTools.js";

export default function createWorkspaceToolsModel(params) {
	if (!params.pageToolGroup) {
		return null;
	}

	return {
		id: params.pageToolGroup.id,
		title: params.t[params.pageToolGroup.titleKey],
		subtitle: params.t[params.pageToolGroup.subtitleKey],
		actionsLabel: params.t[params.pageToolGroup.actionsLabelKey],
		openLabel: params.t.pageToolsOpenLabel,
		closeLabel: params.t.pageToolsCloseLabel,
		mobileHandleLabel: params.t.pageToolsMobileHandleLabel,
		items: [
			...params.navToolItems.map((navItem) => createNavToolItemModel({ navItem, t: params.t, hasSelectedSubject: params.hasSelectedSubject, onChangeScreen: params.onChangeScreen })),
			...params.workspaceActionToolItems.map((toolItem) => createWorkspaceActionToolItemModel({ toolItem, t: params.t }))
		]
	};
}

function createNavToolItemModel(params) {
	const label = params.t[params.navItem.labelKey] ?? params.navItem.fallbackLabel;
	const disabledReason = params.navItem.requiresSubject && !params.hasSelectedSubject ? params.t.pageToolsSelectSubjectFirstLabel : "";
	const isDisabled = Boolean(disabledReason) || typeof params.onChangeScreen !== "function";
	const statusLabel = isDisabled ? disabledReason : "";
	const ariaLabel = statusLabel ? `${label} · ${statusLabel}` : label;

	return {
		id: params.navItem.id,
		screen: params.navItem.screen,
		iconKey: params.navItem.iconKey,
		label,
		statusLabel,
		ariaLabel,
		isDisabled,
		onSelect: isDisabled ? null : () => params.onChangeScreen(params.navItem.screen)
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
