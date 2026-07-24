// src/ui/view/components/WorkspaceScaffold/WorkspaceScaffold.jsx
import { useEffect, useRef } from "react";

export default function WorkspaceScaffold(props) {
	const { className, header, footer, overlay, scrollToTopRequestId, children } = props;
	const bodyRef = useRef(null);

	useEffect(() => {
		if (scrollToTopRequestId === null) {
			return;
		}

		scrollWorkspaceBodyToTop(bodyRef);
	}, [scrollToTopRequestId]);

	return (
		<main className={`workspace-scaffold ${className}`}>
			<div className="workspace-scaffold-header">
				{header}
			</div>

			<div ref={bodyRef} className="workspace-scaffold-body">
				{children}
			</div>

			{footer === null ? null : (
				<div className="workspace-scaffold-footer-overlay">
					{footer}
				</div>
			)}

			{overlay === null ? null : (
				<div className="workspace-scaffold-overlay">
					{overlay}
				</div>
			)}
		</main>
	);
}

const scrollWorkspaceBodyToTop = (bodyRef) => {
	window.requestAnimationFrame(() => {
		bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	});
};
