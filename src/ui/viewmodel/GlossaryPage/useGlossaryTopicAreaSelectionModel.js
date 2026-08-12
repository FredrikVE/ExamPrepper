// src/ui/viewmodel/GlossaryPage/useGlossaryTopicAreaSelectionModel.js
import { useEffect, useState } from "react";

export default function useGlossaryTopicAreaSelectionModel({ resetKey }) {
	const [selectedTopicAreaKeys, setSelectedTopicAreaKeys] = useState(null);

	useEffect(() => {
		setSelectedTopicAreaKeys(null);
	}, [resetKey]);

	return {
		selectedTopicAreaKeys,
		setSelectedTopicAreaKeys
	};
}
