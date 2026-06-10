// src/ui/view/components/AuthButton.jsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function AuthButton() {
	const hasClerkKey = Boolean(import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY);

	if (!hasClerkKey) {
		return (
			<div className="sidebar-user-card">
				<div className="sidebar-user-avatar">?</div>

				<div className="sidebar-user-copy">
					<p className="sidebar-user-name">Ikke innlogget</p>
					<p className="sidebar-user-email">Clerk er ikke konfigurert</p>
				</div>
			</div>
		);
	}

	return (
		<div className="sidebar-user-card">
			<SignedOut>
				<div className="sidebar-user-avatar">?</div>

				<div className="sidebar-user-copy">
					<p className="sidebar-user-name">Ikke innlogget</p>
					<SignInButton mode="modal">
						<button type="button" className="sidebar-user-email">
							Logg inn
						</button>
					</SignInButton>
				</div>
			</SignedOut>

			<SignedIn>
				<UserButton />

				<div className="sidebar-user-copy">
					<p className="sidebar-user-name">Innlogget</p>
					<p className="sidebar-user-email">Klar for lagring</p>
				</div>
			</SignedIn>
		</div>
	);
}
