"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { Edit, Filter, Mail, MoreHorizontal, Search, Trash, User, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const usersData = [
    {
        id: 1,
        name: "John Smith",
        username: "johnsmith",
        email: "john.smith@example.com",
        role: "Admin",
        avatar: "JS",
        status: "Active",
    },
    {
        id: 2,
        name: "Alice Parker",
        username: "aliceparker",
        email: "alice.parker@example.com",
        role: "Teacher",
        avatar: "AP",
        status: "Active",
    },
    {
        id: 3,
        name: "Robert Johnson",
        username: "robertj",
        email: "robert.johnson@example.com",
        role: "Teacher",
        avatar: "RJ",
        status: "Inactive",
    },
    {
        id: 4,
        name: "Emily Davis",
        username: "emilyd",
        email: "emily.davis@example.com",
        role: "Staff",
        avatar: "ED",
        status: "Active",
    },
]

export function UsersPage() {
    const [users, setUsers] = useState(usersData)
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<(typeof usersData)[0] | null>(null)
    const [newUser, setNewUser] = useState({
        username: "",
        name: "",
        email: "",
        role: "Staff",
    })
    const [errors, setErrors] = useState({
        username: "",
        name: "",
        email: "",
    })

    useEffect(() => {
        // Update the page title
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "Users"
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewUser((prev) => ({ ...prev, [name]: value }))
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = {
            username: "",
            name: "",
            email: "",
        }
        let isValid = true

        if (!newUser.username.trim()) {
            newErrors.username = "Username is required"
            isValid = false
        }

        if (!newUser.name.trim()) {
            newErrors.name = "Name is required"
            isValid = false
        }

        if (!newUser.email.trim()) {
            newErrors.email = "Email is required"
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            newErrors.email = "Email is invalid"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleAddUser = () => {
        if (!validateForm()) return

        const newUserData = {
            id: users.length + 1,
            ...newUser,
            avatar: newUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
            status: "Active",
        }

        setUsers((prev) => [...prev, newUserData])
        setNewUser({
            username: "",
            name: "",
            email: "",
            role: "Staff",
        })
        setIsAddUserOpen(false)
    }

    const handleDeleteUser = () => {
        if (selectedUser) {
            setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id))
            setIsDeleteDialogOpen(false)
            setSelectedUser(null)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                    <p className="text-sm text-gray-500">Manage system users and permissions</p>
                </div>
                <Button onClick={() => setIsAddUserOpen(true)} className="gap-2 bg-sky-500 hover:bg-sky-600">
                    <UserPlus className="h-4 w-4" />
                    Add User
                </Button>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b bg-gray-50/50 px-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <CardTitle className="text-lg font-medium">System Users</CardTitle>
                            <CardDescription>View and manage all users</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input placeholder="Search users..." className="pl-10" />
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Select defaultValue="all-roles">
                                    <SelectTrigger className="w-full md:w-[200px]">
                                        <SelectValue placeholder="All Roles" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all-roles">All Roles</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select defaultValue="all-status">
                                    <SelectTrigger className="w-full md:w-[200px]">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all-status">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    <span className="hidden sm:inline">Filter</span>
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-lg border">
                            <div className="grid grid-cols-6 border-b bg-gray-50 px-6 py-3">
                                <div className="col-span-2 text-sm font-medium text-gray-500">User</div>
                                <div className="text-sm font-medium text-gray-500">Username</div>
                                <div className="text-sm font-medium text-gray-500">Role</div>
                                <div className="text-sm font-medium text-gray-500">Status</div>
                                <div className="text-sm font-medium text-gray-500">Actions</div>
                            </div>
                            <div className="divide-y">
                                {users.map((user) => (
                                    <div key={user.id} className="grid grid-cols-6 items-center px-6 py-4">
                                        <div className="col-span-2 flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                                                <AvatarFallback className="bg-gray-100">{user.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-sm font-medium">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">{user.username}</div>
                                        <div className="text-sm text-gray-600">{user.role}</div>
                                        <div>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-rose-500"
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setIsDeleteDialogOpen(true)
                                                }}
                                            >
                                                <Trash className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">More</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-rose-500"
                                                        onClick={() => {
                                                            setSelectedUser(user)
                                                            setIsDeleteDialogOpen(true)
                                                        }}
                                                    >
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Showing {users.length} users</div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Add User Dialog */}
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Enter the details for the new user account.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter full name"
                                    className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                                    value={newUser.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter username"
                                    className={`pl-10 ${errors.username ? "border-red-500" : ""}`}
                                    value={newUser.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={newUser.role} onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Teacher">Teacher</SelectItem>
                                    <SelectItem value="Staff">Staff</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddUser} className="bg-sky-500 hover:bg-sky-600">
                            Add User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {selectedUser && (
                            <div className="flex items-center gap-3 rounded-lg border p-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarFallback>{selectedUser.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{selectedUser.name}</p>
                                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteUser}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
