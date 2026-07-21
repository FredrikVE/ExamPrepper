// test/ui/viewmodel/MatchCardsPage/matchCardsTestFixtures.js
export const keepOrderRandomNumber = () => 0.999;

export const reverseRandomNumber = () => 0;

export const createGlossaryEntries = () => [
	createGlossaryEntry("entry-a", "Begrep A", "Term A", "Forklaring A", "Explanation A"),
	createGlossaryEntry("entry-b", "Begrep B", "Term B", "Forklaring B", "Explanation B"),
	createGlossaryEntry("entry-c", "Begrep C", "Term C", "Forklaring C", "Explanation C"),
	createGlossaryEntry("entry-d", "Begrep D", "Term D", "Forklaring D", "Explanation D")
];

export const findSlot = (slots, slotId) => {
	for (const slot of slots) {
		if (slot.slotId === slotId) {
			return slot;
		}
	}

	return null;
};

export const findSlotByColumnAndGlossaryEntry = ({ slots, column, glossaryEntryKey }) => {
	for (const slot of slots) {
		if (slot.column === column && slot.glossaryEntryKey === glossaryEntryKey) {
			return slot;
		}
	}

	return null;
};

const createGlossaryEntry = (glossaryEntryKey, termNo, termEn, explanationNo, explanationEn) => ({
	glossaryEntryKey,
	term: {
		no: termNo,
		en: termEn
	},
	explanation: {
		no: explanationNo,
		en: explanationEn
	}
});
