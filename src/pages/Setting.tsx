"use client"
import { useEffect } from "react"
import { Edit, PlusCircle, Save, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
                <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="departments">Departments</TabsTrigger>
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
                                    <label htmlFor="system-name" className="text-sm font-medium">
                                        System Name:
                                    </label>
                                    <Input id="system-name" defaultValue="GCT Attendance System" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="academic-year" className="text-sm font-medium">
                                        Academic Year:
                                    </label>
                                    <Input id="academic-year" defaultValue="2023-2024" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="institution" className="text-sm font-medium">
                                        Institution Name:
                                    </label>
                                    <Input id="institution" defaultValue="Global College of Technology" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="timezone" className="text-sm font-medium">
                                        Timezone:
                                    </label>
                                    <Input id="timezone" defaultValue="UTC+05:30" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="departments" className="space-y-6">
                    <Card className="border-none shadow-md">
                        <CardHeader className="border-b bg-gray-50/50 px-6">
                            <CardTitle className="text-lg font-medium">Departments</CardTitle>
                            <CardDescription>Manage departments in your institution</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="rounded-lg border">
                                    <div className="grid grid-cols-3 border-b bg-gray-50 px-6 py-3">
                                        <div className="text-sm font-medium text-gray-500">Department Name</div>
                                        <div className="text-sm font-medium text-gray-500">Code</div>
                                        <div className="text-sm font-medium text-gray-500">Actions</div>
                                    </div>
                                    <div className="divide-y">
                                        <div className="grid grid-cols-3 items-center px-6 py-4">
                                            <div className="text-sm font-medium">Computer Science</div>
                                            <div className="text-sm text-gray-600">CS</div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500">
                                                    <Trash className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 items-center px-6 py-4">
                                            <div className="text-sm font-medium">Electrical Engineering</div>
                                            <div className="text-sm text-gray-600">EE</div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500">
                                                    <Trash className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 items-center px-6 py-4">
                                            <div className="text-sm font-medium">Mechanical Engineering</div>
                                            <div className="text-sm text-gray-600">ME</div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500">
                                                    <Trash className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 items-center px-6 py-4">
                                            <div className="text-sm font-medium">Civil Engineering</div>
                                            <div className="text-sm text-gray-600">CE</div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500">
                                                    <Trash className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                                    <PlusCircle className="h-4 w-4" />
                                    Add Department
                                </Button>
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
                                    <label htmlFor="username" className="text-sm font-medium">
                                        Username:
                                    </label>
                                    <Input id="username" defaultValue="admin" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email:
                                    </label>
                                    <Input id="email" type="email" defaultValue="admin@gct.edu" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="new-password" className="text-sm font-medium">
                                        New Password:
                                    </label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirm-password" className="text-sm font-medium">
                                        Confirm Password:
                                    </label>
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
