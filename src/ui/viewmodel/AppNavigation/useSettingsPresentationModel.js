// src/ui/viewmodel/AppNavigation/useSettingsPresentationModel.js
import { useCallback, useEffect, useState } from "react";
import { APP_SHELL_MODE, getAppShellMode, subscribeToAppShellMode } from "../../presentation/appShellMode.js";

function resolveSettingsPresentationMode(appShellMode) {
	return appShellMode === APP_SHELL_MODE.COMPACT ? "sheet" : "sidebar";
}

function getSettingsPresentationMode() {
	return resolveSettingsPresentationMode(getAppShellMode());
}

export default function useSettingsPresentationModel() {
	const [isSettingsPresentationOpen, setIsSettingsPresentationOpen] = useState(false);
	const [settingsPresentationMode, setSettingsPresentationMode] = useState(getSettingsPresentationMode);

	// Settings skal ikke overleve et shell-mode-bytte. Når compact/full-grensen krysses
	// settes presentasjonsmodus og settings presentation-open i samme handler, slik at React
	// batcher dem til én commit: den nye varianten mountes lukket og rekker aldri
	// å vises i feil geometri.
	useEffect(() => {
		const handleAppShellModeChange = () => {
			setSettingsPresentationMode(getSettingsPresentationMode());
			setIsSettingsPresentationOpen(false);
		};

		return subscribeToAppShellMode(handleAppShellModeChange);
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
