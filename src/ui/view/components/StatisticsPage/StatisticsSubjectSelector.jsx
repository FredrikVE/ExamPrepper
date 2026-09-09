// src/ui/view/components/StatisticsPage/StatisticsSubjectSelector.jsx
import { useRef, useState } from "react";
import { BookOpen, Check, ChevronDown } from "lucide-react";

export default function StatisticsSubjectSelector({ model, onSelectSubject }) {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef(null);
	const currentSubject = model.currentSubject;
	let currentSubjectId = null;
	let selectorClassName = "statistics-subject-selector";
	let triggerCopy = <strong>{model.label}</strong>;

	if (currentSubject !== null) {
		currentSubjectId = currentSubject.id;
		triggerCopy = (
			<>
				<strong>{currentSubject.code}</strong>
				<span>{currentSubject.name}</span>
			</>
		);
	}

	if (isOpen) {
		selectorClassName += " statistics-subject-selector-open";
	}

	const focusTrigger = () => {
		const trigger = triggerRef.current;

		if (trigger !== null) {
			trigger.focus({ preventScroll: true });
		}
	};

	const toggleOpen = () => {
		if (!model.canOpen) {
			return;
		}

		setIsOpen((previousIsOpen) => !previousIsOpen);
	};

	const close = () => {
		setIsOpen(false);
		focusTrigger();
	};

	const selectSubject = (subjectId) => {
		onSelectSubject(subjectId);
		setIsOpen(false);
		focusTrigger();
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
				<span className="statistics-subject-selector-copy">{triggerCopy}</span>
				<ChevronDown className="statistics-subject-selector-chevron" aria-hidden="true" focusable="false" />
			</button>

			{isOpen && (
				<>
					<button type="button" className="statistics-subject-selector-backdrop" onClick={close} aria-label={model.closeLabel} tabIndex={-1} />
					<div id="statistics-subject-selector-options" className="statistics-subject-selector-options" aria-label={model.menuLabel}>
						{model.subjects.map((subject) => {
							const isSelected = subject.id === currentSubjectId;
							let optionClassName = "statistics-subject-selector-option";

							if (isSelected) {
								optionClassName += " statistics-subject-selector-option-selected";
							}

							return (
								<button key={subject.id} type="button" className={optionClassName} aria-pressed={isSelected} onClick={() => selectSubject(subject.id)}>
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
