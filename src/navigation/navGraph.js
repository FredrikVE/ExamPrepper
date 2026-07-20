// src/navigation/navGraph.js
export const NAV_SCREENS = {
	SUBJECTS: "subjects",
	SELECT: "select",
	EXAM: "exam",
	FLIPCARDS: "flipcards",
	MATCHCARDS: "matchcards",
	GLOSSARY: "glossary",
	OVERVIEW: "overview"
};

export const APP_LAYOUTS = {
	SELECTION: "selection",
	EXAM: "exam"
};

/*
 * Deklarativ navigasjonsgraf. Hver node beskriver:
 * - backTo: skjermen tilbake-navigasjon peker mot (null = ingen back)
 * - requiresSubject: uten valgt fag faller navigasjonen tilbake til SUBJECTS
 * - requiresExam: uten valgt eksamen skjer ingen navigasjon
 * - clearsSubject / clearsExam / clearsTopicArea: valg som nullstilles ved inngang til skjermen
 * - layout: hvilken app-layout skjermen bruker
 *
 * Grafen inneholder bare skjermer som faktisk rendres som app-ruter.
 * Settings håndteres av SettingsPresentation og er ikke en NAV_SCREEN.
 */
export const NAV_GRAPH = {
	[NAV_SCREENS.SUBJECTS]: {
		layout: APP_LAYOUTS.SELECTION,
		backTo: null,
		requiresSubject: false,
		requiresExam: false,
		clearsSubject: true,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.SELECT]: {
		layout: APP_LAYOUTS.SELECTION,
		backTo: NAV_SCREENS.SUBJECTS,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.EXAM]: {
		layout: APP_LAYOUTS.EXAM,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: false,
		requiresExam: true,
		clearsSubject: false,
		clearsExam: false,
		clearsTopicArea: false
	},
	[NAV_SCREENS.FLIPCARDS]: {
		layout: APP_LAYOUTS.EXAM,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	},
	[NAV_SCREENS.MATCHCARDS]: {
		layout: APP_LAYOUTS.EXAM,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	},
	[NAV_SCREENS.GLOSSARY]: {
		layout: APP_LAYOUTS.EXAM,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.OVERVIEW]: {
		layout: APP_LAYOUTS.SELECTION,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: false,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	}
};

export function resolveScreenEntry(nextScreen, navState) {
	const node = NAV_GRAPH[nextScreen];

	if (!node) {
		return null;
	}

	if (node.requiresExam && !navState.selectedExamId) {
		return null;
	}

	if (node.requiresSubject && !navState.selectedSubjectId) {
		return resolveScreenEntry(NAV_SCREENS.SUBJECTS, navState);
	}

	const selectedTopicAreaKey = node.clearsTopicArea ? null : navState.selectedTopicAreaKey;
	const nextNavState = {
		screen: nextScreen,
		selectedSubjectId: node.clearsSubject ? null : navState.selectedSubjectId,
		selectedExamId: node.clearsExam ? null : navState.selectedExamId
	};

	if (Object.prototype.hasOwnProperty.call(navState, "selectedTopicAreaKey") || selectedTopicAreaKey) {
		nextNavState.selectedTopicAreaKey = selectedTopicAreaKey ?? null;
	}

	return nextNavState;
}

export function resolveBackNavigation(navState) {
	const node = NAV_GRAPH[navState.activeScreen];
	const backScreen = node ? node.backTo : NAV_SCREENS.SUBJECTS;

	if (backScreen === null) {
		return null;
	}

	return resolveScreenEntry(backScreen, navState);
}

export function hasBackNavigation(activeScreen) {
	const node = NAV_GRAPH[activeScreen];
	return Boolean(node ? node.backTo : NAV_SCREENS.SUBJECTS);
}

export function resolveScreenLayout(activeScreen) {
	return NAV_GRAPH[activeScreen]?.layout ?? APP_LAYOUTS.SELECTION;
}

export function createAppBackContract({ activeScreen, backLabel, navigationLabel, onBack }) {
	return {
		showBackButton: hasBackNavigation(activeScreen),
		backLabel,
		navigationLabel,
		onBack
	};
}
