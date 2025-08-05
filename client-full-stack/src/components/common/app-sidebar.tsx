'use client'

import { Calendar, Home, Inbox, Search } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { useRouter, usePathname } from "next/navigation"
import clsx from "clsx"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Inbox,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: Calendar,
  },
  {
    title: "Support/Help",
    url: "/support",
    icon: Search,
  }
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Sidebar className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
      <SidebarContent className="flex flex-col justify-between h-full">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition-all",
                          pathname === item.url ? "bg-gray-100 text-primary" : "text-gray-700"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <SidebarFooter className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-100"
            onClick={() => {
              router.push('/login')
              localStorage.clear()
            }}
          >
            Sign Out
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
