// src/ui/view/components/SubjectIcon.jsx
import { BarChart3, ClipboardList, Code2, Database, Monitor, Target } from "lucide-react";

const SUBJECT_ICON_COMPONENTS = {
    clipboard: ClipboardList,
    "bar-chart": BarChart3,
    database: Database,
    "database-blue": Database,
    target: Target,
    code: Code2,
    monitor: Monitor
};

export function getSubjectIcon(subject) {
    return SUBJECT_ICON_COMPONENTS[subject?.icon] ?? ClipboardList;
}

export default function SubjectIcon({ subject, className }) {
    const Icon = getSubjectIcon(subject);

    return <Icon className={className} />;
}
