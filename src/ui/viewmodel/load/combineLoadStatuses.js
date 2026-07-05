// src/ui/viewmodel/load/combineLoadStatuses.js
import { LOAD_STATUS } from "../../presentation/loadStatus.js";

const STATUS_PRIORITY = [
	LOAD_STATUS.ERROR,
	LOAD_STATUS.LOADING,
	LOAD_STATUS.RELOADING
];

export default function combineLoadStatuses(statuses) {
	for (const prioritizedStatus of STATUS_PRIORITY) {
		for (const status of statuses) {
			if (status === prioritizedStatus) {
				return prioritizedStatus;
			}
		}
	}

	return LOAD_STATUS.READY;
}
