// src/ui/view/components/ExamPage/ExamWorkspace.jsx
import { useEffect, useRef } from "react";

export default function ExamWorkspace({ className, scrollToTopRequestId, children }) {
	const examWorkspaceRef = useRef(null);

	useEffect(() => {
		if (scrollToTopRequestId === 0) {
			return;
		}

		scrollExamWorkspaceToTop(examWorkspaceRef);
	}, [scrollToTopRequestId]);

	return (
		<div ref={examWorkspaceRef} className={className}>
			{children}
		</div>
	);
}

const scrollExamWorkspaceToTop = (examWorkspaceRef) => {
	window.requestAnimationFrame(() => {
		examWorkspaceRef.current?.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
};
