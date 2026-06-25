// src/ui/view/components/FlipcardsPage/FlipcardToolMenu/MobileFlipcardSheetGrip.jsx
import { forwardRef } from "react";
import { ChevronUp } from "lucide-react";

const MobileFlipcardSheetGrip = forwardRef(function MobileFlipcardSheetGrip({ isExpanded, onClick, label }, ref) {
    const gripClassName = isExpanded
        ? "mobile-flipcard-sheet-grip-control mobile-flipcard-sheet-grip-control-expanded"
        : "mobile-flipcard-sheet-grip-control";

    return (
        <button
            type="button"
            ref={ref}
            className={gripClassName}
            onClick={onClick}
            aria-label={label}
            aria-expanded={isExpanded}
        >
            <ChevronUp className="mobile-flipcard-sheet-grip-chevron" aria-hidden="true" focusable="false" />
        </button>
    );
});

export default MobileFlipcardSheetGrip;
