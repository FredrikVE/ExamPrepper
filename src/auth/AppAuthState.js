// src/auth/AppAuthState.js
export const APP_AUTH_STATUS = Object.freeze({
	DISABLED: "disabled",
	LOADING: "loading",
	SIGNED_OUT: "signed-out",
	SIGNED_IN: "signed-in"
});

export const DISABLED_APP_AUTH_STATE = Object.freeze({
	status: APP_AUTH_STATUS.DISABLED
});

export const LOADING_APP_AUTH_STATE = Object.freeze({
	status: APP_AUTH_STATUS.LOADING
});

export const SIGNED_OUT_APP_AUTH_STATE = Object.freeze({
	status: APP_AUTH_STATUS.SIGNED_OUT
});

export function createSignedInAppAuthState(userId) {
	if (typeof userId !== "string" || userId.length === 0) {
		throw new Error("Signed-in auth state requires userId");
	}

	return {
		status: APP_AUTH_STATUS.SIGNED_IN,
		userId
	};
}

export function createAppAuthScopeKey(authState) {
	assertAppAuthState(authState);

	switch (authState.status) {
		case APP_AUTH_STATUS.SIGNED_IN:
			return `user:${authState.userId}`;

		case APP_AUTH_STATUS.DISABLED:
			return "auth-disabled";

		case APP_AUTH_STATUS.LOADING:
			return "auth-loading";

		case APP_AUTH_STATUS.SIGNED_OUT:
			return "signed-out";

		default:
			throw new Error(`Unknown app auth status '${String(authState.status)}'`);
	}
}

export function assertAppAuthState(authState) {
	if (!authState || typeof authState !== "object") {
		throw new Error("App auth state must be an object");
	}

	if (authState.status === APP_AUTH_STATUS.SIGNED_IN) {
		if (typeof authState.userId !== "string" || authState.userId.length === 0) {
			throw new Error("Signed-in auth state requires userId");
		}

		return;
	}

	if (
		authState.status === APP_AUTH_STATUS.DISABLED
		|| authState.status === APP_AUTH_STATUS.LOADING
		|| authState.status === APP_AUTH_STATUS.SIGNED_OUT
	) {
		if (Object.hasOwn(authState, "userId")) {
			throw new Error(`Auth state '${authState.status}' must not contain userId`);
		}

		return;
	}

	throw new Error(`Unknown app auth status '${String(authState.status)}'`);
}
