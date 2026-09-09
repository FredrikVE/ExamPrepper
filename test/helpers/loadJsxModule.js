// test/helpers/loadJsxModule.js
import path from "node:path";
import { pathToFileURL } from "node:url";

/* JSX transformeres av Jest-kontrakten i jest.config.js. Denne helperen gjør kun
   modulstien eksplisitt og bruker Jests ESM-loader til dynamisk import. */
export async function loadJsxModule(modulePath) {
	let relativePath = modulePath;
	if (relativePath.startsWith("/")) {
		relativePath = relativePath.slice(1);
	}

	const absolutePath = path.resolve(process.cwd(), relativePath);
	return import(pathToFileURL(absolutePath).href);
}

export async function closeJsxModuleLoader() {
	return;
}
