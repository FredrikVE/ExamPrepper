// src/ui/view/components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx
import { useEffect, useRef } from "react";

export default function WorkSpaceScaffold({ className, header, scrollToTopRequestId, children }) {
	const scrollRef = useRef(null);

	useEffect(() => {
		if (scrollToTopRequestId === 0) {
			return;
		}

		scrollScaffoldToTop(scrollRef);
	}, [scrollToTopRequestId]);

	return (
		<main className={`workspace-scaffold ${className}`}>
			{header}

			<div ref={scrollRef} className="workspace-scaffold-scroll">
				{children}
			</div>
		</main>
	);
}

function scrollScaffoldToTop(scrollRef) {
	window.requestAnimationFrame(() => {
		scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	});
}
