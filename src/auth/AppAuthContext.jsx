// src/auth/AppAuthContext.jsx
import { createContext, useContext } from "react";
import { assertAppAuthState } from "./AppAuthState.js";

const AppAuthContext = createContext(null);

export function AppAuthProvider({ authState, children }) {
	assertAppAuthState(authState);

	return (
		<AppAuthContext.Provider value={authState}>
			{children}
		</AppAuthContext.Provider>
	);
}

export function useAppAuth() {
	const authState = useContext(AppAuthContext);

	if (authState === null) {
		throw new Error("useAppAuth requires AppAuthProvider");
	}

	return authState;
}
