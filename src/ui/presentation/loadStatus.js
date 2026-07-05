// src/ui/presentation/loadStatus.js
export const LOAD_STATUS = {
	LOADING: "loading",
	RELOADING: "reloading",
	ERROR: "error",
	READY: "ready"
};

export function isBlockingLoadStatus(status) {
	return status === LOAD_STATUS.LOADING || status === LOAD_STATUS.ERROR;
}
