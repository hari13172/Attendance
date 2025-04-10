"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { Edit, PlusCircle, Save, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { getAuthToken } from "@/api/getAuthToken"

type Department = {
    id: number
    name: string
    code: string
}

export default function SettingsPage() {
    const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false)
    const [newDepartment, setNewDepartment] = useState({ name: "", code: "" })
    const [errors, setErrors] = useState({ name: "", code: "" })
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "Settings"
    }, [])

    // Fetch departments
    const {
        data: departments = [],
        isLoading,
        error,
    } = useQuery<Department[]>({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await axios.get("http://10.5.0.2:8001/api/departments", {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                },
            })
            return res.data
        },
    })

    // Add department mutation
    const addDepartmentMutation = useMutation({
        mutationFn: async (newDept: { name: string; code: string }) => {
            return await axios.post(
                "http://10.5.0.2:8001/api/departments",
                {
                    name: newDept.name,
                    code: newDept.code.toUpperCase(),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getAuthToken()}`,
                    },

                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            toast("Department Added", {
                description: `${newDepartment.name} has been added successfully.`,
                duration: 3000,
            })
            setNewDepartment({ name: "", code: "" })
            setIsAddDepartmentOpen(false)
        },
        onError: () => {
            toast("Error", { description: "Failed to add department", duration: 3000 })
        },
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewDepartment((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = { name: "", code: "" }
        let isValid = true

        if (!newDepartment.name.trim()) {
            newErrors.name = "Department name is required"
            isValid = false
        }

        if (!newDepartment.code.trim()) {
            newErrors.code = "Department code is required"
            isValid = false
        } else if (newDepartment.code.length > 5) {
            newErrors.code = "Department code should be 5 characters or less"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleAddDepartment = () => {
        if (!validateForm()) return
        addDepartmentMutation.mutate(newDepartment)
    }

    const handleDepartmentClick = (id: number) => {
        navigate(`/department/${id}`)
    }

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
                        <CardContent className="p-6 space-y-6">
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
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="departments" className="space-y-6">
                    <Card className="border-none shadow-md">
                        <CardHeader className="border-b bg-gray-50/50 px-6">
                            <CardTitle className="text-lg font-medium">Departments</CardTitle>
                            <CardDescription>Manage departments in your institution</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {isLoading ? (
                                <p>Loading departments...</p>
                            ) : error ? (
                                <p className="text-red-500">Failed to load departments</p>
                            ) : (
                                <div className="rounded-lg border">
                                    <div className="grid grid-cols-3 border-b bg-gray-50 px-6 py-3">
                                        <div className="text-sm font-medium text-gray-500">Department Name</div>
                                        <div className="text-sm font-medium text-gray-500">Code</div>
                                        <div className="text-sm font-medium text-gray-500">Actions</div>
                                    </div>
                                    <div className="divide-y">
                                        {departments.map((department) => (
                                            <div
                                                key={department.id}
                                                className="grid grid-cols-3 items-center px-6 py-4"
                                            >
                                                <div
                                                    className="text-sm font-medium cursor-pointer hover:text-sky-600"
                                                    onClick={() => handleDepartmentClick(department.id)}
                                                >
                                                    {department.name}
                                                </div>
                                                <div className="text-sm text-gray-600">{department.code}</div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500">
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Button
                                className="gap-2 bg-emerald-500 hover:bg-emerald-600"
                                onClick={() => setIsAddDepartmentOpen(true)}
                            >
                                <PlusCircle className="h-4 w-4" />
                                Add Department
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                    <Card className="border-none shadow-md">
                        <CardHeader className="border-b bg-gray-50/50 px-6">
                            <CardTitle className="text-lg font-medium">User Account</CardTitle>
                            <CardDescription>Manage your account settings</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
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
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Add Department Dialog */}
            <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Department</DialogTitle>
                        <DialogDescription>Enter the details for the new department.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Department Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter department name"
                                className={errors.name ? "border-red-500" : ""}
                                value={newDepartment.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="code">Department Code</Label>
                            <Input
                                id="code"
                                name="code"
                                placeholder="Enter department code (e.g., CS)"
                                className={errors.code ? "border-red-500" : ""}
                                value={newDepartment.code}
                                onChange={handleInputChange}
                                maxLength={5}
                            />
                            {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddDepartment} className="bg-sky-500 hover:bg-sky-600">
                            Add Department
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
