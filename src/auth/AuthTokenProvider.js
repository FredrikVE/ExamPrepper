// src/auth/AuthTokenProvider.js
const authTokenProviderChangeListeners = new Set();

async function readAnonymousAuthToken() {
	return null;
}

let activeAuthTokenProvider = readAnonymousAuthToken;

export function setAuthTokenProvider(authTokenProvider) {
	if (typeof authTokenProvider !== "function") {
		throw new Error("Auth token provider must be a function");
	}

	replaceAuthTokenProvider(authTokenProvider);
}

export function clearAuthTokenProvider() {
	replaceAuthTokenProvider(readAnonymousAuthToken);
}

export function subscribeAuthTokenProviderChange(listener) {
	authTokenProviderChangeListeners.add(listener);

	return () => {
		authTokenProviderChangeListeners.delete(listener);
	};
}

export async function getActiveAuthToken() {
	return await activeAuthTokenProvider();
}

function replaceAuthTokenProvider(authTokenProvider) {
	if (activeAuthTokenProvider === authTokenProvider) {
		return;
	}

	activeAuthTokenProvider = authTokenProvider;

	for (const listener of authTokenProviderChangeListeners) {
		listener();
	}
}
