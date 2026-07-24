// src/ui/view/components/Shared/ProgressBar/progressBarVariants.js
export const PROGRESS_BAR_VARIANTS = {
	DEFAULT: "default",
	HEADER: "header"
};

const PROGRESS_BAR_CLASS_NAMES = {
	[PROGRESS_BAR_VARIANTS.DEFAULT]: "progress-bar progress-bar--default",
	[PROGRESS_BAR_VARIANTS.HEADER]: "progress-bar progress-bar--header"
};

export function getProgressBarClassName(variant) {
	const className = PROGRESS_BAR_CLASS_NAMES[variant];

	if (className === undefined) {
		throw new Error(`Unknown ProgressBar variant: ${String(variant)}`);
	}

	return className;
}
