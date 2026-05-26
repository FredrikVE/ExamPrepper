// src/ui/view/components/SubjectIcon.jsx
import { BarChart3, ClipboardList, Code2, Database, Monitor, Shield, Target } from "lucide-react";

const FALLBACK_ICON_KEY = "clipboard";

const SUBJECT_ICON_COMPONENTS = {
    clipboard: ClipboardList,
    code: Code2,
    shield: Shield,
    chart: BarChart3,
    database: Database,
    target: Target,
    monitor: Monitor
};

const LEGACY_ICON_KEYS = {
    "bar-chart": "chart",
    "bar-chart-3": "chart",
    "database-blue": "database"
};

function normalizeSubjectIconKey(icon) {
    const iconKey = typeof icon === "string" ? icon.trim() : "";

    return LEGACY_ICON_KEYS[iconKey] ?? iconKey;
}

export function getSubjectIcon(icon) {
    const iconKey = normalizeSubjectIconKey(icon);

    return SUBJECT_ICON_COMPONENTS[iconKey] ?? SUBJECT_ICON_COMPONENTS[FALLBACK_ICON_KEY];
}

export default function SubjectIcon({ icon = FALLBACK_ICON_KEY, className }) {
    const Icon = getSubjectIcon(icon);

    return <Icon className={className} aria-hidden="true" />;
}
