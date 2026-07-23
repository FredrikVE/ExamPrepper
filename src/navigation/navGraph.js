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
 * - classes: preset fra SCREEN_CLASSES — skjermens app-chrome
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

/*
 * Tre klassekombinasjoner dekker alle sju skjermene. Presetene navngis her,
 * slik at en endring i skallets klassenavn skjer ett sted og ikke i fire noder.
 */
const SCREEN_CLASSES = {
	SELECT: { pageClass: "exam-select-page", shellClass: "exam-select-shell", themeScope: null },
	EXAM: { pageClass: "exam-page", shellClass: "exam-shell", themeScope: null },
	PRACTICE: { pageClass: "exam-page", shellClass: "exam-shell", themeScope: "flipcards-theme-scope" }
};

const ROOT_SCREEN = NAV_SCREENS.SUBJECTS;

export const NAV_GRAPH = {
	[NAV_SCREENS.SUBJECTS]: {
		classes: SCREEN_CLASSES.SELECT,
		backTo: null,
		requiresSubject: false,
		requiresExam: false,
		clearsSubject: true,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.SELECT]: {
		classes: SCREEN_CLASSES.SELECT,
		backTo: NAV_SCREENS.SUBJECTS,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.EXAM]: {
		classes: SCREEN_CLASSES.EXAM,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: false,
		requiresExam: true,
		clearsSubject: false,
		clearsExam: false,
		clearsTopicArea: false
	},
	[NAV_SCREENS.FLIPCARDS]: {
		classes: SCREEN_CLASSES.PRACTICE,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	},
	[NAV_SCREENS.MATCHCARDS]: {
		classes: SCREEN_CLASSES.PRACTICE,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	},
	[NAV_SCREENS.GLOSSARY]: {
		classes: SCREEN_CLASSES.SELECT,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: true
	},
	[NAV_SCREENS.OVERVIEW]: {
		classes: SCREEN_CLASSES.SELECT,
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: false,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true,
		clearsTopicArea: false
	}
};

/*
 * Én policy for ukjent skjerm, brukt av alle som leser tilstand om en skjerm:
 * den behandles som rotskjermen — også for backTo, som dermed er null.
 * Å NAVIGERE til en ukjent skjerm er noe annet og avvises, se
 * resolveScreenEntry.
 *
 * Tilstanden er uoppnåelig i drift: navState.screen kommer alltid fra
 * resolveNavigation, som kun produserer skjermer i grafen.
 */
function getNodeOrRoot(screen) {
	return NAV_GRAPH[screen] ?? NAV_GRAPH[ROOT_SCREEN];
}

/*
 * Returnerer null når overgangen ikke skal skje: ukjent skjerm, eller en
 * skjerm som krever eksamen uten at én er valgt.
 *
 * Mangler valgt fag omdirigeres til rot i stedet for å avvises. Målskjermen
 * velges derfor før tilstanden bygges — ikke ved å kalle funksjonen på nytt,
 * som ville vært avhengig av at rotnoden aldri selv krever fag.
 */
function resolveScreenEntry(nextScreen, navState) {
	const node = NAV_GRAPH[nextScreen];

	if (!node) {
		return null;
	}

	if (node.requiresExam && !navState.selectedExamId) {
		return null;
	}

	const redirectsToRoot = node.requiresSubject && !navState.selectedSubjectId;
	const targetScreen = redirectsToRoot ? ROOT_SCREEN : nextScreen;
	const targetNode = NAV_GRAPH[targetScreen];

	return {
		screen: targetScreen,
		selectedSubjectId: targetNode.clearsSubject ? null : navState.selectedSubjectId,
		selectedExamId: targetNode.clearsExam ? null : navState.selectedExamId,
		selectedTopicAreaKey: targetNode.clearsTopicArea ? null : navState.selectedTopicAreaKey
	};
}

function resolveBackNavigation(navState) {
	const backScreen = getNodeOrRoot(navState.screen).backTo;

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
	const node = getNodeOrRoot(screen);

	return {
		pageClassName: [node.classes.pageClass, node.classes.themeScope].filter(Boolean).join(" "),
		shellClassName: node.classes.shellClass,
		showBackButton: node.backTo !== null
	};
}
