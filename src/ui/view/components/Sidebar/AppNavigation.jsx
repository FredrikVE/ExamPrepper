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
				subjectSwitcher={props.subjectSwitcher}
				onSelectSubject={props.onSelectSubject}
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
				backContract={props.backContract}
				subjectSwitcher={props.subjectSwitcher}
				onSelectSubject={props.onSelectSubject}
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
