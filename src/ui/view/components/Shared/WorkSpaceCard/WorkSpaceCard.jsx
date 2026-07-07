// src/ui/view/components/Shared/WorkSpaceCard/WorkSpaceCard.jsx

export default function WorkSpaceCard({ className, children }) {
	if (className === null) {
		return <section className="workspace-card">{children}</section>;
	}

	return <section className={`workspace-card ${className}`}>{children}</section>;
}
