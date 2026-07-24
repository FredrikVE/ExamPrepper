// src/ui/view/components/Header/headerVariants.js
export const HEADER_APPEARANCES = {
	DEFAULT: "default",
	TRANSPARENT: "transparent"
};

export const HEADER_LAYOUTS = {
	DEFAULT: "default",
	EXAM_PROGRESS: "exam-progress",
	MATCHCARDS_PROGRESS: "matchcards-progress",
	PAGE_TITLE: "page-title"
};

const HEADER_APPEARANCE_CLASS_NAMES = {
	[HEADER_APPEARANCES.DEFAULT]: "scaffold-header--appearance-default",
	[HEADER_APPEARANCES.TRANSPARENT]: "scaffold-header--appearance-transparent"
};

const HEADER_LAYOUT_CLASS_NAMES = {
	[HEADER_LAYOUTS.DEFAULT]: "scaffold-header--layout-default",
	[HEADER_LAYOUTS.EXAM_PROGRESS]: "scaffold-header--layout-exam-progress",
	[HEADER_LAYOUTS.MATCHCARDS_PROGRESS]: "scaffold-header--layout-matchcards-progress",
	[HEADER_LAYOUTS.PAGE_TITLE]: "scaffold-header--layout-page-title"
};

export function createHeaderClassName(appearance, layout) {
	const appearanceClassName = HEADER_APPEARANCE_CLASS_NAMES[appearance];
	const layoutClassName = HEADER_LAYOUT_CLASS_NAMES[layout];

	if (appearanceClassName === undefined) {
		throw new Error(`Unknown Header appearance: ${String(appearance)}`);
	}

	if (layoutClassName === undefined) {
		throw new Error(`Unknown Header layout: ${String(layout)}`);
	}

	return `scaffold-header ${appearanceClassName} ${layoutClassName}`;
}
