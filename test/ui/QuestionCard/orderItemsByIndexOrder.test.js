// test/ui/QuestionCard/orderItemsByIndexOrder.test.js
import { describe, expect, test } from "@jest/globals";
import orderItemsByIndexOrder from "../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Utils/orderItemsByIndexOrder.js";

const sourceItems = [
    { id: "a", label: "A" },
    { id: "b", label: "B" },
    { id: "c", label: "C" },
    { id: "d", label: "D" }
];

describe("orderItemsByIndexOrder", () => {
    test("orders available drag/drop items by the full randomized source order", () => {
        const availableItems = [sourceItems[0], sourceItems[2], sourceItems[3]];

        expect(orderItemsByIndexOrder(availableItems, [2, 0, 3, 1], sourceItems).map((item) => item.id)).toEqual([
            "c",
            "a",
            "d"
        ]);
    });

    test("keeps the existing order when the index order is invalid", () => {
        expect(orderItemsByIndexOrder(sourceItems, [2, 2, 3, 1], sourceItems)).toBe(sourceItems);
    });
});
