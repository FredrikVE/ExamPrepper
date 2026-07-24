// src/ui/view/components/AuthButton.jsx
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

function UserAvatar(props) {
	if (props.imageUrl) {
		return (
			<div className="sidebar-user-avatar sidebar-user-avatar-image">
				<img src={props.imageUrl} alt="" referrerPolicy="no-referrer" />
			</div>
		);
	}

	return <div className="sidebar-user-avatar">{props.fallback}</div>;
}

export default function AuthButton() {
	const { t } = useLanguage();
	const hasClerkKey = Boolean(import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY);
	const { user } = useUser();
	const userInitial = user?.firstName?.[0]
		?? user?.username?.[0]
		?? user?.primaryEmailAddress?.emailAddress?.[0]
		?? "?";

	if (!hasClerkKey) {
		return (
			<div className="sidebar-user-card">
				<div className="sidebar-user-avatar">?</div>

				<div className="sidebar-user-copy">
					<p className="sidebar-user-name">{t.authSignedOutLabel}</p>
					<p className="sidebar-user-email">{t.authNotConfiguredMessage}</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<SignedOut>
				<SignInButton mode="modal">
					<button type="button" className="sidebar-user-card sidebar-user-card-button">
						<div className="sidebar-user-avatar">?</div>

						<div className="sidebar-user-copy">
							<p className="sidebar-user-name">{t.authSignedOutLabel}</p>
							<p className="sidebar-user-email">{t.authSignInLabel}</p>
						</div>
					</button>
				</SignInButton>
			</SignedOut>

			<SignedIn>
				<div className="sidebar-user-card sidebar-user-card-click-target">
					<UserAvatar imageUrl={user?.imageUrl} fallback={userInitial.toUpperCase()} />

					<div className="sidebar-user-copy">
						<p className="sidebar-user-name">
							{user?.firstName ? t.authGreeting(user.firstName) : t.authSignedInLabel}
						</p>
					</div>

					<div className="sidebar-user-clerk-menu-trigger">
						<UserButton />
					</div>
				</div>
			</SignedIn>
		</>
	);
}
