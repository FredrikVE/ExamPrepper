//src/ui/view/components/Sidebar/SidebarBrand.jsx
import { ClipboardList } from "lucide-react";

export default function SidebarBrand() {
    return (
        <div className="sidebar-brand">
            <div className="sidebar-brand-mark">
                <ClipboardList className="sidebar-brand-icon" />
            </div>

            <div>
                <p className="sidebar-brand-title">IN5431</p>
                <p className="sidebar-brand-subtitle">Exam Emulator</p>
            </div>
        </div>
    );
}