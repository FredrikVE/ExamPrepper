// src/model/datasource/DataSource.js
export default class DataSource {
	#baseUrl;
	#getToken;

	constructor({ baseUrl, getToken }) {
		if (!baseUrl) {
			throw new Error("DataSource requires baseUrl");
		}

		if (getToken !== null && typeof getToken !== "function") {
			throw new Error("DataSource requires getToken to be a function or null");
		}

		this.#baseUrl = baseUrl.replace(/\/$/, "");
		this.#getToken = getToken;
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
				"Content-Type": "application/json"
			},

			body: JSON.stringify(body)
		});
	}

	async #request(path, options) {
		const authHeaders = await this.#getAuthHeaders();

		const headers = {
			Accept: "application/json",
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
		if (this.#getToken === null) {
			return {};
		}

		const token = await this.#getToken();

		if (!token) {
			return {};
		}

		return {
			Authorization: `Bearer ${token}`
		};
	}
}

async function readPayload(response) {
	const text = await response.text();

	if (!text) {
		return null;
	}

	try {
		return JSON.parse(text);
	}

	catch (error) {
		if (response.ok) {
			throw error;
		}

		return null;
	}
}

function createRequestError(response, payload) {
	let message = `API request failed: ${response.status}`;
	let code = null;

	if (payload && typeof payload === "object") {
		if (typeof payload.message === "string") {
			message = payload.message;
		}

		else if (typeof payload.error === "string") {
			message = payload.error;
		}

		if (typeof payload.error === "string") {
			code = payload.error;
		}
	}

	const error = new Error(message);

	error.status = response.status;
	error.code = code;
	error.payload = payload;

	return error;
}
