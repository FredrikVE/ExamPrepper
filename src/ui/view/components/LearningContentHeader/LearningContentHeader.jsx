// src/ui/view/components/LearningContentHeader/LearningContentHeader.jsx
import ToggleButtonRow from "../ToggleButtonRow/ToggleButtonRow.jsx";

export default function LearningContentHeader(props) {
	return (
		<header className="learning-content-header">
			<h1 className="learning-content-header__title" id={props.titleId}>
				{props.title}
			</h1>

			{props.subtitle === null ? null : (
				<p className="learning-content-header__subtitle">
					{props.subtitle}
				</p>
			)}

			<ToggleButtonRow
				entries={props.entries}
				activeEntryId={props.activeEntryId}
				mobileActiveEntryId={props.mobileActiveEntryId}
				onSelectEntry={props.onSelectEntry}
				ariaLabel={props.ariaLabel}
				mobileItems={props.mobileToggleButtonItems}
				expandedMobileGroupId={props.expandedMobileToggleButtonGroupId}
				onOpenMobileGroup={props.onOpenMobileToggleButtonGroup}
				onCloseMobileGroup={props.onCloseMobileToggleButtonGroup}
				mobileBackLabel={props.contentToggleBackLabel}
			/>
		</header>
	);
}
