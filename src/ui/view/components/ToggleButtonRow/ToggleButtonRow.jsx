// src/ui/view/components/ToggleButtonRow/ToggleButtonRow.jsx
export default function ToggleButtonRow({
	entries, activeEntryId, onSelectEntry, ariaLabel, className, containerId,
	semanticMode = "tabs", renderEntry
}) {
	const buttons = [];
	const containerRole = resolveContainerRole(semanticMode);
	const buttonRole = resolveButtonRole(semanticMode);

	for (const entry of entries) {
		const isActive = entry.id === activeEntryId;

		buttons.push(
			<button
				key={entry.id}
				id={entry.elementId}
				type="button"
				className="toggle-button-row-button"
				role={buttonRole}
				aria-selected={resolveAriaSelected({ semanticMode, entry, isActive })}
				aria-current={semanticMode === "navigation" && isActive ? "true" : undefined}
				data-active={isActive ? "true" : "false"}
				data-keyboard-target={entry.isKeyboardTarget ? "true" : "false"}
				disabled={entry.isDisabled}
				onClick={() => onSelectEntry(entry.id)}
			>
				{renderEntry ? renderEntry(entry) : entry.label}
			</button>
		);
	}

	return (
		<div
			id={containerId}
			className={["toggle-button-row", className].filter(Boolean).join(" ")}
			role={containerRole}
			aria-label={ariaLabel}
		>
			{buttons}
		</div>
	);
}

const resolveContainerRole = (semanticMode) => {
	if (semanticMode === "navigation") {
		return undefined;
	}

	return semanticMode === "listbox" ? "listbox" : "tablist";
};

const resolveButtonRole = (semanticMode) => {
	if (semanticMode === "navigation") {
		return undefined;
	}

	return semanticMode === "listbox" ? "option" : "tab";
};

const resolveAriaSelected = ({ semanticMode, entry, isActive }) => {
	if (semanticMode === "listbox") {
		return Boolean(entry.isKeyboardTarget);
	}

	return semanticMode === "tabs" ? isActive : undefined;
};
