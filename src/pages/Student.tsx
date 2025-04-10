"use client"
import { useEffect, useState } from "react"
import type React from "react"

import {
    ChevronDown,
    Download,
    Edit,
    Filter,
    GraduationCap,
    MoreHorizontal,
    PlusCircle,
    Search,
    Trash,
    Upload,
    User,
} from "lucide-react"

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
    const [students, setStudents] = useState(studentsData)
    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<(typeof studentsData)[0] | null>(null)
    const [newStudent, setNewStudent] = useState({
        name: "",
        rollNo: "",
        section: "A",
        department: "Computer Science",
        year: "1st Year",
    })
    const [errors, setErrors] = useState({
        name: "",
        rollNo: "",
    })

    useEffect(() => {
        // Update the page title
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "Students"
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewStudent((prev) => ({ ...prev, [name]: value }))
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = {
            name: "",
            rollNo: "",
        }
        let isValid = true

        if (!newStudent.name.trim()) {
            newErrors.name = "Name is required"
            isValid = false
        }

        if (!newStudent.rollNo.trim()) {
            newErrors.rollNo = "Roll No is required"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleAddStudent = () => {
        if (!validateForm()) return

        const newStudentData = {
            id: students.length + 1,
            ...newStudent,
            avatar: newStudent.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
            attendance: Math.floor(Math.random() * 20) + 80, // Random attendance between 80-100
        }

        setStudents((prev) => [...prev, newStudentData])
        setNewStudent({
            name: "",
            rollNo: "",
            section: "A",
            department: "Computer Science",
            year: "1st Year",
        })
        setIsAddStudentOpen(false)
    }

    const handleDeleteStudent = () => {
        if (selectedStudent) {
            setStudents((prev) => prev.filter((student) => student.id !== selectedStudent.id))
            setIsDeleteDialogOpen(false)
            setSelectedStudent(null)
        }
    }

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
                    <Button onClick={() => setIsAddStudentOpen(true)} className="gap-2 bg-sky-500 hover:bg-sky-600">
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
                                {students.map((student) => (
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
                                                className={`h-2 w-16 bg-gray-100 ${student.attendance >= 90
                                                        ? "indicator-green"
                                                        : student.attendance >= 80
                                                            ? "indicator-amber"
                                                            : "indicator-rose"
                                                    }`}
                                            />
                                            <span className="text-sm font-medium">{student.attendance}%</span>
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
                                                    setSelectedStudent(student)
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
                                                    <DropdownMenuItem>View Attendance</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-rose-500"
                                                        onClick={() => {
                                                            setSelectedStudent(student)
                                                            setIsDeleteDialogOpen(true)
                                                        }}
                                                    >
                                                        Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Showing {students.length} of 248 students</div>
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

            {/* Add Student Dialog */}
            <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>Enter the details for the new student.</DialogDescription>
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
                                    value={newStudent.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rollNo">Roll Number</Label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="rollNo"
                                    name="rollNo"
                                    placeholder="Enter roll number"
                                    className={`pl-10 ${errors.rollNo ? "border-red-500" : ""}`}
                                    value={newStudent.rollNo}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.rollNo && <p className="text-xs text-red-500">{errors.rollNo}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="section">Section</Label>
                            <Select
                                value={newStudent.section}
                                onValueChange={(value) => setNewStudent((prev) => ({ ...prev, section: value }))}
                            >
                                <SelectTrigger id="section">
                                    <SelectValue placeholder="Select section" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A">Section A</SelectItem>
                                    <SelectItem value="B">Section B</SelectItem>
                                    <SelectItem value="C">Section C</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select
                                value={newStudent.department}
                                onValueChange={(value) => setNewStudent((prev) => ({ ...prev, department: value }))}
                            >
                                <SelectTrigger id="department">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Select
                                value={newStudent.year}
                                onValueChange={(value) => setNewStudent((prev) => ({ ...prev, year: value }))}
                            >
                                <SelectTrigger id="year">
                                    <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1st Year">1st Year</SelectItem>
                                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                                    <SelectItem value="4th Year">4th Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddStudent} className="bg-sky-500 hover:bg-sky-600">
                            Add Student
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Student Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Student</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this student? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {selectedStudent && (
                            <div className="flex items-center gap-3 rounded-lg border p-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarFallback>{selectedStudent.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{selectedStudent.name}</p>
                                    <p className="text-sm text-gray-500">{selectedStudent.rollNo}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteStudent}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
