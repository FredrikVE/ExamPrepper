// src/ui/presentation/useAppShellMode.js
import { useSyncExternalStore } from "react";
import { getAppShellMode, subscribeToAppShellMode } from "./appShellMode.js";

export default function useAppShellMode() {
	return useSyncExternalStore(subscribeToAppShellMode, getAppShellMode, getAppShellMode);
}
