import { describe, expect, test } from "@jest/globals";
import { createElement, isValidElement } from "react";
import { getTopicAreaIcon } from "../../../../../src/ui/view/components/GlossaryPage/TopicAreaPanel/topicAreaIcons.js";

const TOPIC_AREA_ICON_KEYS = [
	"book",
	"book-open",
	"bug",
	"fingerprint",
	"key",
	"leaf",
	"list",
	"lock-keyhole",
	"network",
	"panels-top-left",
	"refresh-cw",
	"shield",
	"shield-check",
	"sparkles",
	"toolbox",
	"user-cog"
];

describe("Glossary topic area icons", () => {
	test.each(TOPIC_AREA_ICON_KEYS)("resolves topic area icon key %s", (iconKey) => {
		const Icon = getTopicAreaIcon(iconKey);

		expect(isValidElement(createElement(Icon))).toBe(true);
	});

	test("fails fast for an unknown topic area icon key", () => {
		expect(() => getTopicAreaIcon("unknown-topic-icon")).toThrow("Unknown topic area icon key");
	});
});
