// src/ui/view/KeyboardNavigation/isEditableTarget.js
export default function isEditableTarget(target) {
	if (typeof Element === "undefined" || !(target instanceof Element)) {
		return false;
	}

	return Boolean(
		target.closest(
			"input, select, textarea, [contenteditable='true'], [role='textbox'], [role='combobox'], [role='listbox'], [role='slider'], [role='spinbutton']"
		)
	);
}
