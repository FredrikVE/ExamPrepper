// src/ui/viewmodel/AppNavigation/useSettingsPresentationModel.js
import { useCallback, useEffect, useState } from "react";
import { getPresentationMode, PRESENTATION_MODE, subscribeToPresentationMode } from "../../presentation/presentationMode.js";

function resolveSettingsPresentationMode(presentationMode) {
	return presentationMode === PRESENTATION_MODE.MOBILE ? "sheet" : "sidebar";
}

function getSettingsPresentationMode() {
	return resolveSettingsPresentationMode(getPresentationMode());
}

export default function useSettingsPresentationModel() {
	const [isSettingsPresentationOpen, setIsSettingsPresentationOpen] = useState(false);
	const [settingsPresentationMode, setSettingsPresentationMode] = useState(getSettingsPresentationMode);

	// Settings skal ikke overleve et layout-mode-bytte. Når breakpointet krysses
	// settes presentasjonsmodus og settings presentation-open i samme handler, slik at React
	// batcher dem til én commit: den nye varianten mountes lukket og rekker aldri
	// å vises i feil geometri.
	useEffect(() => {
		const handlePresentationModeChange = () => {
			setSettingsPresentationMode(getSettingsPresentationMode());
			setIsSettingsPresentationOpen(false);
		};

		return subscribeToPresentationMode(handlePresentationModeChange);
	}, []);

	const openSettingsPresentation = useCallback(() => {
		setIsSettingsPresentationOpen(true);
	}, []);

	const closeSettingsPresentation = useCallback(() => {
		setIsSettingsPresentationOpen(false);
	}, []);

	return {
		isSettingsPresentationOpen,
		settingsPresentationMode,
		openSettingsPresentation,
		closeSettingsPresentation
	};
}
