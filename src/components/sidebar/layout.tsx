"use client"

import { Outlet } from "react-router"
import { Bell } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/context/auth-context"
import { AppSidebar } from "./app-sidebar"

export function Layout() {
    const { user, logout } = useAuth()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-gradient-to-br from-gray-50 to-white">
                <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="text-gray-500 hover:text-gray-700" />
                        <h1 className="text-2xl font-bold tracking-tight text-gray-800" id="page-title">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Bell className="h-5 w-5" />
                                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-rose-500 p-0 text-[10px]">3</Badge>
                                <span className="sr-only">Notifications</span>
                            </Button>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100">
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                                        <AvatarFallback className="bg-gradient-to-br from-sky-500 to-sky-600 text-white">
                                            {user?.name.charAt(0) || "A"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{user?.name || "Admin"}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="text-rose-500">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="container mx-auto max-w-7xl p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
