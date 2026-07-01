// src/ui/view/components/Sidebar/AppNavigation.jsx
import DesktopSideBar from "./DesktopSideBar.jsx";
import MobileDropDownTopBar from "./MobileDropDownTopBar.jsx";

export default function AppNavigation(props) {
	return (
		<>
			<DesktopSideBar
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
				settingsOpen={props.settingsOpen}
				onOpenSettings={props.onOpenSettings}
				showSubjectSwitcher={props.showSubjectSwitcher}
				hasSelectedSubject={props.hasSelectedSubject}
				subjects={props.subjects}
				selectedSubject={props.selectedSubject}
				onSelectSubject={props.onSelectSubject}
				onShowAllSubjects={props.onShowAllSubjects}
			/>

			<MobileDropDownTopBar
				activeScreen={props.activeScreen}
				onChangeScreen={props.onChangeScreen}
				settingsOpen={props.settingsOpen}
				onOpenSettings={props.onOpenSettings}
				onCloseSettings={props.onCloseSettings}
				onBackFromSettings={props.onBackFromSettings}
				isMenuOpen={props.isMenuOpen}
				onToggleMenu={props.onToggleMenu}
				onCloseMenu={props.onCloseMenu}
				isSubjectPickerOpen={props.isSubjectPickerOpen}
				onToggleSubjectPicker={props.onToggleSubjectPicker}
				onCloseSubjectPicker={props.onCloseSubjectPicker}
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
