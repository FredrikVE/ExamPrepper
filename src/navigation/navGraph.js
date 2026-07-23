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
 * Grafen eier hvilke skjermer som HAR tilbake-navigasjon (backTo), og
 * resolveScreenChrome eksponerer det som showBackButton. Grafen eier ikke
 * knappens tekst eller klikk-handler — det er ViewModel- og i18n-ansvar.
 *
 * Grafen inneholder bare skjermer som faktisk rendres som app-ruter.
 * Settings håndteres av SettingsPresentation og er ikke en NAV_SCREEN.
 */
export const INITIAL_NAV_STATE = {
	screen: NAV_SCREENS.SUBJECTS,
	selectedSubjectId: null,
	selectedExamId: null,
	selectedTopicAreaKey: null
};

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

function resolveScreenEntry(nextScreen, navState) {
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

function resolveBackNavigation(navState) {
	const node = NAV_GRAPH[navState.screen];
	const backScreen = node ? node.backTo : NAV_SCREENS.SUBJECTS;

	if (backScreen === null) {
		return null;
	}

	return resolveScreenEntry(backScreen, navState);
}

/**
 * Navigasjonens eneste overgangsfunksjon. Signaturen (tilstand, forespørsel)
 * er med vilje reducer-formet, så den kan sendes rett til useReducer.
 *
 *   { back: true }                    → følg nodens backTo
 *   { screen }                        → gå til skjerm, grafen nullstiller
 *   { selection }                     → bli stående, endre valg
 *   { screen, selection }             → begge deler
 *
 * Avvist overgang returnerer samme tilstandsobjekt, slik at React hopper
 * over re-render.
 */
export function resolveNavigation(navState, request) {
	if (request.back) {
		return resolveBackNavigation(navState) ?? navState;
	}

	const nextScreen = request.screen ?? navState.screen;

	return resolveScreenEntry(nextScreen, { ...navState, ...request.selection }) ?? navState;
}

export function resolveScreenChrome(screen) {
	const node = NAV_GRAPH[screen] ?? NAV_GRAPH[NAV_SCREENS.SUBJECTS];

	return {
		pageClassName: [node.pageClass, node.themeScope].filter(Boolean).join(" "),
		shellClassName: node.shellClass,
		showBackButton: node.backTo !== null
	};
}
