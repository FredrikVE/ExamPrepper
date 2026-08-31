// src/ui/view/components/GlossaryPage/GlossaryPanel/DirectNeighborMeter.jsx
import { DIRECT_NEIGHBOR_LEVELS } from "../../../../viewmodel/GlossaryPage/directNeighborLevelModel.js";

export default function DirectNeighborMeter({ model }) {
	return (
		<span className="glossary-direct-neighbor-meter">
			<span className="glossary-direct-neighbor-meter__visual" aria-hidden="true">
				<span className="glossary-direct-neighbor-meter__value">{model.value}</span>
				<span className="glossary-direct-neighbor-meter__meter">
					{DIRECT_NEIGHBOR_LEVELS.map((level) => (
						<span key={level} className={resolveDirectNeighborBarClassName(level, model.level)} />
					))}
				</span>
			</span>
			<span className="sr-only">{model.ariaLabel}</span>
		</span>
	);
}

function resolveDirectNeighborBarClassName(level, activeLevel) {
	return level <= activeLevel
		? "glossary-direct-neighbor-meter__bar glossary-direct-neighbor-meter__bar--filled"
		: "glossary-direct-neighbor-meter__bar";
}
