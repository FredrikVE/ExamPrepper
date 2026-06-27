// src/ui/viewmodel/PageTools/createPageToolsViewModel.js
import { PAGE_TOOL_AVAILABILITY } from "../../../navigation/pageTools.js";

export default function createPageToolsViewModel(params) {
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
        items: params.pageToolGroup.items.map((toolItem) => createPageToolItemViewModel({ toolItem, t: params.t, actionHandlers: params.actionHandlers, disabledLabelsByActionId: params.disabledLabelsByActionId }))
    };
}

function createPageToolItemViewModel(params) {
    const label = params.t[params.toolItem.labelKey];
    const actionHandler = params.actionHandlers[params.toolItem.actionId];
    const disabledReason = params.disabledLabelsByActionId[params.toolItem.actionId];
    const isStaticallyUnavailable = params.toolItem.availability === PAGE_TOOL_AVAILABILITY.UNAVAILABLE;
    const isDisabled = isStaticallyUnavailable || Boolean(disabledReason) || typeof actionHandler !== "function";
    const statusLabel = resolveStatusLabel({ isStaticallyUnavailable, disabledReason, isDisabled, t: params.t });
    const ariaLabel = statusLabel ? `${label} · ${statusLabel}` : label;

    return {
        id: params.toolItem.id,
        actionId: params.toolItem.actionId,
        iconKey: params.toolItem.iconKey,
        label,
        statusLabel,
        ariaLabel,
        isDisabled,
        onSelect: isDisabled ? null : actionHandler
    };
}

function resolveStatusLabel(params) {
    if (params.disabledReason) {
        return params.disabledReason;
    }

    if (params.isStaticallyUnavailable) {
        return params.t.pageToolsUnavailableLabel;
    }

    if (params.isDisabled) {
        return params.t.pageToolsUnavailableLabel;
    }

    return "";
}
