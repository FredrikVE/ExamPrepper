// src/ui/viewmodel/GlossaryPage/glossaryDetailNavigationModel.js
export function createGlossaryDetailNavigationPresentation(params) {
	if (params.activeGlossaryEntryKey === null) {
		return null;
	}

	const currentIndex = params.visibleGlossaryEntryKeys.indexOf(params.activeGlossaryEntryKey);
	const isInSequence = currentIndex !== -1;
	const previousGlossaryEntryKey = isInSequence && currentIndex > 0
		? params.visibleGlossaryEntryKeys[currentIndex - 1]
		: null;
	const nextGlossaryEntryKey = isInSequence && currentIndex < params.visibleGlossaryEntryKeys.length - 1
		? params.visibleGlossaryEntryKeys[currentIndex + 1]
		: null;
	const trailBackGlossaryEntryKey = params.trailKeys.length === 0
		? null
		: params.trailKeys[params.trailKeys.length - 1];
	const trailBackEntry = trailBackGlossaryEntryKey === null
		? null
		: requireGlossaryEntry(params.localizedEntryByKey, trailBackGlossaryEntryKey);

	return {
		trailBack: trailBackEntry === null
			? null
			: {
				targetGlossaryEntryKey: trailBackEntry.glossaryEntryKey,
				label: params.t.glossaryPageDetailBackLabel(trailBackEntry.term)
			},
		sequence: {
			isInSequence,
			positionLabel: isInSequence
				? params.t.glossaryPageDetailPositionLabel(currentIndex + 1, params.visibleGlossaryEntryKeys.length)
				: params.t.glossaryPageDetailOutsideSelectionLabel,
			previous: {
				targetGlossaryEntryKey: previousGlossaryEntryKey,
				isDisabled: previousGlossaryEntryKey === null,
				label: params.t.glossaryPageDetailPreviousLabel
			},
			next: {
				targetGlossaryEntryKey: nextGlossaryEntryKey,
				isDisabled: nextGlossaryEntryKey === null,
				label: params.t.glossaryPageDetailNextLabel
			}
		}
	};
}

function requireGlossaryEntry(localizedEntryByKey, glossaryEntryKey) {
	const localizedEntry = localizedEntryByKey.get(glossaryEntryKey);

	if (!localizedEntry) {
		throw new Error(`Missing glossary overview entry for detail navigation: ${glossaryEntryKey}`);
	}

	return localizedEntry;
}
