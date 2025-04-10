"use client"
import { useEffect, useState } from "react"
import { CalendarIcon, Check, Filter, MoreHorizontal, Search, UsersRound, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const attendanceData = [
    {
        id: 1,
        rollNo: "CS2023001",
        name: "John Smith",
        avatar: "JS",
        department: "Computer Science",
        status: "present",
        time: "09:15 AM",
    },
    {
        id: 2,
        rollNo: "CS2023002",
        name: "Alice Parker",
        avatar: "AP",
        department: "Computer Science",
        status: "present",
        time: "09:12 AM",
    },
    {
        id: 3,
        rollNo: "CS2023003",
        name: "Robert Johnson",
        avatar: "RJ",
        department: "Computer Science",
        status: "absent",
        time: "09:00 AM",
    },
    {
        id: 4,
        rollNo: "EE2023001",
        name: "Emily Davis",
        avatar: "ED",
        department: "Electrical Engineering",
        status: "present",
        time: "09:05 AM",
    },
    {
        id: 5,
        rollNo: "EE2023002",
        name: "Michael Wilson",
        avatar: "MW",
        department: "Electrical Engineering",
        status: "present",
        time: "09:10 AM",
    },
]

export default function AttendancePage() {
    const [date, setDate] = useState("2025-04-10")

    useEffect(() => {
        // Update the page title
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "Attendance"
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Attendance Tracking</h2>
                    <p className="text-sm text-gray-500">Manage and track student attendance</p>
                </div>
                <div className="flex gap-3">
                    <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                        <UsersRound className="h-4 w-4" />
                        Batch Attendance
                    </Button>
                    <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                        <CalendarIcon className="h-4 w-4" />
                        Mark Attendance
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b bg-gray-50/50 px-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <CardTitle className="text-lg font-medium">Attendance Records</CardTitle>
                            <CardDescription>View and manage attendance for {date}</CardDescription>
                        </div>
                        <Tabs defaultValue="all" className="w-full sm:w-auto">
                            <TabsList className="grid w-full grid-cols-3 sm:w-[300px]">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="present">Present</TabsTrigger>
                                <TabsTrigger value="absent">Absent</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 flex-col gap-4 md:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input placeholder="Search students..." className="pl-10" />
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full md:w-auto"
                                    />
                                    <Button variant="outline" className="gap-2">
                                        <Filter className="h-4 w-4" />
                                        <span className="hidden sm:inline">Filter</span>
                                    </Button>
                                </div>
                            </div>
                            <Select defaultValue="all-departments">
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue placeholder="All Departments" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-departments">All Departments</SelectItem>
                                    <SelectItem value="computer-science">Computer Science</SelectItem>
                                    <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-lg border">
                            <div className="grid grid-cols-6 border-b bg-gray-50 px-6 py-3">
                                <div className="text-sm font-medium text-gray-500">Roll No</div>
                                <div className="col-span-2 text-sm font-medium text-gray-500">Name</div>
                                <div className="text-sm font-medium text-gray-500">Department</div>
                                <div className="text-sm font-medium text-gray-500">Status</div>
                                <div className="text-sm font-medium text-gray-500">Actions</div>
                            </div>
                            <div className="divide-y">
                                {attendanceData.map((student) => (
                                    <div key={student.id} className="grid grid-cols-6 items-center px-6 py-4">
                                        <div className="text-sm font-medium">{student.rollNo}</div>
                                        <div className="col-span-2 flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={student.name} />
                                                <AvatarFallback className="bg-gray-100">{student.avatar}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{student.name}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">{student.department}</div>
                                        <div>
                                            {student.status === "present" ? (
                                                <Badge variant="outline" className="bg-green-50 text-green-600">
                                                    <Check className="mr-1 h-3 w-3" />
                                                    Present
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-rose-50 text-rose-600">
                                                    <X className="mr-1 h-3 w-3" />
                                                    Absent
                                                </Badge>
                                            )}
                                        </div>
                                        <div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-rose-500">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Showing 5 of 5 records</div>
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
        </div>
    )
}
