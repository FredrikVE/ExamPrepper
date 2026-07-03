import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const POSIX_SEPARATOR = path.sep === "\\" ? /\\/g : null;

function toProjectPath(filePath) {
	const relativePath = path.relative(ROOT, filePath);
	return POSIX_SEPARATOR ? relativePath.replace(POSIX_SEPARATOR, "/") : relativePath;
}

function walkFiles(directory, predicate, files = []) {
	if (!fs.existsSync(directory)) {
		return files;
	}

	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			if (["coverage", "dist", "node_modules"].includes(entry.name)) {
				continue;
			}

			walkFiles(entryPath, predicate, files);
			continue;
		}

		if (entry.isFile() && predicate(entryPath)) {
			files.push(entryPath);
		}
	}

	return files;
}

function readLines(filePath) {
	return fs.readFileSync(filePath, "utf8").split(/\r?\n/);
}

function addLineMatches(violations, filePath, linePattern, message) {
	readLines(filePath).forEach((line, index) => {
		if (!linePattern.test(line)) {
			return;
		}

		violations.push({
			filePath: toProjectPath(filePath),
			lineNumber: index + 1,
			message,
			line: line.trim()
		});
	});
}

const srcDirectory = path.join(ROOT, "src");
const styleDirectory = path.join(srcDirectory, "ui", "style");
const sourceFiles = walkFiles(srcDirectory, (filePath) => /\.(js|jsx|css)$/.test(filePath));
const styleFiles = walkFiles(styleDirectory, (filePath) => /\.css$/.test(filePath));
const violations = [];

for (const filePath of sourceFiles) {
	addLineMatches(
		violations,
		filePath,
		/\bconsole\.debug\s*\(/,
		"Remove temporary console.debug instrumentation from source files."
	);
}

for (const filePath of sourceFiles) {
	addLineMatches(
		violations,
		filePath,
		/WorkspaceScaffold|workspace-scaffold/,
		"WorkspaceScaffold was retired; do not reintroduce old workspace scaffold surfaces."
	);
}

for (const filePath of styleFiles) {
	const projectPath = toProjectPath(filePath);
	const isThemeTokenSurface = projectPath === "src/ui/style/Tokens.css";

	if (!isThemeTokenSurface) {
		addLineMatches(
			violations,
			filePath,
			/(^|\s)\.dark(\s|[.{:#])/,
			"Keep dark-mode overrides centralized in src/ui/style/Tokens.css."
		);

		addLineMatches(
			violations,
			filePath,
			/\bcolor-scheme\s*:/,
			"Keep color-scheme declarations centralized in src/ui/style/Tokens.css."
		);
	}
}

const flipcardsPageCss = path.join(styleDirectory, "FlipcardsPage", "page.css");

if (fs.existsSync(flipcardsPageCss)) {
	let inFlipcardsWorkspace = false;

	readLines(flipcardsPageCss).forEach((line, index) => {
		if (/^\.flipcards-workspace\s*\{/.test(line)) {
			inFlipcardsWorkspace = true;
			return;
		}

		if (inFlipcardsWorkspace && /^\}/.test(line)) {
			inFlipcardsWorkspace = false;
			return;
		}

		if (inFlipcardsWorkspace && /\bbackdrop-filter\s*:/.test(line)) {
			violations.push({
				filePath: toProjectPath(flipcardsPageCss),
				lineNumber: index + 1,
				message: "Do not put backdrop-filter on .flipcards-workspace; it traps fixed descendants in the workspace stacking context.",
				line: line.trim()
			});
		}
	});
}

if (violations.length > 0) {
	console.error("Architecture guard failed:");
	for (const violation of violations) {
		console.error(`- ${violation.filePath}:${violation.lineNumber} ${violation.message}`);
		console.error(`  ${violation.line}`);
	}
	process.exit(1);
}

console.log("Architecture guard passed.");
