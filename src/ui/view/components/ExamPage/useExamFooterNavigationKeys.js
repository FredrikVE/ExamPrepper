// src/ui/view/components/ExamPage/useExamFooterNavigationKeys.js
import useKeyboardShortcuts, { isShortcutEvent } from "../../KeyboardNavigation/useKeyboardShortcuts.js";
import isEditableTarget from "../../KeyboardNavigation/isEditableTarget.js";

const FOOTER_NAVIGATION_KEYS = ["Enter", "ArrowLeft", "ArrowRight"];

export default function useExamFooterNavigationKeys({
	isEnabled,
	canGoPrevious,
	canGoNext,
	submitted,
	onNavigatePrevious,
	onNavigateNext
}) {
	function navigateOnArrowKey(event) {
		if (!shouldHandleFooterNavigationKeyDown(event)) {
			return;
		}

		if (event.key === "ArrowLeft" && canGoPrevious) {
			event.preventDefault();
			onNavigatePrevious();
			return;
		}

		if (event.key === "ArrowRight" && canGoNext) {
			event.preventDefault();
			onNavigateNext();
			return;
		}

		if (event.key === "Enter" && !submitted && canGoNext) {
			event.preventDefault();
			onNavigateNext();
		}
	}

	useKeyboardShortcuts({
		isEnabled,
		onKeyDown: navigateOnArrowKey
	});
}

function shouldHandleFooterNavigationKeyDown(event) {
	if (!FOOTER_NAVIGATION_KEYS.includes(event.key)) {
		return false;
	}

	if (!isShortcutEvent(event)) {
		return false;
	}

	if (event.key === "Enter") {
		return !isEnterKeyHandledByFocusedElement(event.target);
	}

	return !isEditableTarget(event.target);
}

function isEnterKeyHandledByFocusedElement(target) {
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
}
