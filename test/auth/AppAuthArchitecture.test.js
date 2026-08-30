// test/auth/AppAuthArchitecture.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const SOURCE_ROOT = path.resolve("src");
const CLERK_CONFIG_OWNER = "src/auth/ClerkAppProvider.jsx";
const CLERK_PACKAGE_OWNERS = [
	"src/auth/ClerkAppProvider.jsx",
	"src/ui/view/components/AuthButton.jsx"
];

describe("frontend IAM ownership", () => {
	test("keeps Clerk configuration in ClerkAppProvider", () => {
		const owners = findSourceFilesContaining("VITE_CLERK_PUBLISHABLE_KEY");
		expect(owners).toEqual([CLERK_CONFIG_OWNER]);
	});

	test("keeps Clerk package imports limited to the auth adapter and auth presentation", () => {
		const owners = findSourceFilesContaining("@clerk/clerk-react");
		expect(owners).toEqual(CLERK_PACKAGE_OWNERS);
	});

	test("does not expose Clerk-specific auth flags outside the auth boundary", () => {
		const owners = findSourceFilesContaining("hasClerkAuth");
		expect(owners).toEqual([]);
	});
});

function findSourceFilesContaining(searchText) {
	return collectSourceFiles(SOURCE_ROOT)
		.filter((filePath) => fs.readFileSync(filePath, "utf8").includes(searchText))
		.map((filePath) => path.relative(process.cwd(), filePath))
		.sort();
}

function collectSourceFiles(directoryPath) {
	const sourceFiles = [];

	for (const directoryEntry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
		const entryPath = path.join(directoryPath, directoryEntry.name);

		if (directoryEntry.isDirectory()) {
			sourceFiles.push(...collectSourceFiles(entryPath));
			continue;
		}

		if (entryPath.endsWith(".js") || entryPath.endsWith(".jsx")) {
			sourceFiles.push(entryPath);
		}
	}

	return sourceFiles;
}
