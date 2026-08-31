// test/ui/view/components/QuestionCard/QuestionCardContent.test.js
import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import { describe, expect, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../../../../src/constants/QuestionTypes.js";

const QUESTION_CARD_CONTENT_PATH = path.resolve("src/ui/view/components/QuestionCard/QuestionCardContent.jsx");

function parseQuestionCardContent() {
	return parse(fs.readFileSync(QUESTION_CARD_CONTENT_PATH, "utf8"), {
		sourceType: "module",
		plugins: ["jsx"]
	});
}

function findQuestionTypeSwitch() {
	let questionTypeSwitch = null;

	visitNode(parseQuestionCardContent(), (node) => {
		if (node.type !== "SwitchStatement") {
			return;
		}

		if (!isQuestionTypeReference(node.discriminant)) {
			return;
		}

		questionTypeSwitch = node;
	});

	if (questionTypeSwitch === null) {
		throw new Error("QuestionCardContent must switch on question.type");
	}

	return questionTypeSwitch;
}

function visitNode(node, visitor) {
	if (node === null || typeof node !== "object") {
		return;
	}

	visitor(node);

	for (const value of Object.values(node)) {
		if (Array.isArray(value)) {
			for (const child of value) {
				visitNode(child, visitor);
			}

			continue;
		}

		visitNode(value, visitor);
	}
}

function isQuestionTypeReference(node) {
	if (node.type !== "MemberExpression") {
		return false;
	}

	if (node.object.type !== "Identifier" || node.object.name !== "question") {
		return false;
	}

	return node.property.type === "Identifier" && node.property.name === "type";
}

function getQuestionTypeKey(switchCase) {
	const test = switchCase.test;

	if (test === null || test.type !== "MemberExpression") {
		return null;
	}

	if (test.object.type !== "Identifier" || test.object.name !== "QUESTION_TYPES") {
		return null;
	}

	if (test.property.type !== "Identifier") {
		return null;
	}

	return test.property.name;
}

function returnsNull(statement) {
	if (statement.type !== "ReturnStatement") {
		return false;
	}

	if (statement.argument === null) {
		return false;
	}

	return statement.argument.type === "NullLiteral";
}

describe("QuestionCardContent", () => {
	test("routes every registered question type through one explicit switch case", () => {
		const questionTypeSwitch = findQuestionTypeSwitch();
		const routedQuestionTypeKeys = [];

		for (const switchCase of questionTypeSwitch.cases) {
			const questionTypeKey = getQuestionTypeKey(switchCase);

			if (questionTypeKey !== null) {
				routedQuestionTypeKeys.push(questionTypeKey);
			}
		}

		expect(routedQuestionTypeKeys).toEqual(Object.keys(QUESTION_TYPES));
		expect(new Set(routedQuestionTypeKeys).size).toBe(routedQuestionTypeKeys.length);
	});

	test("does not render a second fill input when the prompt owns the inline blank", () => {
		const questionTypeSwitch = findQuestionTypeSwitch();
		const fillCase = questionTypeSwitch.cases.find((switchCase) => getQuestionTypeKey(switchCase) === "FILL");

		expect(fillCase).toBeDefined();

		const inlineFillGuard = fillCase.consequent.find((statement) => {
			return statement.type === "IfStatement" && statement.test.type === "Identifier" && statement.test.name === "hasInlineFillBlank";
		});

		expect(inlineFillGuard).toBeDefined();
		expect(inlineFillGuard.consequent.type).toBe("BlockStatement");
		expect(inlineFillGuard.consequent.body.some(returnsNull)).toBe(true);
	});

	test("does not render an unknown question type", () => {
		const questionTypeSwitch = findQuestionTypeSwitch();
		const defaultCase = questionTypeSwitch.cases.find((switchCase) => switchCase.test === null);

		expect(defaultCase).toBeDefined();
		expect(defaultCase.consequent.some(returnsNull)).toBe(true);
	});
});
