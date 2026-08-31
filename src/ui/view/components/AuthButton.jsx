// src/ui/view/components/AuthButton.jsx
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useAppAuth } from "../../../auth/AppAuthContext.jsx";
import { APP_AUTH_STATUS } from "../../../auth/AppAuthState.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

export default function AuthButton() {
	const { t } = useLanguage();
	const authState = useAppAuth();

	if (authState.status === APP_AUTH_STATUS.DISABLED) {
		return <UnconfiguredAuthButton t={t} />;
	}

	if (authState.status === APP_AUTH_STATUS.LOADING) {
		return null;
	}

	if (authState.status === APP_AUTH_STATUS.SIGNED_OUT) {
		return <SignedOutAuthButton t={t} />;
	}

	if (authState.status === APP_AUTH_STATUS.SIGNED_IN) {
		return <SignedInAuthButton t={t} />;
	}

	throw new Error(`AuthButton does not support auth status '${String(authState.status)}'`);
}

function UnconfiguredAuthButton({ t }) {
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

function SignedOutAuthButton({ t }) {
	return (
		<SignInButton mode="modal">
			<button type="button" className="sidebar-user-card sidebar-user-card-button">
				<div className="sidebar-user-avatar">?</div>

				<div className="sidebar-user-copy">
					<p className="sidebar-user-name">{t.authSignedOutLabel}</p>
					<p className="sidebar-user-email">{t.authSignInLabel}</p>
				</div>
			</button>
		</SignInButton>
	);
}

function SignedInAuthButton({ t }) {
	const { user } = useUser();
	const userInitial = user?.firstName?.[0]
		?? user?.username?.[0]
		?? user?.primaryEmailAddress?.emailAddress?.[0]
		?? "?";

	return (
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
	);
}

function UserAvatar({ imageUrl, fallback }) {
	if (imageUrl) {
		return (
			<div className="sidebar-user-avatar sidebar-user-avatar-image">
				<img src={imageUrl} alt="" referrerPolicy="no-referrer" />
			</div>
		);
	}

	return <div className="sidebar-user-avatar">{fallback}</div>;
}
