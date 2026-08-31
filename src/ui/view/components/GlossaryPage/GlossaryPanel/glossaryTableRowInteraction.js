// src/ui/view/components/GlossaryPage/GlossaryPanel/glossaryTableRowInteraction.js
const INTERACTIVE_GLOSSARY_ROW_TARGET_SELECTOR = "button, a, input, select, textarea, [role=\"button\"]";

export function isInteractiveGlossaryTableRowTarget(target) {
	if (target === null || typeof target.closest !== "function") {
		return false;
	}

	return target.closest(INTERACTIVE_GLOSSARY_ROW_TARGET_SELECTOR) !== null;
}
