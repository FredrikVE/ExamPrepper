// src/auth/AuthTokenBridge.jsx
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { setAuthTokenProvider } from "./AuthTokenProvider.js";

export default function AuthTokenBridge() {
	const { getToken, isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (!isLoaded || !isSignedIn) {
			setAuthTokenProvider(null);
			return;
		}

		setAuthTokenProvider(async () => await getToken());

		return () => setAuthTokenProvider(null);
	}, [getToken, isLoaded, isSignedIn]);

	return null;
}
