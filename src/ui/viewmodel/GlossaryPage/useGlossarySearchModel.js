// src/ui/viewmodel/GlossaryPage/useGlossarySearchModel.js
import { useState } from "react";

export default function useGlossarySearchModel() {
	const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
	const [searchKeyboardIndex, setSearchKeyboardIndex] = useState(-1);
	const [isSearchFilterOptionsOpen, setIsSearchFilterOptionsOpen] = useState(false);
	const [isSearchAutocompleteOpen, setIsSearchAutocompleteOpen] = useState(false);
	const [searchNarrowedGlossaryEntryKey, setSearchNarrowedGlossaryEntryKey] = useState(null);

	return {
		glossarySearchTerm,
		setGlossarySearchTerm,
		searchKeyboardIndex,
		setSearchKeyboardIndex,
		isSearchFilterOptionsOpen,
		setIsSearchFilterOptionsOpen,
		isSearchAutocompleteOpen,
		setIsSearchAutocompleteOpen,
		searchNarrowedGlossaryEntryKey,
		setSearchNarrowedGlossaryEntryKey
	};
}
