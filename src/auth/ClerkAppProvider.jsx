// src/auth/ClerkAppProvider.jsx
import { ClerkProvider } from "@clerk/clerk-react";
import AuthTokenBridge from "./AuthTokenBridge.jsx";

export default function ClerkAppProvider({ children }) {
	const publishableKey = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY;

	if (!publishableKey) {
		return children;
	}

	return (
		<ClerkProvider publishableKey={publishableKey}>
			<AuthTokenBridge />
			{children}
		</ClerkProvider>
	);
}
