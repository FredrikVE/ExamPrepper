// src/ui/view/components/LearningContentHeader/LearningContentHeader.jsx
import ToggleButtonRow from "../ToggleButtonRow/ToggleButtonRow.jsx";

export default function LearningContentHeader({ title, subtitle, titleId, entries, activeEntryId, onSelectEntry, ariaLabel }) {
	return (
		<header className="learning-content-header">
			<h1 className="learning-content-header__title" id={titleId}>
				{title}
			</h1>

			{subtitle === null ? null : (
				<p className="learning-content-header__subtitle">
					{subtitle}
				</p>
			)}

			<ToggleButtonRow
				entries={entries}
				activeEntryId={activeEntryId}
				onSelectEntry={onSelectEntry}
				ariaLabel={ariaLabel}
			/>
		</header>
	);
}
