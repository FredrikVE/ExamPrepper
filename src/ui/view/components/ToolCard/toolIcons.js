// src/ui/view/components/ToolCard/toolIcons.js
import { BarChart3, BookOpen, Bug, ChevronLeft, ChevronRight, Clock3, FileText, Fingerprint, GalleryHorizontalEnd, KeyRound, Leaf, List, Network, PanelsTopLeft, PieChart, Plus, RefreshCw, RotateCcw, Send, ShieldCheck, Shuffle, Sparkles, UserCog, Wrench } from "lucide-react";
import { PAGE_TOOL_ICON_KEYS } from "../../../pageTools/pageTools.js";

const TOOL_ICONS_BY_KEY = {
    [PAGE_TOOL_ICON_KEYS.BAR_CHART_3]: BarChart3,
    [PAGE_TOOL_ICON_KEYS.BOOK_OPEN]: BookOpen,
    [PAGE_TOOL_ICON_KEYS.BUG]: Bug,
    [PAGE_TOOL_ICON_KEYS.CHEVRON_LEFT]: ChevronLeft,
    [PAGE_TOOL_ICON_KEYS.CHEVRON_RIGHT]: ChevronRight,
    [PAGE_TOOL_ICON_KEYS.CLOCK_3]: Clock3,
    [PAGE_TOOL_ICON_KEYS.FILE_TEXT]: FileText,
    [PAGE_TOOL_ICON_KEYS.FINGERPRINT]: Fingerprint,
    [PAGE_TOOL_ICON_KEYS.GALLERY_HORIZONTAL_END]: GalleryHorizontalEnd,
    [PAGE_TOOL_ICON_KEYS.KEY]: KeyRound,
    [PAGE_TOOL_ICON_KEYS.LEAF]: Leaf,
    [PAGE_TOOL_ICON_KEYS.LIST]: List,
    [PAGE_TOOL_ICON_KEYS.NETWORK]: Network,
    [PAGE_TOOL_ICON_KEYS.PANELS_TOP_LEFT]: PanelsTopLeft,
    [PAGE_TOOL_ICON_KEYS.PIE_CHART]: PieChart,
    [PAGE_TOOL_ICON_KEYS.PLUS]: Plus,
    [PAGE_TOOL_ICON_KEYS.REFRESH_CW]: RefreshCw,
    [PAGE_TOOL_ICON_KEYS.ROTATE_CCW]: RotateCcw,
    [PAGE_TOOL_ICON_KEYS.SEND]: Send,
    [PAGE_TOOL_ICON_KEYS.SHIELD_CHECK]: ShieldCheck,
    [PAGE_TOOL_ICON_KEYS.SHUFFLE]: Shuffle,
    [PAGE_TOOL_ICON_KEYS.SPARKLES]: Sparkles,
    [PAGE_TOOL_ICON_KEYS.TOOLBOX]: Wrench,
    [PAGE_TOOL_ICON_KEYS.USER_COG]: UserCog
};

export function getToolIcon(iconKey) {
    return TOOL_ICONS_BY_KEY[iconKey] ?? List;
}
