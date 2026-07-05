// src/ui/loadStatus/loadStatus.js
export const LOAD_STATUS = {
	LOADING: "loading",
	ERROR: "error",
	READY: "ready"
};

export function isBlockingLoadStatus(status) {
	return status === LOAD_STATUS.LOADING || status === LOAD_STATUS.ERROR;
}
