// src/auth/ClerkAppProvider.jsx
import { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { AppAuthProvider } from "./AppAuthContext.jsx";
import { DISABLED_APP_AUTH_STATE, LOADING_APP_AUTH_STATE, SIGNED_OUT_APP_AUTH_STATE, createSignedInAppAuthState } from "./AppAuthState.js";
import { clearAuthTokenProvider, setAuthTokenProvider } from "./AuthTokenProvider.js";

export default function ClerkAppProvider({ children }) {
	const publishableKey = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY;
	const afterSignOutUrl = import.meta.env.BASE_URL;

	if (!publishableKey) {
		return (
			<AppAuthProvider authState={DISABLED_APP_AUTH_STATE}>
				{children}
			</AppAuthProvider>
		);
	}

	return (
		<ClerkProvider publishableKey={publishableKey} afterSignOutUrl={afterSignOutUrl}>
			<ClerkTokenBridge />
			<ClerkAuthStateBoundary>
				{children}
			</ClerkAuthStateBoundary>
		</ClerkProvider>
	);
}

function ClerkTokenBridge() {
	const { getToken, isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (!isLoaded || isSignedIn !== true) {
			clearAuthTokenProvider();
			return;
		}

		setAuthTokenProvider(async () => {
			return await getToken();
		});

		return () => {
			clearAuthTokenProvider();
		};
	}, [getToken, isLoaded, isSignedIn]);

	return null;
}

function ClerkAuthStateBoundary({ children }) {
	const { isLoaded, isSignedIn, userId } = useAuth();
	let authState;

	if (!isLoaded) {
		authState = LOADING_APP_AUTH_STATE;
	}

	else if (isSignedIn !== true) {
		authState = SIGNED_OUT_APP_AUTH_STATE;
	}

	else {
		authState = createSignedInAppAuthState(userId);
	}

	return (
		<AppAuthProvider authState={authState}>
			{children}
		</AppAuthProvider>
	);
}
