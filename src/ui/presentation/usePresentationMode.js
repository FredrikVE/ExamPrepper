// src/ui/presentation/usePresentationMode.js
import { useSyncExternalStore } from "react";
import { getPresentationMode, subscribeToPresentationMode } from "./presentationMode.js";

export default function usePresentationMode() {
    return useSyncExternalStore(subscribeToPresentationMode, getPresentationMode, getPresentationMode);
}
