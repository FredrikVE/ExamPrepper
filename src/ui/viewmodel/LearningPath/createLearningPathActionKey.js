// src/ui/viewmodel/LearningPath/createLearningPathActionKey.js
export default function createLearningPathActionKey({ moduleId, target }) {
	if (target.kind === "module") return `module:${moduleId}:start`;
	if (target.kind === "module-replay") return `module:${moduleId}:replay`;
	if (target.kind === "section") return `module:${moduleId}:section:${target.sectionId}`;
	if (target.kind === "session") return `module:${moduleId}:session:${target.planKey}`;
	throw new Error(`Unknown LearningPath start target '${target.kind}'`);
}
