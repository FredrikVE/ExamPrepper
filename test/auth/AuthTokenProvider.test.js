// test/auth/AuthTokenProvider.test.js
import { expect, test } from "@jest/globals";
import { clearAuthTokenProvider, getActiveAuthToken, setAuthTokenProvider, subscribeAuthTokenProviderChange } from "../../src/auth/AuthTokenProvider.js";

test("notifies model wiring when the active auth token provider changes", () => {
	let changes = 0;
	const tokenProvider = async () => "token";
	const unsubscribe = subscribeAuthTokenProviderChange(() => {
		changes += 1;
	});

	setAuthTokenProvider(tokenProvider);
	setAuthTokenProvider(tokenProvider);
	clearAuthTokenProvider();
	clearAuthTokenProvider();
	unsubscribe();

	expect(changes).toBe(2);
});

test("fails fast when auth token provider is not a function", () => {
	expect(() => setAuthTokenProvider(null)).toThrow("Auth token provider must be a function");
});

test("returns null after the auth token provider is cleared", async () => {
	setAuthTokenProvider(async () => "token");
	expect(await getActiveAuthToken()).toBe("token");

	clearAuthTokenProvider();
	expect(await getActiveAuthToken()).toBeNull();
});
