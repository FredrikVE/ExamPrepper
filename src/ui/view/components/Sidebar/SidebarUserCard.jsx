//src/ui/view/components/Sidebar/SidebarUserCard.jsx
import { ChevronDown } from "lucide-react";

export default function SidebarUserCard() {
    return (
        <div className="sidebar-user-card">
            <div className="sidebar-user-avatar">HS</div>

            <div className="sidebar-user-copy">
                <p className="sidebar-user-name">Hans Student</p>
                <p className="sidebar-user-email">hans@student.no</p>
            </div>

            <ChevronDown className="sidebar-user-chevron" />
        </div>
    );
}