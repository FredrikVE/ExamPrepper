// src/model/datasource/DataSource.js
const JSON_MEDIA_TYPE = "application/json";

export default class DataSource {
	#baseUrl;
	#readToken;

	constructor(options) {
		const { baseUrl } = options;

		if (!baseUrl) {
			throw new Error("DataSource requires baseUrl");
		}

		this.#baseUrl = baseUrl.replace(/\/$/, "");
		this.#readToken = readAnonymousToken;

		if (Object.hasOwn(options, "getToken")) {
			if (typeof options.getToken !== "function") {
				throw new Error("DataSource getToken must be a function");
			}

			this.#readToken = options.getToken;
		}
	}

	async get(path) {
		return await this.#request(path, {
			method: "GET",
			headers: {}
		});
	}

	async post(path, body) {
		return await this.#request(path, {
			method: "POST",

			headers: {
				"Content-Type": JSON_MEDIA_TYPE
			},

			body: JSON.stringify(body)
		});
	}

	async #request(path, options) {
		const authHeaders = await this.#getAuthHeaders();

		const headers = {
			Accept: JSON_MEDIA_TYPE,
			...authHeaders,
			...options.headers
		};

		const response = await fetch(`${this.#baseUrl}${path}`, {
			...options,
			headers
		});

		const payload = await readPayload(response);

		if (response.ok) {
			return payload;
		}

		throw createRequestError(response, payload);
	}

	async #getAuthHeaders() {
		const token = await this.#readToken();

		if (!token) {
			return {};
		}

		return createAuthorizationHeaders(token);
	}
}

function readAnonymousToken() {
	return undefined;
}

function createAuthorizationHeaders(token) {
	return {
		Authorization: `Bearer ${token}`
	};
}

async function readPayload(response) {
	const text = await response.text();

	if (!text) {
		return undefined;
	}

	try {
		return JSON.parse(text);
	}

	catch (error) {
		if (response.ok) {
			throw error;
		}

		return undefined;
	}
}

function createRequestError(response, payload) {
	const message = resolveRequestErrorMessage(response, payload);
	const code = resolveRequestErrorCode(payload);
	const error = new Error(message);

	error.status = response.status;
	error.code = code;
	error.payload = payload;

	return error;
}

function resolveRequestErrorMessage(response, payload) {
	if (!isObjectPayload(payload)) {
		return `API request failed: ${response.status}`;
	}

	if (typeof payload.message === "string") {
		return payload.message;
	}

	if (typeof payload.error === "string") {
		return payload.error;
	}

	return `API request failed: ${response.status}`;
}

function resolveRequestErrorCode(payload) {
	if (!isObjectPayload(payload)) {
		return undefined;
	}

	if (typeof payload.error === "string") {
		return payload.error;
	}

	return undefined;
}

function isObjectPayload(value) {
	return Boolean(value) && typeof value === "object";
}
