// src/auth/AuthTokenBridge.jsx
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { setAuthTokenProvider } from "./AuthTokenProvider.js";

export default function AuthTokenBridge() {
	const { getToken } = useAuth();

	useEffect(() => {
		setAuthTokenProvider(async () => await getToken());

		return () => setAuthTokenProvider(null);
	}, [getToken]);

	return null;
}
