// src/ui/view/components/SelectPageScaffold/SelectPageScaffold.jsx
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

export default function SelectPageScaffold(props) {
	return (
		<div className={props.layoutClassName}>
			<main className={props.workspaceClassName}>
				{props.ambientLightClassName && (
					<div className={props.ambientLightClassName} aria-hidden="true" />
				)}

				<Header
					showBackButton={props.showBackButton}
					backLabel={props.backLabel}
					navigationLabel={props.navigationLabel}
					onBack={props.onBack}
					progressBarModel={null}
					tools={props.pageTools}
				/>

				<div className={props.scrollClassName}>
					{props.children}
				</div>
			</main>

			{props.isSearchSheetOpen && (
				<button
					type="button"
					className="search-backdrop search-backdrop-visible"
					onMouseDown={(event) => {
						event.preventDefault();
					}}
					onClick={props.onCloseSearchSheet}
					aria-label={props.searchCloseLabel}
					tabIndex={-1}
				/>
			)}

			<Footer
				isOpen={props.isFooterOpen}
				className={props.footerClassName}
				openClassName={props.footerOpenClassName}
			>
				{props.footer}
			</Footer>
		</div>
	);
}
