// test/auth/AuthTokenProvider.test.js
import { expect, test } from "@jest/globals";
import { setAuthTokenProvider, subscribeAuthTokenProviderChange } from "../../src/auth/AuthTokenProvider.js";

test("notifies model wiring when the active auth token provider changes", () => {
	let changes = 0;
	const tokenProvider = async () => "token";
	const unsubscribe = subscribeAuthTokenProviderChange(() => {
		changes += 1;
	});

	setAuthTokenProvider(tokenProvider);
	setAuthTokenProvider(tokenProvider);
	setAuthTokenProvider(null);
	unsubscribe();

	expect(changes).toBe(2);
});
