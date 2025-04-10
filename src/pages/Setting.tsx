"use client"
import { useEffect } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
    useEffect(() => {
        // Update the page title
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "Settings"
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
                    <p className="text-sm text-gray-500">Configure your attendance system</p>
                </div>
                <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                    <Save className="h-4 w-4" />
                    Save Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:w-[300px]">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card className="border-none shadow-md">
                        <CardHeader className="border-b bg-gray-50/50 px-6">
                            <CardTitle className="text-lg font-medium">General Settings</CardTitle>
                            <CardDescription>Configure basic system settings</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="system-name">System Name:</Label>
                                    <Input id="system-name" defaultValue="GCT Attendance System" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="academic-year">Academic Year:</Label>
                                    <Input id="academic-year" defaultValue="2023-2024" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="institution">Institution Name:</Label>
                                    <Input id="institution" defaultValue="Global College of Technology" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone:</Label>
                                    <Input id="timezone" defaultValue="UTC+05:30" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                    <Card className="border-none shadow-md">
                        <CardHeader className="border-b bg-gray-50/50 px-6">
                            <CardTitle className="text-lg font-medium">User Account</CardTitle>
                            <CardDescription>Manage your account settings</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username:</Label>
                                    <Input id="username" defaultValue="admin" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email:</Label>
                                    <Input id="email" type="email" defaultValue="admin@gct.edu" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password:</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm Password:</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Change Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
