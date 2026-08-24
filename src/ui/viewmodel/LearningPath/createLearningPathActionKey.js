// src/ui/viewmodel/LearningPath/createLearningPathActionKey.js
export default function createLearningPathActionKey({ moduleId, target }) {
	switch (target.kind) {
		case "module":
			return `module:${moduleId}:start`;

		case "module-replay":
			return `module:${moduleId}:replay`;

		case "section":
			return `module:${moduleId}:section:${target.sectionId}`;

		case "session":
			return `module:${moduleId}:session:${target.planKey}`;

		default:
			throw new Error(`Unknown LearningPath start target '${target.kind}'`);
	}
}
