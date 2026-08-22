// src/auth/AuthTokenProvider.js
let activeAuthTokenProvider = null;
const authTokenProviderChangeListeners = new Set();

export function setAuthTokenProvider(authTokenProvider) {
	if (activeAuthTokenProvider === authTokenProvider) {

		return;

	}

	activeAuthTokenProvider = authTokenProvider;

	for (const listener of authTokenProviderChangeListeners) {
		listener();
	}
}

export function subscribeAuthTokenProviderChange(listener) {
	authTokenProviderChangeListeners.add(listener);

	return () => {
		authTokenProviderChangeListeners.delete(listener);
	};
}

export async function getActiveAuthToken() {
	if (!activeAuthTokenProvider) {

		return null;

	}

	return await activeAuthTokenProvider();
}
