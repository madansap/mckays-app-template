"use client"

import { NavMain } from "@/components/sidebar/nav-main"
import { Bot, BookOpen, Settings2, SquareTerminal } from "lucide-react"

const navItems = [
  {
    title: "Playground",
    url: "/playground",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "History", url: "/playground/history" },
      { title: "Starred", url: "/playground/starred" },
      { title: "Settings", url: "/playground/settings" }
    ]
  },
  {
    title: "Models",
    url: "/models",
    icon: Bot,
    items: [
      { title: "Genesis", url: "/models/genesis" },
      { title: "Explorer", url: "/models/explorer" },
      { title: "Quantum", url: "/models/quantum" }
    ]
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Introduction", url: "#" },
      { title: "Get Started", url: "#" },
      { title: "Tutorials", url: "#" },
      { title: "Changelog", url: "#" }
    ]
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      { title: "General", url: "#" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" }
    ]
  }
]

export function DashboardNav() {
  return (
    <aside className="w-[240px] border-r">
      <NavMain items={navItems} />
    </aside>
  )
}
