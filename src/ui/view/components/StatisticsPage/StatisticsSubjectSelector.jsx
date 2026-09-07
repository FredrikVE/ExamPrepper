// src/ui/view/components/StatisticsPage/StatisticsSubjectSelector.jsx
import { useRef, useState } from "react";
import { BookOpen, Check, ChevronDown } from "lucide-react";

export default function StatisticsSubjectSelector({ model, onSelectSubject }) {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef(null);
	const currentSubject = model.currentSubject;
	const currentSubjectId = currentSubject === null ? null : currentSubject.id;
	const selectorClassName = isOpen ? "statistics-subject-selector statistics-subject-selector-open" : "statistics-subject-selector";

	const toggleOpen = () => {
		if (!model.canOpen) {
			return;
		}

		setIsOpen((previousIsOpen) => !previousIsOpen);
	};

	const close = () => {
		setIsOpen(false);
		triggerRef.current.focus();
	};

	const selectSubject = (subjectId) => {
		onSelectSubject(subjectId);
		setIsOpen(false);
		triggerRef.current.focus();
	};

	const handleKeyDown = (event) => {
		if (event.key === "Escape" && isOpen) {
			event.preventDefault();
			close();
		}
	};

	return (
		<section className={selectorClassName} aria-label={model.menuLabel} onKeyDown={handleKeyDown}>
			<button ref={triggerRef} type="button" className="statistics-subject-selector-trigger" onClick={toggleOpen} aria-expanded={isOpen} aria-controls="statistics-subject-selector-options" disabled={!model.canOpen}>
				<span className="statistics-subject-selector-icon" aria-hidden="true">
					<BookOpen />
				</span>
				<span className="statistics-subject-selector-copy">
					{currentSubject === null ? (
						<strong>{model.label}</strong>
					) : (
						<>
							<strong>{currentSubject.code}</strong>
							<span>{currentSubject.name}</span>
						</>
					)}
				</span>
				<ChevronDown className="statistics-subject-selector-chevron" aria-hidden="true" focusable="false" />
			</button>

			{isOpen && (
				<>
					<button type="button" className="statistics-subject-selector-backdrop" onClick={close} aria-label={model.closeLabel} tabIndex={-1} />
					<div id="statistics-subject-selector-options" className="statistics-subject-selector-options" role="listbox" aria-label={model.menuLabel}>
						{model.subjects.map((subject) => {
							const isSelected = subject.id === currentSubjectId;

							return (
								<button key={subject.id} type="button" role="option" className={isSelected ? "statistics-subject-selector-option statistics-subject-selector-option-selected" : "statistics-subject-selector-option"} aria-selected={isSelected} onClick={() => selectSubject(subject.id)}>
									<span className="statistics-subject-selector-option-icon" aria-hidden="true">
										<BookOpen />
									</span>
									<span className="statistics-subject-selector-option-copy">
										<strong>{subject.code}</strong>
										<span>{subject.name}</span>
									</span>
									{isSelected && <Check className="statistics-subject-selector-check" aria-hidden="true" focusable="false" />}
								</button>
							);
						})}
					</div>
				</>
			)}
		</section>
	);
}
