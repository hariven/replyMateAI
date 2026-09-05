import { useNavigate } from "react-router-dom";
import { Inbox, Flame, BarChart3, BookOpen, Zap, Settings } from "lucide-react";

const ITEMS = [
  { key: "inbox", label: "Inbox", icon: Inbox, active: true, path: null },
  { key: "leads", label: "Leads", icon: Flame, active: false, path: null },
  { key: "analytics", label: "Analytics", icon: BarChart3, active: false, path: null },
  { key: "kb", label: "Knowledge Base", icon: BookOpen, active: false, path: "/kb-editor" },
  { key: "automation", label: "Automation", icon: Zap, active: false, path: null },
  { key: "settings", label: "Settings", icon: Settings, active: false, path: null },
];

export default function NavigationRail() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-14 shrink-0 flex-col items-center gap-1 border-r border-[#2C2C2C] bg-[#1A1A1A] py-4">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const clickable = item.active || !!item.path;
        return (
          <button
            key={item.key}
            title={clickable ? item.label : `${item.label} (coming soon)`}
            onClick={() => item.path && navigate(item.path)}
            disabled={!clickable}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              item.active
                ? "bg-[#00A884]/15 text-[#00A884]"
                : clickable
                ? "text-[#8696A0] hover:bg-[#202020] hover:text-[#E9EDEF]"
                : "cursor-not-allowed text-[#8696A0]/40"
            }`}
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}
