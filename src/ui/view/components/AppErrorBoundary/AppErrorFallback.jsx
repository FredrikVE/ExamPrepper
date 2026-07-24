import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function AppErrorFallback({ onRecover }) {
	const { t } = useLanguage();

	return (
		<main className="app-error-fallback">
			<div className="app-error-fallback__card">
				<h1 className="app-error-fallback__title">{t.appErrorTitle}</h1>
				<p className="app-error-fallback__message">{t.appErrorMessage}</p>
				<button type="button" className="app-error-fallback__button" onClick={onRecover}>
					{t.appErrorReloadLabel}
				</button>
			</div>
		</main>
	);
}
