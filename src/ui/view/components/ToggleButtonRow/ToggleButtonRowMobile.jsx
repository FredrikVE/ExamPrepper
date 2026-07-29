// src/ui/view/components/ToggleButtonRow/ToggleButtonRowMobile.jsx
import { ChevronLeft } from "lucide-react";
import useToggleButtonRowMobile from "./useToggleButtonRowMobile.js";

export default function ToggleButtonRowMobile(props) {
	const interaction = useToggleButtonRowMobile({
		items: props.items,
		activeEntryId: props.activeEntryId,
		expandedGroupId: props.expandedGroupId,
		onOpenGroup: props.onOpenGroup,
		onCloseGroup: props.onCloseGroup,
		onSelectEntry: props.onSelectEntry
	});
	const buttons = [];

	if (interaction.expandedItem === null) {
		for (const item of props.items) {
			buttons.push(
				<button
					key={item.id}
					ref={interaction.resolveItemButtonRef(item.id)}
					type="button"
					className="toggle-button-row-mobile__button"
					data-active={item.isActive ? "true" : "false"}
					aria-current={item.isActive ? "true" : undefined}
					disabled={item.isDisabled}
					onClick={() => interaction.selectItem(item)}
				>
					{item.label}
				</button>
			);
		}
	} else {
		buttons.push(
			<button
				key="back"
				ref={interaction.backButtonRef}
				type="button"
				className="toggle-button-row-mobile__back"
				aria-label={props.backLabel}
				title={props.backLabel}
				onClick={interaction.collapseGroup}
			>
				<ChevronLeft aria-hidden="true" />
			</button>
		);

		for (const entry of interaction.expandedItem.entries) {
			const isActive = entry.id === interaction.expandedActiveEntryId;

			buttons.push(
				<button
					key={entry.id}
					type="button"
					className="toggle-button-row-mobile__button"
					data-active={isActive ? "true" : "false"}
					aria-current={isActive ? "true" : undefined}
					disabled={entry.isDisabled}
					onClick={() => interaction.selectEntry(entry)}
				>
					{entry.label}
				</button>
			);
		}
	}

	return (
		<div
			className="toggle-button-row-mobile"
			role="group"
			aria-label={props.ariaLabel}
			data-expanded={interaction.expandedItem === null ? "false" : "true"}
		>
			{buttons}
		</div>
	);
}
