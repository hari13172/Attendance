"use client"
import { useEffect } from "react"
import { ChevronDown, Download, Edit, Filter, MoreHorizontal, PlusCircle, Search, Trash, Upload } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const studentsData = [
    {
        id: 1,
        rollNo: "CS2023001",
        name: "John Smith",
        avatar: "JS",
        section: "A",
        department: "Computer Science",
        year: "2nd Year",
        attendance: 92,
    },
    {
        id: 2,
        rollNo: "CS2023002",
        name: "Alice Parker",
        avatar: "AP",
        section: "A",
        department: "Computer Science",
        year: "2nd Year",
        attendance: 88,
    },
    {
        id: 3,
        rollNo: "CS2023003",
        name: "Robert Johnson",
        avatar: "RJ",
        section: "B",
        department: "Computer Science",
        year: "2nd Year",
        attendance: 78,
    },
    {
        id: 4,
        rollNo: "EE2023001",
        name: "Emily Davis",
        avatar: "ED",
        section: "A",
        department: "Electrical Engineering",
        year: "2nd Year",
        attendance: 95,
    },
    {
        id: 5,
        rollNo: "EE2023002",
        name: "Michael Wilson",
        avatar: "MW",
        section: "B",
        department: "Electrical Engineering",
        year: "2nd Year",
        attendance: 85,
    },
]

export default function StudentsPage() {
    useEffect(() => {
        // Update the page title
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "Students"
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
                    <p className="text-sm text-gray-500">Manage and track student information</p>
                </div>
                <div className="flex gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Export
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export as CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export as Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export as PDF
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Import
                    </Button>
                    <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                        <PlusCircle className="h-4 w-4" />
                        Add Student
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b bg-gray-50/50 px-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <CardTitle className="text-lg font-medium">Students Directory</CardTitle>
                            <CardDescription>View and manage all students</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input placeholder="Search students..." className="pl-10" />
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row">
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
                                <Select defaultValue="all-years">
                                    <SelectTrigger className="w-full md:w-[200px]">
                                        <SelectValue placeholder="All Years" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all-years">All Years</SelectItem>
                                        <SelectItem value="first-year">First Year</SelectItem>
                                        <SelectItem value="second-year">Second Year</SelectItem>
                                        <SelectItem value="third-year">Third Year</SelectItem>
                                        <SelectItem value="fourth-year">Fourth Year</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    <span className="hidden sm:inline">Filter</span>
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-lg border">
                            <div className="grid grid-cols-7 border-b bg-gray-50 px-6 py-3">
                                <div className="text-sm font-medium text-gray-500">Section</div>
                                <div className="col-span-2 text-sm font-medium text-gray-500">Name</div>
                                <div className="text-sm font-medium text-gray-500">Department</div>
                                <div className="text-sm font-medium text-gray-500">Year</div>
                                <div className="text-sm font-medium text-gray-500">Attendance %</div>
                                <div className="text-sm font-medium text-gray-500">Actions</div>
                            </div>
                            <div className="divide-y">
                                {studentsData.map((student) => (
                                    <div key={student.id} className="grid grid-cols-7 items-center px-6 py-4">
                                        <div className="text-sm font-medium">{student.section}</div>
                                        <div className="col-span-2 flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={student.name} />
                                                <AvatarFallback className="bg-gray-100">{student.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-sm font-medium">{student.name}</div>
                                                <div className="text-xs text-gray-500">{student.rollNo}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">{student.department}</div>
                                        <div className="text-sm text-gray-600">{student.year}</div>
                                        <div className="flex items-center gap-2">
                                            <Progress
                                                value={student.attendance}
                                                // className="h-2 w-16 bg-gray-100"
                                                className={`h-2 w-16 bg-gray-100 ${student.attendance >= 90
                                                    ? "indicator-green-500"
                                                    : student.attendance >= 80
                                                        ? "indicator-amber-500"
                                                        : "indicator-rose-500"
                                                    }`}
                                            />
                                            <span className="text-sm font-medium">{student.attendance}%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500">
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
                                                    <DropdownMenuItem>View Attendance</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-rose-500">Remove</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Showing 5 of 248 students</div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm">
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
