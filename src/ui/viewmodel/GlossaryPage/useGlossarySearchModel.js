// src/ui/viewmodel/GlossaryPage/useGlossarySearchModel.js
import { useEffect, useState } from "react";

export default function useGlossarySearchModel({ resetKey }) {
	const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
	const [searchKeyboardIndex, setSearchKeyboardIndex] = useState(-1);
	const [isSearchFilterOptionsOpen, setIsSearchFilterOptionsOpen] = useState(false);
	const [isSearchAutocompleteOpen, setIsSearchAutocompleteOpen] = useState(false);
	const [searchNarrowedGlossaryEntryKey, setSearchNarrowedGlossaryEntryKey] = useState(null);

	useEffect(() => {
		setGlossarySearchTerm("");
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(false);
		setSearchNarrowedGlossaryEntryKey(null);
	}, [resetKey]);

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
