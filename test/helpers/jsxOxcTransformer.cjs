// test/helpers/jsxOxcTransformer.cjs
let viteModulePromise = null;

module.exports = {
	async processAsync(sourceText, sourcePath) {
		if (viteModulePromise === null) {
			viteModulePromise = import("vite");
		}

		const { transformWithOxc } = await viteModulePromise;
		const result = await transformWithOxc(sourceText, sourcePath, {
			sourceType: "module",
			jsx: {
				development: false,
				importSource: "react",
				runtime: "automatic"
			}
		});

		return { code: result.code };
	}
};
