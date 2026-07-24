// src/ui/view/components/Sidebar/SidebarBrand.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import SubjectIcon from "../SubjectIcon.jsx";

export default function SidebarBrand({ subjectSwitcher, onSelectSubject }) {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useLanguage();
	const currentSubject = subjectSwitcher.currentSubject;
	const currentSubjectId = currentSubject === null ? null : currentSubject.id;
	const currentSubjectIcon = currentSubject === null ? "clipboard" : currentSubject.icon;

	const toggleOpen = () => {
		if (!subjectSwitcher.canOpen) {
			return;
		}

		setIsOpen((previousIsOpen) => !previousIsOpen);
	};

	const handleSelectSubject = (subjectId) => {
		onSelectSubject(subjectId);
		setIsOpen(false);
	};

	return (
		<div className="sidebar-brand-wrapper">
			<button type="button" className={isOpen ? "sidebar-brand sidebar-brand-open" : "sidebar-brand"} onClick={toggleOpen} aria-expanded={isOpen} disabled={!subjectSwitcher.canOpen}>
				<div className="sidebar-brand-icon">
					<SubjectIcon icon={currentSubjectIcon} />
				</div>

				<div className="sidebar-brand-copy">
					{currentSubject === null ? (
						<p className="sidebar-brand-title">{subjectSwitcher.label}</p>
					) : (
						<>
							<p className="sidebar-brand-title">{currentSubject.code}</p>
							<p className="sidebar-brand-subtitle">{currentSubject.name}</p>
						</>
					)}
				</div>

				<ChevronDown className="sidebar-brand-chevron" />
			</button>

			{isOpen && (
				<div className="sidebar-subject-menu">
					<p className="sidebar-subject-menu-label">{t.sidebarSubjectMenuLabel}</p>

					<div className="sidebar-subject-list">
						{subjectSwitcher.subjects.map((subject) => {
							const isSelected = subject.id === currentSubjectId;

							return (
								<button key={subject.id} type="button" className={isSelected ? "sidebar-subject-item sidebar-subject-item-selected" : "sidebar-subject-item"} onClick={() => handleSelectSubject(subject.id)}>
									<div className="sidebar-subject-item-icon">
										<SubjectIcon icon={subject.icon} />
									</div>

									<div className="sidebar-subject-item-copy">
										<p className="sidebar-subject-item-code">{subject.code}</p>
										<p className="sidebar-subject-item-name">{subject.name}</p>
									</div>

									{isSelected && (
										<span className="sidebar-subject-selected-indicator">
											<Check size={15} />
										</span>
									)}
								</button>
							);
						})}
					</div>

					<button type="button" className="sidebar-subject-collapse" onClick={() => setIsOpen(false)} aria-label={t.sidebarCloseSubjectMenu}>
						<ChevronUp size={20} aria-hidden="true" focusable="false" />
					</button>
				</div>
			)}
		</div>
	);
}
