// src/navigation/navGraph.js
export const NAV_SCREENS = {
	SUBJECTS: "subjects",
	SELECT: "select",
	EXAM: "exam",
	FLIPCARDS: "flipcards",
	OVERVIEW: "overview",
	NOTES: "notes",
	SETTINGS: "settings"
};

/*
 * Deklarativ navigasjonsgraf. Hver node beskriver:
 * - backTo: skjermen tilbake-navigasjon peker mot (null = ingen back)
 * - requiresSubject: uten valgt fag faller navigasjonen tilbake til SUBJECTS
 * - requiresExam: uten valgt eksamen skjer ingen navigasjon
 * - clearsSubject / clearsExam: valg som nullstilles ved inngang til skjermen
 *
 * NOTES og SETTINGS har bevisst ingen node i grafen ennå. NOTES har ingen
 * konsumenter, og SETTINGS er SettingsPresentation-handling, ikke en skjerm.
 */
export const NAV_GRAPH = {
	[NAV_SCREENS.SUBJECTS]: {
		backTo: null,
		requiresSubject: false,
		requiresExam: false,
		clearsSubject: true,
		clearsExam: true
	},
	[NAV_SCREENS.SELECT]: {
		backTo: NAV_SCREENS.SUBJECTS,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true
	},
	[NAV_SCREENS.EXAM]: {
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: false,
		requiresExam: true,
		clearsSubject: false,
		clearsExam: false
	},
	[NAV_SCREENS.FLIPCARDS]: {
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: true,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true
	},
	[NAV_SCREENS.OVERVIEW]: {
		backTo: NAV_SCREENS.SELECT,
		requiresSubject: false,
		requiresExam: false,
		clearsSubject: false,
		clearsExam: true
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
		selectedExamId: node.clearsExam ? null : navState.selectedExamId
	};
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

export function createAppBackContract({ activeScreen, backLabel, navigationLabel, onBack }) {
	return {
		showBackButton: hasBackNavigation(activeScreen),
		backLabel,
		navigationLabel,
		onBack
	};
}
