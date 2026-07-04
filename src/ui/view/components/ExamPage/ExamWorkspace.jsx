// src/ui/view/components/ExamPage/ExamWorkspace.jsx
import { useEffect, useRef } from "react";

export default function ExamWorkspace({ className, header, scrollToTopRequestId, children }) {
	const examScrollRef = useRef(null);

	useEffect(() => {
		if (scrollToTopRequestId === 0) {
			return;
		}

		scrollExamSurfaceToTop(examScrollRef);
	}, [scrollToTopRequestId]);

	return (
		<div className={className}>
			{header}

			<div ref={examScrollRef} className="exam-scroll">
				{children}
			</div>
		</div>
	);
}

const scrollExamSurfaceToTop = (examScrollRef) => {
	window.requestAnimationFrame(() => {
		examScrollRef.current?.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
};
