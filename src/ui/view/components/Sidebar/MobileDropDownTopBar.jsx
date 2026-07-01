// src/ui/view/components/Sidebar/MobileDropDownTopBar.jsx
import { ChevronLeft, Menu } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { NAV_SCREENS } from "../../../../navigation/navGraph.js";
import { SubjectPickerButton, SubjectPickerDropdown } from "./MobileSubjectPicker.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import MobileExamSubmitAction from "./MobileExamSubmitAction.jsx";
import MobileExamSubmitConfirmation from "./MobileExamSubmitConfirmation.jsx";
import SettingsPanelContent from "../Settings/SettingsPanelContent.jsx";
import useMobileMenuEscapeKey from "./useMobileMenuEscapeKey.js";
import useSubmitConfirmFocus from "./useSubmitConfirmFocus.js";

function resolveCurrentSubject(subjects, selectedSubject) {
	return selectedSubject ??
		subjects[0] ?? {
			id: "in5431",
			code: "IN5431",
			name: "Exam Emulator",
			icon: "clipboard",
		};
}

function MobileDropdownContent(props) {
	const {
		submitActionButtonRef,
		submitConfirmCancelButtonRef
	} = useSubmitConfirmFocus(props.isExamSubmitConfirmOpen);

	const showExamSubmitAction = props.isExamWorkMode && props.showExamSubmitAction;

	if (props.settingsOpen) {
		return (
			<div className="mobile-dropdown-settings-content">
				<SettingsPanelContent />
			</div>
		);
	}

	const contentClassNames = [
		"mobile-dropdown-content",
		props.isExamSubmitConfirmOpen ? "mobile-dropdown-content-submit-confirm-open" : null
	].filter(Boolean);

	return (
		<>
			<div
				className={contentClassNames.join(" ")}
				aria-hidden={props.isExamSubmitConfirmOpen ? "true" : undefined}
			>
				{props.isSubjectPickerOpen && (
					<SubjectPickerDropdown
						subjects={props.subjects}
						currentSubjectId={props.currentSubject.id}
						onSelectSubject={props.onSelectSubject}
						onClose={props.onCloseSubjectPicker}
					/>
				)}

				<SidebarNavigation
					section="primary"
					activeScreen={props.activeScreen}
					onChangeScreen={props.onChangeScreen}
					hasSelectedSubject={props.hasSelectedSubject}
				/>

				<div className="mobile-dropdown-spacer" />

				<SidebarNavigation
					section="secondary"
					activeScreen={props.activeScreen}
					onChangeScreen={props.onChangeScreen}
					hasSelectedSubject={props.hasSelectedSubject}
				/>

				<SidebarSettingsButton
					settingsOpen={props.settingsOpen}
					onOpenSettings={props.onOpenSettings}
				/>

				{showExamSubmitAction && (
					<MobileExamSubmitAction
						label={props.examSubmitLabel}
						onOpenSubmitConfirm={props.onOpenExamSubmitConfirm}
						buttonRef={submitActionButtonRef}
					/>
				)}

				<SidebarUserCard />

				<SidebarCloseButton onCloseMenu={props.onCloseMenu} />
			</div>

			{props.isExamSubmitConfirmOpen && (
				<MobileExamSubmitConfirmation
					title={props.examSubmitConfirmTitle}
					body={props.examSubmitConfirmBody}
					cancelLabel={props.examSubmitConfirmCancelLabel}
					confirmLabel={props.examSubmitConfirmConfirmLabel}
					onCancel={props.onCloseExamSubmitConfirm}
					onConfirm={props.onConfirmExamSubmit}
					cancelButtonRef={submitConfirmCancelButtonRef}
				/>
			)}
		</>
	);
}

