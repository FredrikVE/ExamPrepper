// src/ui/view/components/Sidebar/MobileDropDownTopBar.jsx
import { ChevronLeft, Menu } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { NAV_SCREENS } from "../../../../navigation/navigation.js";
import { SubjectPickerButton, SubjectPickerDropdown } from "./MobileSubjectPicker.jsx";
import SidebarNavigation from "./SidebarNavigation.jsx";
import SidebarSettingsButton from "./SidebarSettingsButton.jsx";
import SidebarUserCard from "./SidebarUserCard.jsx";
import SidebarCloseButton from "./SidebarCloseButton.jsx";
import MobileExamSubmitAction from "./MobileExamSubmitAction.jsx";
import MobileExamSubmitConfirmation from "./MobileExamSubmitConfirmation.jsx";
import ProgressBar from "../Shared/ProgressBar/ProgressBar.jsx";
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

	if (props.isSettingsPresentationOpen) {
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
				{props.isMobileSubjectPickerOpen && (
					<SubjectPickerDropdown
						subjects={props.subjects}
						currentSubjectId={props.currentSubject.id}
						onSelectSubject={props.onSelectSubject}
						onClose={props.onCloseMobileSubjectPicker}
					/>
				)}

				<SidebarNavigation
					section="primary"
					activeScreen={props.activeScreen}
					onChangeScreen={props.onChangeScreen}
				/>

				<div className="mobile-dropdown-spacer" />

				<SidebarNavigation
					section="secondary"
					activeScreen={props.activeScreen}
					onChangeScreen={props.onChangeScreen}
				/>

				<SidebarSettingsButton
					isSettingsPresentationOpen={props.isSettingsPresentationOpen}
					onOpenSettingsPresentation={props.onOpenSettingsPresentation}
				/>

				{showExamSubmitAction && (
					<MobileExamSubmitAction
						label={props.examSubmitLabel}
						onOpenSubmitConfirm={props.onOpenExamSubmitConfirm}
						buttonRef={submitActionButtonRef}
					/>
				)}

				<SidebarUserCard />

				<SidebarCloseButton onCloseMobileDropDownTopBarMenu={props.onCloseMobileDropDownTopBarMenu} />
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
	const isMatchCardsScreen = props.activeScreen === NAV_SCREENS.MATCHCARDS;
	const usesTransparentPracticeTopbar = isFlipcardsScreen || isMatchCardsScreen;
	const shouldShowSettingsTopbar = props.isMobileDropDownTopBarMenuOpen && props.isSettingsPresentationOpen;
	const showPickerButton = props.isMobileDropDownTopBarMenuOpen && props.showSubjectSwitcher && !shouldShowSettingsTopbar;
	const showFlipcardsDeckPill = isFlipcardsScreen && !props.isMobileDropDownTopBarMenuOpen && props.showSubjectSwitcher && !shouldShowSettingsTopbar;
	const shouldShowExamWorkStatus = props.isExamWorkMode && !props.isMobileDropDownTopBarMenuOpen && !props.progressBarModel;
	const showExamSubmitConfirm = props.isExamWorkMode && props.isExamSubmitConfirmOpen;
	const showTopbarBackButton = props.showBackButton || shouldShowSettingsTopbar;
	const showMobileProgressBar = Boolean(props.progressBarModel) && !props.isMobileDropDownTopBarMenuOpen && !shouldShowSettingsTopbar;

	useMobileMenuEscapeKey({
		isMobileDropDownTopBarMenuOpen: props.isMobileDropDownTopBarMenuOpen,
		onCloseMobileDropDownTopBarMenu: props.onCloseMobileDropDownTopBarMenu,
		isSettingsPresentationOpen: props.isSettingsPresentationOpen,
		onCloseSettingsPresentation: props.onCloseSettingsPresentation,
		isSubmitConfirmOpen: showExamSubmitConfirm,
		onCloseSubmitConfirm: props.onCloseExamSubmitConfirm,
		isMobileSubjectPickerOpen: props.isMobileSubjectPickerOpen,
		onCloseMobileSubjectPicker: props.onCloseMobileSubjectPicker
	});

	const topbarClassNames = [
		"mobile-topbar",
		showTopbarBackButton ? "mobile-topbar-with-back" : null,
		usesTransparentPracticeTopbar ? "mobile-topbar-transparent-practice" : null,
		props.isMobileDropDownTopBarMenuOpen ? "mobile-topbar-menu-open" : null,
		shouldShowSettingsTopbar ? "mobile-topbar-settings-open" : null
	].filter(Boolean);

	const dropdownClassNames = [
		"mobile-dropdown",
		props.isMobileDropDownTopBarMenuOpen ? "mobile-dropdown-open" : null,
		showPickerButton ? "mobile-dropdown-with-picker" : null,
		showExamSubmitConfirm ? "mobile-dropdown-submit-confirm-open" : null
	].filter(Boolean);

	const backdropClassNames = [
		"mobile-dropdown-backdrop",
		props.isMobileDropDownTopBarMenuOpen ? "mobile-dropdown-backdrop-visible" : null,
		props.isMobileSubjectPickerOpen ? "mobile-dropdown-backdrop-picker-open" : null,
		showExamSubmitConfirm ? "mobile-dropdown-backdrop-submit-confirm-open" : null
	].filter(Boolean);

	const currentSubject = resolveCurrentSubject(props.subjects, props.selectedSubject);
	const topbarNavigationLabel = props.navigationLabel ?? t.sidebarMobileNavigation;
	const topbarBackLabel = shouldShowSettingsTopbar
		? t.settingsBackToMenu
		: props.backLabel ?? t.sidebarBack;
	const handleTopbarBack = shouldShowSettingsTopbar
		? props.onBackFromSettingsToMobileDropDownTopBarMenu
		: props.onBack;

	const handleMenuButtonClick = shouldShowSettingsTopbar
		? props.onCloseMobileDropDownTopBarMenu
		: props.onToggleMobileDropDownTopBarMenu;

	const handleFlipcardsDeckPillClick = () => {
		if (!props.isMobileDropDownTopBarMenuOpen) {
			props.onToggleMobileDropDownTopBarMenu();
		}

		if (!props.isMobileSubjectPickerOpen) {
			props.onToggleMobileSubjectPicker();
		}
	};

	const menuButtonLabel = props.isMobileDropDownTopBarMenuOpen
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
					aria-expanded={props.isMobileDropDownTopBarMenuOpen}
				>
					<Menu className="mobile-topbar-menu-icon" />
				</button>

				{showMobileProgressBar && (
					<div className="mobile-topbar-progress">
						<ProgressBar model={props.progressBarModel} />
					</div>
				)}

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
							isOpen={props.isMobileSubjectPickerOpen}
							onToggle={handleFlipcardsDeckPillClick}
						/>
					</div>
				)}

				{showPickerButton && (
					<div className="mobile-topbar-subject-picker">
						<SubjectPickerButton
							currentSubject={currentSubject}
							isOpen={props.isMobileSubjectPickerOpen}
							onToggle={props.onToggleMobileSubjectPicker}
						/>
					</div>
				)}
			</header>

			<button
				type="button"
				className={backdropClassNames.join(" ")}
				onClick={props.onCloseMobileDropDownTopBarMenu}
				aria-label={t.sidebarCloseNavigation}
				aria-hidden={!props.isMobileDropDownTopBarMenuOpen}
				tabIndex={props.isMobileDropDownTopBarMenuOpen ? 0 : -1}
			/>

			<aside
				id="app-navigation-menu"
				className={dropdownClassNames.join(" ")}
				aria-label={t.sidebarNavigationMenu}
				aria-hidden={!props.isMobileDropDownTopBarMenuOpen}
			>
				<MobileDropdownContent
					activeScreen={props.activeScreen}
					onChangeScreen={props.onChangeScreen}
					isSettingsPresentationOpen={props.isSettingsPresentationOpen}
					onOpenSettingsPresentation={props.onOpenSettingsPresentation}
					onCloseMobileDropDownTopBarMenu={props.onCloseMobileDropDownTopBarMenu}
					onBackFromSettingsToMobileDropDownTopBarMenu={props.onBackFromSettingsToMobileDropDownTopBarMenu}
					subjects={props.subjects}
					currentSubject={currentSubject}
					hasSelectedSubject={props.hasSelectedSubject}
					isMobileSubjectPickerOpen={props.isMobileSubjectPickerOpen}
					onCloseMobileSubjectPicker={props.onCloseMobileSubjectPicker}
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
