// test/ui/view/components/ProgressPager/progressPagerSsot.test.js
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const componentsRoot = path.join(projectRoot, "src/ui/view/components");
const progressPagerRoot = path.join(componentsRoot, "ProgressPager");

function listSourceFiles(directoryPath) {
    return fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directoryPath, entry.name);

        if (entry.isDirectory()) {
            return listSourceFiles(entryPath);
        }

        if (!entry.name.endsWith(".jsx") && !entry.name.endsWith(".js")) {
            return [];
        }

        return [entryPath];
    });
}

test("ProgressPager primitives are not imported by feature components", () => {
    const featureFiles = listSourceFiles(componentsRoot)
        .filter((filePath) => !filePath.startsWith(progressPagerRoot));

    const directPrimitiveImports = featureFiles.filter((filePath) => {
        const source = fs.readFileSync(filePath, "utf8");
        return source.includes("ProgressPager/PagerButton") || source.includes("ProgressPager/ProgressDots");
    });

    expect(directPrimitiveImports).toEqual([]);
});

test("Flipcards does not own a feature-specific ProgressPager wrapper", () => {
    const flipcardsProgressPagerPath = path.join(componentsRoot, "FlipcardsPage/FlipcardsProgressPager.jsx");

    expect(fs.existsSync(flipcardsProgressPagerPath)).toBe(false);
});