export default function MobileDropDownTopBar(props) {
	const { t } = useLanguage();

	const isFlipcardsScreen = props.activeScreen === NAV_SCREENS.FLIPCARDS;
	const shouldShowSettingsTopbar = props.isMenuOpen && props.settingsOpen;
	const showPickerButton = props.isMenuOpen && props.showSubjectSwitcher && !shouldShowSettingsTopbar;
	const showFlipcardsDeckPill = isFlipcardsScreen && !props.isMenuOpen && props.showSubjectSwitcher && !shouldShowSettingsTopbar;
	const shouldShowExamWorkStatus = props.isExamWorkMode && !props.isMenuOpen;
	const showExamSubmitConfirm = props.isExamWorkMode && props.isExamSubmitConfirmOpen;
	const showTopbarBackButton = props.showBackButton || shouldShowSettingsTopbar;

	useMobileMenuEscapeKey({
		isMenuOpen: props.isMenuOpen,
		onCloseMenu: props.onCloseMenu,
		isSettingsOpen: props.settingsOpen,
		onCloseSettings: props.onCloseSettings,
		isSubmitConfirmOpen: showExamSubmitConfirm,
		onCloseSubmitConfirm: props.onCloseExamSubmitConfirm,
		isSubjectPickerOpen: props.isSubjectPickerOpen,
		onCloseSubjectPicker: props.onCloseSubjectPicker
	});

	const topbarClassNames = [
		"mobile-topbar",
		showTopbarBackButton ? "mobile-topbar-with-back" : null,
		isFlipcardsScreen ? "mobile-topbar-flipcards" : null,
		props.isMenuOpen ? "mobile-topbar-menu-open" : null,
		shouldShowSettingsTopbar ? "mobile-topbar-settings-open" : null
	].filter(Boolean);

	const dropdownClassNames = [
		"mobile-dropdown",
		props.isMenuOpen ? "mobile-dropdown-open" : null,
		showPickerButton ? "mobile-dropdown-with-picker" : null,
		showExamSubmitConfirm ? "mobile-dropdown-submit-confirm-open" : null
	].filter(Boolean);

	const backdropClassNames = [
		"mobile-dropdown-backdrop",
		props.isMenuOpen ? "mobile-dropdown-backdrop-visible" : null,
		props.isSubjectPickerOpen ? "mobile-dropdown-backdrop-picker-open" : null,
		showExamSubmitConfirm ? "mobile-dropdown-backdrop-submit-confirm-open" : null
	].filter(Boolean);

	const currentSubject = resolveCurrentSubject(props.subjects, props.selectedSubject);
	const topbarNavigationLabel = props.navigationLabel ?? t.sidebarMobileNavigation;
	const topbarBackLabel = shouldShowSettingsTopbar
		? t.settingsBackToMenu
		: props.backLabel ?? t.sidebarBack;
	const handleTopbarBack = shouldShowSettingsTopbar
		? props.onBackFromSettings
		: props.onBack;

	const handleMenuButtonClick = shouldShowSettingsTopbar
		? props.onCloseMenu
		: props.onToggleMenu;

	const handleFlipcardsDeckPillClick = () => {
		if (!props.isMenuOpen) {
			props.onToggleMenu();
		}

		if (!props.isSubjectPickerOpen) {
			props.onToggleSubjectPicker();
		}
	};

	const menuButtonLabel = props.isMenuOpen
		? t.sidebarCloseNavigation
		: t.sidebarOpenNavigation;

	return (
		<>
			<header
				className={topbarClassNames.join(" ")}
				aria-label={topbarNavigationLabel}
			>
				{showTopbarBackButton && (
					<button
						type="button"
						className="mobile-topbar-back-button"
						onClick={handleTopbarBack}
						aria-label={topbarBackLabel}
					>
						<ChevronLeft className="mobile-topbar-back-icon" />
					</button>
				)}

				<button
					type="button"
					className="mobile-topbar-menu-button"
					onClick={handleMenuButtonClick}
					aria-label={menuButtonLabel}
					aria-controls="app-navigation-menu"
					aria-expanded={props.isMenuOpen}
				>
					<Menu className="mobile-topbar-menu-icon" />
				</button>

				{shouldShowSettingsTopbar && (
					<h2 className="mobile-topbar-settings-title">
						{t.settingsTitle}
					</h2>
				)}

				{shouldShowExamWorkStatus && (
					<p className="mobile-topbar-exam-work-status">
						{props.examWorkStatusLabel}
					</p>
				)}

				{showFlipcardsDeckPill && (
					<div className="mobile-topbar-subject-picker mobile-topbar-subject-picker-flipcards">
						<SubjectPickerButton
							currentSubject={currentSubject}
							isOpen={props.isSubjectPickerOpen}
							onToggle={handleFlipcardsDeckPillClick}
						/>
					</div>
				)}

				{showPickerButton && (
					<div className="mobile-topbar-subject-picker">
						<SubjectPickerButton
							currentSubject={currentSubject}
							isOpen={props.isSubjectPickerOpen}
							onToggle={props.onToggleSubjectPicker}
						/>
					</div>
				)}
			</header>

			<button
				type="button"
				className={backdropClassNames.join(" ")}
				onClick={props.onCloseMenu}
				aria-label={t.sidebarCloseNavigation}
				aria-hidden={!props.isMenuOpen}
				tabIndex={props.isMenuOpen ? 0 : -1}
			/>

			<aside
				id="app-navigation-menu"
				className={dropdownClassNames.join(" ")}
				aria-label={t.sidebarNavigationMenu}
				aria-hidden={!props.isMenuOpen}
			>
				<MobileDropdownContent
					activeScreen={props.activeScreen}
					onChangeScreen={props.onChangeScreen}
					settingsOpen={props.settingsOpen}
					onOpenSettings={props.onOpenSettings}
					onCloseMenu={props.onCloseMenu}
					onBackFromSettings={props.onBackFromSettings}
					subjects={props.subjects}
					currentSubject={currentSubject}
					hasSelectedSubject={props.hasSelectedSubject}
					isSubjectPickerOpen={props.isSubjectPickerOpen}
					onCloseSubjectPicker={props.onCloseSubjectPicker}
					onSelectSubject={props.onSelectSubject}
					onShowAllSubjects={props.onShowAllSubjects}
					isExamWorkMode={props.isExamWorkMode}
					showExamSubmitAction={props.showExamSubmitAction}
					examSubmitLabel={props.examSubmitLabel}
					onOpenExamSubmitConfirm={props.onOpenExamSubmitConfirm}
					isExamSubmitConfirmOpen={showExamSubmitConfirm}
					examSubmitConfirmTitle={props.examSubmitConfirmTitle}
					examSubmitConfirmBody={props.examSubmitConfirmBody}
					examSubmitConfirmCancelLabel={props.examSubmitConfirmCancelLabel}
					examSubmitConfirmConfirmLabel={props.examSubmitConfirmConfirmLabel}
					onCloseExamSubmitConfirm={props.onCloseExamSubmitConfirm}
					onConfirmExamSubmit={props.onConfirmExamSubmit}
				/>
			</aside>
		</>
	);
}
