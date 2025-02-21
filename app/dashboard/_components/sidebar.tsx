"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  ImageIcon,
  Layout,
  CreditCard,
  Cloud,
  Settings,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "bg-background transition-width relative flex h-screen flex-col border-r duration-300",
        isExpanded ? "w-[240px]" : "w-[70px]",
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* User Profile */}
      <div className="flex h-[60px] items-center border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src="/avatars/user.png" alt="User" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
            )}
          >
            <p className="truncate text-sm font-medium">Madan Sapkota</p>
            <p className="text-muted-foreground truncate text-xs">Personal</p>
          </div>
        </div>
      </div>

      {/* Workspace Section */}
      <div className="flex-1 p-2">
        <div className="flex h-[30px] items-center">
          <p
            className={cn(
              "text-muted-foreground px-2 text-sm font-medium transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            Workspace
          </p>
        </div>
        <nav className="mt-1 space-y-1">
          <NavItem
            icon={Home}
            label="Home"
            isExpanded={isExpanded}
            isActive={true}
          />
          <NavItem icon={Layout} label="Summaries" isExpanded={isExpanded} />
          <NavItem icon={CreditCard} label="Billing" isExpanded={isExpanded} />
          <NavItem icon={Cloud} label="API" isExpanded={isExpanded} />
        </nav>
      </div>

      <div className="mt-auto">
        {/* Create New Summary Button */}
        <div
          className={cn(
            "mb-4 px-2 transition-all duration-300",
            isExpanded ? "h-[44px] py-2 opacity-100" : "h-0 py-0 opacity-0"
          )}
        >
          <Button
            className="flex h-10 w-full items-center justify-center"
            variant="default"
          >
            Create new summary
          </Button>
        </div>

        {/* Footer Navigation */}
        <div
          className={cn(
            "border-t transition-all duration-300",
            isExpanded ? "p-2 opacity-100" : "px-2 py-0 opacity-0"
          )}
        >
          <nav className="space-y-1">
            <NavItem
              icon={Settings}
              label="Manage Account"
              isExpanded={isExpanded}
            />
            <NavItem icon={LogOut} label="Log Out" isExpanded={isExpanded} />
          </nav>
          <div
            className={cn(
              "mt-4 space-y-1 transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            <Link
              href="#"
              className="text-muted-foreground block text-xs hover:underline"
            >
              Terms of service
            </Link>
            <Link
              href="#"
              className="text-muted-foreground block text-xs hover:underline"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ElementType
  label: string
  isExpanded: boolean
  isActive?: boolean
}

function NavItem({ icon: Icon, label, isExpanded, isActive }: NavItemProps) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "relative h-10 w-full",
        isExpanded ? "justify-start px-3" : "p-0",
        isActive && "bg-secondary"
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0",
          !isExpanded &&
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          isActive && "text-primary"
        )}
      />
      <span
        className={cn(
          "overflow-hidden transition-all",
          isExpanded ? "ml-3 w-auto opacity-100" : "w-0 opacity-0"
        )}
      >
        {label}
      </span>
    </Button>
  )
}
