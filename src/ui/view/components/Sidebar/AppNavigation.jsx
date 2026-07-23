// src/ui/view/components/Sidebar/AppNavigation.jsx
import DesktopSideBar from "./DesktopSideBar.jsx";
import MobileDropDownTopBar from "./MobileDropDownTopBar.jsx";

export default function AppNavigation(props) {
	return (
		<>
			<DesktopSideBar
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
				isSettingsPresentationOpen={props.isSettingsPresentationOpen}
				onOpenSettingsPresentation={props.onOpenSettingsPresentation}
				showSubjectSwitcher={props.showSubjectSwitcher}
				subjects={props.subjects}
				selectedSubject={props.selectedSubject}
				onSelectSubject={props.onSelectSubject}
				onShowAllSubjects={props.onShowAllSubjects}
			/>

			<MobileDropDownTopBar
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
				isSettingsPresentationOpen={props.isSettingsPresentationOpen}
				onOpenSettingsPresentation={props.onOpenSettingsPresentation}
				onCloseSettingsPresentation={props.onCloseSettingsPresentation}
				onBackFromSettingsToMobileDropDownTopBarMenu={props.onBackFromSettingsToMobileDropDownTopBarMenu}
				isMobileDropDownTopBarMenuOpen={props.isMobileDropDownTopBarMenuOpen}
				onToggleMobileDropDownTopBarMenu={props.onToggleMobileDropDownTopBarMenu}
				onCloseMobileDropDownTopBarMenu={props.onCloseMobileDropDownTopBarMenu}
				isMobileSubjectPickerOpen={props.isMobileSubjectPickerOpen}
				onToggleMobileSubjectPicker={props.onToggleMobileSubjectPicker}
				onCloseMobileSubjectPicker={props.onCloseMobileSubjectPicker}
				showSubjectSwitcher={props.showSubjectSwitcher}
				hasSelectedSubject={props.hasSelectedSubject}
				showBackButton={props.showBackButton}
				backLabel={props.backLabel}
				navigationLabel={props.navigationLabel}
				onBack={props.onBack}
				subjects={props.subjects}
				selectedSubject={props.selectedSubject}
				onSelectSubject={props.onSelectSubject}
				onShowAllSubjects={props.onShowAllSubjects}
				isExamWorkMode={props.isExamWorkMode}
				examWorkStatusLabel={props.examWorkStatusLabel}
				showExamSubmitAction={props.showExamSubmitAction}
				progressBarModel={props.progressBarModel}
				examSubmitLabel={props.examSubmitLabel}
				isExamSubmitConfirmOpen={props.isExamSubmitConfirmOpen}
				examSubmitConfirmTitle={props.examSubmitConfirmTitle}
				examSubmitConfirmBody={props.examSubmitConfirmBody}
				examSubmitConfirmCancelLabel={props.examSubmitConfirmCancelLabel}
				examSubmitConfirmConfirmLabel={props.examSubmitConfirmConfirmLabel}
				onOpenExamSubmitConfirm={props.onOpenExamSubmitConfirm}
				onCloseExamSubmitConfirm={props.onCloseExamSubmitConfirm}
				onConfirmExamSubmit={props.onConfirmExamSubmit}
			/>
		</>
	);
}
