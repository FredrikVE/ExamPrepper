import { describe, expect, jest, test } from "@jest/globals";
import AppErrorBoundary from "../../../../src/ui/view/components/AppErrorBoundary/AppErrorBoundary.jsx";

describe("AppErrorBoundary", () => {
	test("switches to the required fallback after an unexpected child error", () => {
		const fallback = { type: "fallback" };
		const children = { type: "children" };
		const boundary = new AppErrorBoundary({ fallback, children, onError: () => {} });
		expect(boundary.render()).toBe(children);
		boundary.state = AppErrorBoundary.getDerivedStateFromError(new Error("boom"));
		expect(boundary.render()).toBe(fallback);
	});

	test("reports the technical error through the required composition callback", () => {
		const onError = jest.fn();
		const boundary = new AppErrorBoundary({ fallback: null, children: null, onError });
		const error = new Error("boom");
		const errorInfo = { componentStack: "stack" };
		boundary.componentDidCatch(error, errorInfo);
		expect(onError).toHaveBeenCalledWith(error, errorInfo);
	});
});
