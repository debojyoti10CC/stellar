"use client"

import { FileText, Bot, Link2, Activity, LayoutDashboard, Settings, Users, FileSearch } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "contracts", label: "Contracts", icon: FileText },
  { id: "workbench", label: "Workbench", icon: FileSearch },
  { id: "ai-analysis", label: "AI Analysis", icon: Bot },
  { id: "blockchain", label: "Blockchain", icon: Link2 },
  { id: "audit-trail", label: "Audit Trail", icon: Activity },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  return (
    <aside className="w-64 border-r border-border bg-card/50 h-[calc(100vh-4rem)] sticky top-16 hidden lg:block">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
