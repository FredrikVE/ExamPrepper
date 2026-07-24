import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SubjectIcon from "../SubjectIcon.jsx";

export function SubjectPickerButton({ subjectSwitcher, isOpen, onToggle }) {
	const buttonClassName = isOpen ? "mobile-subject-picker-button mobile-subject-picker-button-open" : "mobile-subject-picker-button";
	const Chevron = isOpen ? ChevronUp : ChevronDown;
	const currentSubject = subjectSwitcher.currentSubject;
	const currentSubjectIcon = currentSubject === null ? "clipboard" : currentSubject.icon;

	return (
		<button type="button" className={buttonClassName} onClick={onToggle} aria-expanded={isOpen} aria-controls="mobile-subject-picker-list" disabled={!subjectSwitcher.canOpen}>
			<div className="mobile-subject-picker-icon">
				<SubjectIcon icon={currentSubjectIcon} />
			</div>

			<div className="mobile-subject-picker-copy">
				{currentSubject === null ? (
					<p className="mobile-subject-picker-code">{subjectSwitcher.label}</p>
				) : (
					<>
						<p className="mobile-subject-picker-code">{currentSubject.code}</p>
						<p className="mobile-subject-picker-name">{currentSubject.name}</p>
					</>
				)}
			</div>

			<Chevron className="mobile-subject-picker-chevron" />
		</button>
	);
}

export function SubjectPickerDropdown({ subjectSwitcher, onSelectSubject, onClose }) {
	const { t } = useLanguage();
	const currentSubjectId = subjectSwitcher.currentSubject === null ? null : subjectSwitcher.currentSubject.id;

	return (
		<>
			<button type="button" className="mobile-subject-picker-scrim" onClick={onClose} aria-label={t.settingsClose} tabIndex={-1} />

			<div id="mobile-subject-picker-list" className="mobile-subject-picker-dropdown" role="listbox" aria-label={t.sidebarSubjectMenuLabel}>
				{subjectSwitcher.subjects.map((subject) => {
					const isSelected = subject.id === currentSubjectId;

					return (
						<button key={subject.id} type="button" role="option" className={isSelected ? "mobile-subject-picker-item mobile-subject-picker-item-selected" : "mobile-subject-picker-item"} aria-selected={isSelected} onClick={() => onSelectSubject(subject.id)}>
							<div className="mobile-subject-picker-item-icon">
								<SubjectIcon icon={subject.icon} />
							</div>

							<div className="mobile-subject-picker-item-copy">
								<p className="mobile-subject-picker-item-code">{subject.code}</p>
								<p className="mobile-subject-picker-item-name">{subject.name}</p>
							</div>

							{isSelected && (
								<span className="mobile-subject-picker-check">
									<Check size={15} />
								</span>
							)}
						</button>
					);
				})}

				<button type="button" className="mobile-subject-picker-collapse" onClick={onClose} aria-label={t.sidebarCloseSubjectMenu}>
					<ChevronUp size={20} aria-hidden="true" focusable="false" />
				</button>
			</div>
		</>
	);
}
