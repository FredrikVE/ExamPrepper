// test/auth/AppAuthState.test.js
import { describe, expect, test } from "@jest/globals";
import {
	APP_AUTH_STATUS,
	DISABLED_APP_AUTH_STATE,
	LOADING_APP_AUTH_STATE,
	SIGNED_OUT_APP_AUTH_STATE,
	assertAppAuthState,
	createAppAuthScopeKey,
	createSignedInAppAuthState
} from "../../src/auth/AppAuthState.js";

describe("AppAuthState", () => {
	test("exposes explicit non-authenticated states without user identity", () => {
		expect(DISABLED_APP_AUTH_STATE).toEqual({ status: APP_AUTH_STATUS.DISABLED });
		expect(LOADING_APP_AUTH_STATE).toEqual({ status: APP_AUTH_STATUS.LOADING });
		expect(SIGNED_OUT_APP_AUTH_STATE).toEqual({ status: APP_AUTH_STATUS.SIGNED_OUT });
	});

	test("requires user identity for signed-in state", () => {
		expect(createSignedInAppAuthState("user-1")).toEqual({
			status: APP_AUTH_STATUS.SIGNED_IN,
			userId: "user-1"
		});

		expect(() => createSignedInAppAuthState("")).toThrow("Signed-in auth state requires userId");
		expect(() => createSignedInAppAuthState(null)).toThrow("Signed-in auth state requires userId");
	});

	test("creates stable resource scope keys for every valid auth state", () => {
		expect(createAppAuthScopeKey(DISABLED_APP_AUTH_STATE)).toBe("auth-disabled");
		expect(createAppAuthScopeKey(LOADING_APP_AUTH_STATE)).toBe("auth-loading");
		expect(createAppAuthScopeKey(SIGNED_OUT_APP_AUTH_STATE)).toBe("signed-out");
		expect(createAppAuthScopeKey(createSignedInAppAuthState("user-1"))).toBe("user:user-1");
	});

	test("rejects impossible auth state combinations", () => {
		expect(() => assertAppAuthState({ status: APP_AUTH_STATUS.SIGNED_OUT, userId: "user-1" })).toThrow("must not contain userId");
		expect(() => assertAppAuthState({ status: APP_AUTH_STATUS.SIGNED_IN })).toThrow("Signed-in auth state requires userId");
		expect(() => assertAppAuthState({ status: "unknown" })).toThrow("Unknown app auth status");
	});
});
