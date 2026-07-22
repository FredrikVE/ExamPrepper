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

/*
 * Deklarativ navigasjonsgraf. Hver node beskriver:
 * - backTo: skjermen tilbake-navigasjon peker mot (null = ingen back)
 * - requiresSubject: uten valgt fag faller navigasjonen tilbake til SUBJECTS
 * - requiresExam: uten valgt eksamen skjer ingen navigasjon
 * - clearsSubject / clearsExam / clearsTopicArea: valg som nullstilles ved inngang til skjermen
 * - pageClass / shellClass / themeScope: skjermens app-chrome
 *
 * Grafen inneholder bare skjermer som faktisk rendres som app-ruter.
 * Settings håndteres av SettingsPresentation og er ikke en NAV_SCREEN.
 */
export const NAV_GRAPH = {
	[NAV_SCREENS.SUBJECTS]: {
		pageClass: "exam-select-page",
		shellClass: "exam-select-shell",
		themeScope: null,
		backTo: null,
		requiresSubject: false,
		requiresExam: false,
		clearsSubject: true,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.SELECT]: {
		pageClass: "exam-select-page",
		shellClass: "exam-select-shell",
		themeScope: null,
		backTo: NAV_SCREENS.SUBJECTS,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.EXAM]: {
		pageClass: "exam-page",
		shellClass: "exam-shell",
		themeScope: null,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: false,
		requiresExam: true,
		clearsSubject: false,
		clearsExam: false,
		clearsTopicArea: false
	},
	[NAV_SCREENS.FLIPCARDS]: {
		pageClass: "exam-page",
		shellClass: "exam-shell",
		themeScope: "flipcards-theme-scope",
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	},
	[NAV_SCREENS.MATCHCARDS]: {
		pageClass: "exam-page",
		shellClass: "exam-shell",
		themeScope: "flipcards-theme-scope",
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	},
	[NAV_SCREENS.GLOSSARY]: {
		pageClass: "exam-select-page",
		shellClass: "exam-select-shell",
		themeScope: null,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.OVERVIEW]: {
		pageClass: "exam-select-page",
		shellClass: "exam-select-shell",
		themeScope: null,
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

	return {
		screen: nextScreen,
		selectedSubjectId: node.clearsSubject ? null : navState.selectedSubjectId,
		selectedExamId: node.clearsExam ? null : navState.selectedExamId,
		selectedTopicAreaKey: node.clearsTopicArea ? null : navState.selectedTopicAreaKey
	};
}

export function resolveBackNavigation(navState) {
	const node = NAV_GRAPH[navState.screen];
	const backScreen = node ? node.backTo : NAV_SCREENS.SUBJECTS;

	if (backScreen === null) {
		return null;
	}

	return resolveScreenEntry(backScreen, navState);
}

export function hasBackNavigation(screen) {
	const node = NAV_GRAPH[screen];
	return Boolean(node ? node.backTo : NAV_SCREENS.SUBJECTS);
}

export function resolveScreenChrome(screen) {
	const node = NAV_GRAPH[screen] ?? NAV_GRAPH[NAV_SCREENS.SUBJECTS];

	return {
		pageClassName: [node.pageClass, node.themeScope].filter(Boolean).join(" "),
		shellClassName: node.shellClass
	};
}

export function createAppBackContract({ screen, backLabel, navigationLabel, onBack }) {
	return {
		showBackButton: hasBackNavigation(screen),
		backLabel,
		navigationLabel,
		onBack
	};
}
