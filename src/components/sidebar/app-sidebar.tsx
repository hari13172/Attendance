"use client"

import { Link, useLocation } from "react-router"
import { BarChart3, CalendarCheck, FileText, GraduationCap, Home, LogOut, Settings, Users, Building, } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

// Navigation items
const navigationItems = [
    {
        title: "Overview",
        icon: Home,
        path: "/",
    },
    {
        title: "Students",
        icon: GraduationCap,
        path: "/students",
    },
    {
        title: "Attendance",
        icon: BarChart3,
        path: "/attendance",
    },
    {
        title: "View Attendance",
        icon: CalendarCheck,
        path: "/view-attendance",
    },
    {
        title: "Departments",
        icon: Building,
        path: "/departments",
    },
    {
        title: "Reports",
        icon: FileText,
        path: "/reports",
    },
    {
        title: "Users",
        icon: Users,
        path: "/users",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
]

export function AppSidebar() {
    const location = useLocation()


    return (
        <Sidebar className="border-r">
            <SidebarHeader className="border-b">
                <div className="p-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md">
                            <span className="text-xl font-bold">G</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-sky-600">GCT</h1>
                            <p className="text-xs text-gray-500">Attendance System</p>
                        </div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navigationItems.map((item) => {
                            const isActive =
                                location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))

                            return (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton asChild isActive={isActive}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center transition-all ${isActive ? "font-medium text-sky-600" : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                                                }`}
                                        >
                                            <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-sky-600" : "text-gray-500"}`} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button
                                onClick={() => {
                                    // Clear cookies
                                    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                                    // Redirect to login page
                                    window.location.href = "/auth/login";
                                }}
                                className="flex w-full items-center text-gray-600 transition-all hover:bg-rose-50 hover:text-rose-600"
                            >
                                <LogOut className="mr-3 h-5 w-5 text-gray-500" />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}                                                                                                   
