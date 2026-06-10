// src/auth/AuthTokenProvider.js
let activeAuthTokenProvider = null;

export function setAuthTokenProvider(authTokenProvider) {
	activeAuthTokenProvider = authTokenProvider;
}

export async function getActiveAuthToken() {
	if (!activeAuthTokenProvider) {
		return null;
	}

	return await activeAuthTokenProvider();
}
