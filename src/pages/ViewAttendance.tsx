"use client"
import { useEffect, useState } from "react"
import { Download, Filter, Printer, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample students data
const studentsData = [
    {
        id: 1,
        rollNo: "CS2023001",
        name: "John Smith",
        avatar: "JS",
        department: "Computer Science",
    },
    {
        id: 2,
        rollNo: "CS2023002",
        name: "Alice Parker",
        avatar: "AP",
        department: "Computer Science",
    },
    {
        id: 3,
        rollNo: "CS2023003",
        name: "Robert Johnson",
        avatar: "RJ",
        department: "Computer Science",
    },
    {
        id: 4,
        rollNo: "EE2023001",
        name: "Emily Davis",
        avatar: "ED",
        department: "Electrical Engineering",
    },
    {
        id: 5,
        rollNo: "EE2023002",
        name: "Michael Wilson",
        avatar: "MW",
        department: "Electrical Engineering",
    },
]

export function ViewAttendancePage() {
    const [date, setDate] = useState("2025-04-10")
    const [searchQuery, setSearchQuery] = useState("")
    const [department, setDepartment] = useState("all-departments")
    const [students, setStudents] = useState(studentsData)
    const [filteredStudents, setFilteredStudents] = useState(studentsData)
    const [attendanceData, setAttendanceData] = useState<Record<string, Record<string, Record<number, boolean>>>>({})

    // Load attendance data from localStorage
    useEffect(() => {
        const storedAttendance = localStorage.getItem("attendanceData")
        if (storedAttendance) {
            try {
                const parsedData = JSON.parse(storedAttendance)
                setAttendanceData(parsedData)
            } catch (error) {
                console.error("Failed to parse stored attendance data:", error)
            }
        }
    }, [])

    // Update the page title
    useEffect(() => {
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "View Attendance"
    }, [])

    // Filter students based on search query and department
    useEffect(() => {
        let result = [...studentsData]

        if (searchQuery) {
            result = result.filter(
                (student) =>
                    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        if (department !== "all-departments") {
            result = result.filter((student) => student.department.toLowerCase().replace(/\s+/g, "-") === department)
        }

        setFilteredStudents(result)
    }, [searchQuery, department])

    // Helper function to get attendance status
    const getAttendanceStatus = (studentId: number, period: string) => {
        if (attendanceData[date] && attendanceData[date][period]) {
            return attendanceData[date][period][studentId] ?? true
        }
        return true // Default to present if no data
    }

    // Calculate attendance percentage for a student
    const calculateAttendancePercentage = (studentId: number) => {
        if (!attendanceData[date]) return 100

        let presentCount = 0
        let totalPeriods = 0

        for (let period = 1; period <= 7; period++) {
            if (attendanceData[date][period.toString()]) {
                totalPeriods++
                if (attendanceData[date][period.toString()][studentId] ?? true) {
                    presentCount++
                }
            }
        }

        return totalPeriods > 0 ? Math.round((presentCount / totalPeriods) * 100) : 100
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">View Attendance</h2>
                    <p className="text-sm text-gray-500">View and analyze student attendance records</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Printer className="h-4 w-4" />
                        Print
                    </Button>
                    <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b bg-gray-50/50 px-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <CardTitle className="text-lg font-medium">Attendance Records</CardTitle>
                            <CardDescription>View attendance for {date}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 flex-col gap-4 md:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Search students..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
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
                            <Select value={department} onValueChange={setDepartment}>
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

                        <div className="overflow-x-auto rounded-lg border">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Period 1</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Period 2</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Period 3</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Period 4</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Period 5</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Period 6</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Period 7</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Attendance %</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student) => (
                                            <tr key={student.id}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8 border">
                                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={student.name} />
                                                            <AvatarFallback className="bg-gray-100">{student.avatar}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm font-medium">{student.name}</div>
                                                            <div className="text-xs text-gray-500">{student.rollNo}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {[1, 2, 3, 4, 5, 6, 7].map((period) => (
                                                    <td key={period} className="px-4 py-4 text-center">
                                                        <span
                                                            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${getAttendanceStatus(student.id, period.toString())
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-rose-100 text-rose-800"
                                                                }`}
                                                        >
                                                            {getAttendanceStatus(student.id, period.toString()) ? "P" : "A"}
                                                        </span>
                                                    </td>
                                                ))}
                                                <td className="px-4 py-4 text-center">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${calculateAttendancePercentage(student.id) >= 90
                                                            ? "bg-green-100 text-green-800"
                                                            : calculateAttendancePercentage(student.id) >= 75
                                                                ? "bg-amber-100 text-amber-800"
                                                                : "bg-rose-100 text-rose-800"
                                                            }`}
                                                    >
                                                        {calculateAttendancePercentage(student.id)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                                                No students found matching the current filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing {filteredStudents.length} of {studentsData.length} students
                            </div>
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
