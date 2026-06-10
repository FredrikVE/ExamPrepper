// src/model/datasource/ApiDataSource.js
export default class ApiDataSource {
	#baseUrl;

	constructor({ baseUrl, getToken = null }) {
		if (!baseUrl) throw new Error("ApiDataSource requires baseUrl");
		this.#baseUrl = baseUrl.replace(/\/$/, "");
		this.getToken = getToken;
	}

	async get(path) {
		return await this.#request(path, { method: "GET" });
	}

	async post(path, body) {
		return await this.#request(path, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
	}

	async #request(path, options) {
		const authHeaders = await this.#getAuthHeaders();

		const response = await fetch(`${this.#baseUrl}${path}`, {
			headers: { Accept: "application/json", ...authHeaders, ...(options.headers ?? {}) },
			...options
		});

		const text = await response.text();
		const payload = text ? JSON.parse(text) : null;

		if (!response.ok) {
			throw new Error(payload?.error ?? `API request failed: ${response.status}`);
		}

		return payload;
	}

	async #getAuthHeaders() {
		if (!this.getToken) {
			return {};
		}

		const token = await this.getToken();

		if (!token) {
			return {};
		}

		return { Authorization: `Bearer ${token}` };
	}
}
