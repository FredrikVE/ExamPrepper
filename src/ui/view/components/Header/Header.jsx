// src/ui/view/components/Header/Header.jsx
import { ChevronLeft } from "lucide-react";
import HeaderButton from "./HeaderButton.jsx";
import { createHeaderClassName } from "./headerVariants.js";

export default function Header({ appearance, layout, backContract, heading, tools, trailing }) {
	const className = createHeaderClassName(appearance, layout);

	return (
		<header className={className} aria-label={backContract.navigationLabel}>
			<div className="scaffold-header__leading">
				{backContract.showBackButton && (
					<HeaderButton className="scaffold-header__back-button" onClick={backContract.onBack} ariaLabel={backContract.backLabel}>
						<ChevronLeft aria-hidden="true" focusable="false" />
					</HeaderButton>
				)}
			</div>

			{heading === null ? null : (
				<div className="scaffold-header__heading">
					{heading}
				</div>
			)}

			<div className="scaffold-header__trailing">
				{tools}
				{trailing === null ? null : (
					<div className="scaffold-header__actions">
						{trailing}
					</div>
				)}
			</div>
		</header>
	);
}
