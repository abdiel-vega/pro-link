"use client";

import { usePathname } from "next/navigation";

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbMap: Record<string, string> = {
    "/dashboard": "Home",
    "/dashboard/bookings": "Bookings",
    "/dashboard/services": "Services",
    "/dashboard/messages": "Messages",
    "/dashboard/analytics": "Analytics",
    "/dashboard/profile": "Profile",
    "/dashboard/settings": "Settings",
  };

  const currentPage = breadcrumbMap[pathname] || "Dashboard";

  return {
    currentPage,
    isHomePage: pathname === "/dashboard",
  };
}
