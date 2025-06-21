"use client"

import {
  Calendar,
  Home,
  Briefcase,
  BarChart3,
  User,
  Settings,
  Mail,
  Link2,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/dashboard/nav-user"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Bookings",
    url: "/dashboard/bookings",
    icon: Calendar,
  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: Briefcase,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: Mail,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" className="bg-primary">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>              
            <SidebarMenuButton size="lg" asChild className="text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-sm">
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LinkIcon className="size-6 transition-colors duration-200" />
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-medium transition-colors duration-200">Pro-Link</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground font-semibold">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className="hover:bg-secondary data-[active=true]:bg-accent transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-sm"
                  >
                    <Link href={item.url}>
                      <item.icon className={`transition-colors duration-200 ${pathname === item.url ? 'text-accent-foreground' : 'text-foreground'}`} />
                      <span className={`transition-colors duration-200 ${pathname === item.url ? 'text-accent-foreground' : 'text-foreground'}`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}