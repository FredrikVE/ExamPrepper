// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Dnd/DndProvider.jsx
import { DragDropProvider } from "@dnd-kit/react";
import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";

const TOUCH_DND_DELAY_MS = 80;
const TOUCH_DND_TOLERANCE_PX = 7;
const TOUCH_DND_DISTANCE_PX = 3;
const POINTER_DND_DISTANCE_PX = 5;

export default function DndProvider(props) {
	const handleDragEnd = (event) => {
		if (event.canceled) {
			return;
		}

		const source = event.operation.source;
		const target = event.operation.target;

		if (!source || !target) {
			return;
		}

		props.onDndDrop({
			sourceId: source.id,
			targetId: target.id,
			sourceData: source.data,
			targetData: target.data
		});
	};

	return (
		<DragDropProvider onDragEnd={handleDragEnd} sensors={getDndSensors}>
			{props.children}
		</DragDropProvider>
	);
}

function getDndSensors(defaults) {
	return [
		...defaults.filter((sensor) => sensor !== PointerSensor),
		PointerSensor.configure({
			activationConstraints(event) {
				if (event.pointerType === "touch") {
					return [
						new PointerActivationConstraints.Distance({ value: TOUCH_DND_DISTANCE_PX }),
						new PointerActivationConstraints.Delay({
							value: TOUCH_DND_DELAY_MS,
							tolerance: TOUCH_DND_TOLERANCE_PX
						})
					];
				}

				return [
					new PointerActivationConstraints.Distance({ value: POINTER_DND_DISTANCE_PX })
				];
			}
		})
	];
}
