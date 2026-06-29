// src/ui/view/components/PageTools/PageToolsIcon.jsx
import { BarChart3, BookOpen, ChevronLeft, ChevronRight, Clock3, FileText, GalleryHorizontalEnd, List, PanelsTopLeft, PieChart, Plus, RefreshCw, RotateCcw, Send, Shuffle, Sparkles } from "lucide-react";
import { PAGE_TOOL_ICON_KEYS } from "../../../../navigation/pageTools.js";

const PAGE_TOOL_ICONS = {
    [PAGE_TOOL_ICON_KEYS.BAR_CHART_3]: BarChart3,
    [PAGE_TOOL_ICON_KEYS.BOOK_OPEN]: BookOpen,
    [PAGE_TOOL_ICON_KEYS.CHEVRON_LEFT]: ChevronLeft,
    [PAGE_TOOL_ICON_KEYS.CHEVRON_RIGHT]: ChevronRight,
    [PAGE_TOOL_ICON_KEYS.CLOCK_3]: Clock3,
    [PAGE_TOOL_ICON_KEYS.FILE_TEXT]: FileText,
    [PAGE_TOOL_ICON_KEYS.GALLERY_HORIZONTAL_END]: GalleryHorizontalEnd,
    [PAGE_TOOL_ICON_KEYS.LIST]: List,
    [PAGE_TOOL_ICON_KEYS.PANELS_TOP_LEFT]: PanelsTopLeft,
    [PAGE_TOOL_ICON_KEYS.PIE_CHART]: PieChart,
    [PAGE_TOOL_ICON_KEYS.PLUS]: Plus,
    [PAGE_TOOL_ICON_KEYS.REFRESH_CW]: RefreshCw,
    [PAGE_TOOL_ICON_KEYS.ROTATE_CCW]: RotateCcw,
    [PAGE_TOOL_ICON_KEYS.SEND]: Send,
    [PAGE_TOOL_ICON_KEYS.SHUFFLE]: Shuffle,
    [PAGE_TOOL_ICON_KEYS.SPARKLES]: Sparkles
};

export default function PageToolsIcon(props) {
    const Icon = PAGE_TOOL_ICONS[props.iconKey] ?? List;

    return <Icon aria-hidden="true" focusable="false" />;
}
