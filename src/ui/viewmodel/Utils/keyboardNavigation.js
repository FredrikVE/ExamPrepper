// src/ui/viewmodel/Utils/keyboardNavigation.js
const FOOTER_NAVIGATION_KEYS = ["Enter", "ArrowLeft", "ArrowRight"];

export default function shouldHandleFooterNavigationKeyDown(event) {
	if (!FOOTER_NAVIGATION_KEYS.includes(event.key)) {
		return false;
	}

	if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.isComposing) {
		return false;
	}

	if (event.key === "Enter") {
		return !isEnterKeyHandledByFocusedElement(event.target);
	}

	return !isArrowKeyHandledByFocusedElement(event.target);
}

const isEnterKeyHandledByFocusedElement = (target) => {
	if (typeof Element === "undefined" || !(target instanceof Element)) {
		return false;
	}

	if (target.closest("button, a, select, textarea, [role='button'], [contenteditable='true']")) {
		return true;
	}

	const input = target.closest("input");

	if (!input) {
		return false;
	}

	return [
		"button",
		"submit",
		"reset",
		"file",
		"range",
		"color",
		"date",
		"datetime-local",
		"month",
		"time",
		"week"
	].includes(input.type);
};

const isArrowKeyHandledByFocusedElement = (target) => {
	if (typeof Element === "undefined" || !(target instanceof Element)) {
		return false;
	}

	return Boolean(
		target.closest(
			"input, select, textarea, [contenteditable='true'], [role='textbox'], [role='combobox'], [role='listbox'], [role='slider'], [role='spinbutton']"
		)
	);
};
