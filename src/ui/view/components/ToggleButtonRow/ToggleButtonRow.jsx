// src/ui/view/components/ToggleButtonRow/ToggleButtonRow.jsx
export default function ToggleButtonRow({ entries, activeEntryId, onSelectEntry, ariaLabel }) {
	const buttons = [];

	for (const entry of entries) {
		const isActive = entry.id === activeEntryId;

		buttons.push(
			<button
				key={entry.id}
				type="button"
				className="toggle-button-row-button"
				role="tab"
				aria-selected={isActive}
				data-active={isActive ? "true" : "false"}
				disabled={entry.isDisabled}
				onClick={() => onSelectEntry(entry.id)}
			>
				{entry.label}
			</button>
		);
	}

	return (
		<div className="toggle-button-row" role="tablist" aria-label={ariaLabel}>
			{buttons}
		</div>
	);
}
