"use client"

import { useEffect, useState } from "react"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  PencilRuler,
  Sparkles,
  UserRoundCog,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"
import { Database } from "@/lib/types"

type UserProfile = {
  name: string
  email: string
  username: string
  avatar: string
  initials: string
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      const supabase = createClient()
      
      try {
        // Get authenticated user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !authUser) {
          console.error("Auth error:", authError)
          return
        }

        // Get profile data
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, username")
          .eq("id", authUser.id)
          .single()

        if (profileError) {
          console.error("Profile error:", profileError)
          return
        }        // Combine data
        const fullName = profile?.full_name || authUser.user_metadata?.full_name || "User"
        const nameParts = fullName.trim().split(/\s+/)
        let name = nameParts[0] // Always start with first name
        if (nameParts.length > 2) {
          // If more than 2 names, use first + second-to-last
          name = `${nameParts[0]} ${nameParts[nameParts.length - 2]}`
        } else if (nameParts.length === 2) {
          // If exactly 2 names, use both
          name = `${nameParts[0]} ${nameParts[1]}`
        }
        const email = authUser.email || ""
        const username = profile?.username || "user"
        const avatar = profile?.avatar_url || ""
        // Generate initials from username (first letter)
        const initials = username.charAt(0).toUpperCase()

        setUser({
          name,
          email,
          username,
          avatar,
          initials
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">...</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Loading...</span>
              <span className="truncate text-xs">...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  if (!user) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              variant={"outline"}
              className="data-[state=open]:bg-accent data-[state=open]:text-background transition-all duration-200 ease-in-out hover:bg-secondary w-48">              
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">@{user.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{user.initials}</AvatarFallback>
                </Avatar>                <div className="grid w-32 min-w-0 text-left text-sm leading-tight">
                  <span className="truncate font-medium">@{user.username}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserRoundCog />
                Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilRuler />
                User Suggestions
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
