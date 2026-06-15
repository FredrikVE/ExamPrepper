// src/auth/ClerkAppProvider.jsx
import { ClerkProvider } from "@clerk/clerk-react";
import AuthTokenBridge from "./AuthTokenBridge.jsx";

export default function ClerkAppProvider({ children }) {
	const publishableKey = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY;
	const afterSignOutUrl = import.meta.env.BASE_URL;

	if (!publishableKey) {
		return children;
	}

	return (
		<ClerkProvider
			publishableKey={publishableKey}
			afterSignOutUrl={afterSignOutUrl}
		>
			<AuthTokenBridge />
			{children}
		</ClerkProvider>
	);
}