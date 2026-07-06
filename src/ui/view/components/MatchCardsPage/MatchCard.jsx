import { MATCH_SLOT_STATUS } from "../../../viewmodel/MatchCardsPage/matchCardsSessionModel.js";

export default function MatchCard({ slot, labels, isInteractionLocked, onSelectSlot }) {
	const isEmpty = slot.status === MATCH_SLOT_STATUS.EMPTY;
	const className = createMatchCardClassName(slot.status);
	const statusLabel = createStatusLabel(slot.status, labels);
	const ariaLabel = labels.cardAriaLabel(slot.text ?? labels.emptySlotLabel, statusLabel);

	const selectSlot = () => {
		onSelectSlot(slot.slotId);
	};

	return (
		<button
			type="button"
			className={className}
			disabled={isEmpty || isInteractionLocked}
			aria-pressed={slot.status === MATCH_SLOT_STATUS.SELECTED ? "true" : undefined}
			aria-label={ariaLabel}
			onClick={selectSlot}
		>
			<span className="matchcard-text">{slot.text}</span>
			{statusLabel && <span className="matchcard-status">{statusLabel}</span>}
		</button>
	);
}

function createMatchCardClassName(status) {
	return [
		"matchcard",
		`matchcard--${status.toLowerCase().replaceAll("_", "-")}`
	].join(" ");
}

function createStatusLabel(status, labels) {
	if (status === MATCH_SLOT_STATUS.SELECTED) {
		return labels.selectedSlotLabel;
	}

	if (status === MATCH_SLOT_STATUS.WRONG) {
		return labels.wrongSlotLabel;
	}

	if (status === MATCH_SLOT_STATUS.SUCCESS) {
		return labels.successSlotLabel;
	}

	return "";
}
