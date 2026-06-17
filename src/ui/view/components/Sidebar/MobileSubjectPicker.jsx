// src/ui/view/components/Sidebar/MobileSubjectPicker.jsx
import { ChevronDown, ChevronUp, Check, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SubjectIcon from "../SubjectIcon.jsx";

function SubjectPickerButton({ currentSubject, isOpen, onToggle }) {
	const buttonClassName = isOpen
		? "mobile-subject-picker-button mobile-subject-picker-button-open"
		: "mobile-subject-picker-button";

	const Chevron = isOpen ? ChevronUp : ChevronDown;

	return (
		<button
			type="button"
			className={buttonClassName}
			onClick={onToggle}
			aria-expanded={isOpen}
			aria-controls="mobile-subject-picker-list"
		>
			<div className="mobile-subject-picker-icon">
				<SubjectIcon icon={currentSubject.icon} />
			</div>

			<div className="mobile-subject-picker-copy">
				<p className="mobile-subject-picker-code">{currentSubject.code}</p>
				<p className="mobile-subject-picker-name">
					{currentSubject.name ?? "Exam Emulator"}
				</p>
			</div>

			<Chevron className="mobile-subject-picker-chevron" />
		</button>
	);
}

function SubjectPickerList({
	subjects,
	currentSubjectId,
	onSelectSubject,
	onShowAllSubjects,
	label
}) {
	const { t } = useLanguage();

	return (
		<div
			id="mobile-subject-picker-list"
			className="mobile-subject-picker-dropdown"
			role="listbox"
			aria-label={label}
		>
			{subjects.map((subject) => {
				const isSelected = subject.id === currentSubjectId;

				return (
					<button
						key={subject.id}
						type="button"
						role="option"
						className={
							isSelected
								? "mobile-subject-picker-item mobile-subject-picker-item-selected"
								: "mobile-subject-picker-item"
						}
						aria-selected={isSelected}
						onClick={() => onSelectSubject(subject.id)}
					>
						<div className="mobile-subject-picker-item-icon">
							<SubjectIcon icon={subject.icon} />
						</div>

						<div className="mobile-subject-picker-item-copy">
							<p className="mobile-subject-picker-item-code">
								{subject.code}
							</p>
							<p className="mobile-subject-picker-item-name">
								{subject.name}
							</p>
						</div>

						{isSelected && (
							<span className="mobile-subject-picker-check">
								<Check size={15} />
							</span>
						)}
					</button>
				);
			})}

			<button
				type="button"
				className="mobile-subject-picker-see-all"
				onClick={onShowAllSubjects}
			>
				<span>{t.sidebarSeeAllSubjects}</span>
				<ChevronRight size={18} />
			</button>
		</div>
	);
}

export default function MobileSubjectPicker({
	subjects,
	selectedSubject,
	isOpen,
	onToggle,
	onClose,
	onSelectSubject,
	onShowAllSubjects
}) {
	const { t } = useLanguage();

	const currentSubject = selectedSubject ??
		subjects[0] ?? {
			id: "in5431",
			code: "IN5431",
			name: "Exam Emulator",
			icon: "clipboard",
		};

	const handleScrimClick = () => {
		onClose();
	};

	return (
		<div className="mobile-subject-picker">
			<SubjectPickerButton
				currentSubject={currentSubject}
				isOpen={isOpen}
				onToggle={onToggle}
			/>

			{isOpen && (
				<>
					<button
						type="button"
						className="mobile-subject-picker-scrim"
						onClick={handleScrimClick}
						aria-label={t.settingsClose}
						tabIndex={-1}
					/>

					<SubjectPickerList
						subjects={subjects}
						currentSubjectId={currentSubject.id}
						onSelectSubject={onSelectSubject}
						onShowAllSubjects={onShowAllSubjects}
						label={t.sidebarSubjectMenuLabel}
					/>
				</>
			)}
		</div>
	);
}
