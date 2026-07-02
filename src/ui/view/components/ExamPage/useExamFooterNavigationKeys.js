// src/ui/view/components/ExamPage/useExamFooterNavigationKeys.js
import { useEffect } from "react";

const FOOTER_NAVIGATION_KEYS = ["Enter", "ArrowLeft", "ArrowRight"];

export default function useExamFooterNavigationKeys({
	isEnabled,
	canGoPrevious,
	canGoNext,
	submitted,
	onNavigatePrevious,
	onNavigateNext
}) {
	useEffect(() => {
		if (!isEnabled) {
			return undefined;
		}

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

		window.addEventListener("keydown", navigateOnArrowKey);
		return () => window.removeEventListener("keydown", navigateOnArrowKey);
	}, [isEnabled, canGoPrevious, canGoNext, submitted, onNavigatePrevious, onNavigateNext]);
}

function shouldHandleFooterNavigationKeyDown(event) {
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

function isArrowKeyHandledByFocusedElement(target) {
	if (typeof Element === "undefined" || !(target instanceof Element)) {
		return false;
	}

	return Boolean(
		target.closest(
			"input, select, textarea, [contenteditable='true'], [role='textbox'], [role='combobox'], [role='listbox'], [role='slider'], [role='spinbutton']"
		)
	);
}
