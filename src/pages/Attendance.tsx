"use client"
import { useEffect, useState } from "react"
import { CalendarIcon, MoreHorizontal, Search, UsersRound } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

// Sample data
const studentsData = [
    {
        id: 1,
        rollNo: "CS2023001",
        name: "John Smith",
        avatar: "JS",
        department: "Computer Science",
        status: true,
    },
    {
        id: 2,
        rollNo: "CS2023002",
        name: "Alice Parker",
        avatar: "AP",
        department: "Computer Science",
        status: true,
    },
    {
        id: 3,
        rollNo: "CS2023003",
        name: "Robert Johnson",
        avatar: "RJ",
        department: "Computer Science",
        status: true,
    },
    {
        id: 4,
        rollNo: "EE2023001",
        name: "Emily Davis",
        avatar: "ED",
        department: "Electrical Engineering",
        status: true,
    },
    {
        id: 5,
        rollNo: "EE2023002",
        name: "Michael Wilson",
        avatar: "MW",
        department: "Electrical Engineering",
        status: true,
    },
]

export function AttendancePage() {
    const [date, setDate] = useState("2025-04-10")
    const [selectedPeriod, setSelectedPeriod] = useState("1")
    const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false)
    const [isBatchAttendanceOpen, setIsBatchAttendanceOpen] = useState(false)
    const [students, setStudents] = useState(studentsData)
    const [filteredStudents, setFilteredStudents] = useState(studentsData)
    const [periodAttendance, setPeriodAttendance] = useState<Record<string, Record<number, Record<number, boolean>>>>({})
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("all-departments")

    // Load attendance data from localStorage on component mount
    useEffect(() => {
        const storedAttendance = localStorage.getItem("attendanceData")
        if (storedAttendance) {
            try {
                const parsedData = JSON.parse(storedAttendance)
                setPeriodAttendance(parsedData)
            } catch (error) {
                console.error("Failed to parse stored attendance data:", error)
            }
        }
    }, [])

    // Update the page title
    useEffect(() => {
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = "Attendance"
    }, [])

    // Initialize period attendance for the selected date and period
    useEffect(() => {
        // Check if we have data for this date and period
        if (!periodAttendance[date]) {
            // Initialize data for this date
            setPeriodAttendance((prev) => ({
                ...prev,
                [date]: {
                    ...(prev[date] || {}),
                },
            }))
        }

        if (!periodAttendance[date]?.[Number(selectedPeriod)]) {
            // Initialize data for this period with all students present
            const initialAttendance: Record<number, boolean> = {}
            students.forEach((student) => {
                initialAttendance[student.id] = true
            })

            setPeriodAttendance((prev) => ({
                ...prev,
                [date]: {
                    ...(prev[date] || {}),
                    [selectedPeriod]: initialAttendance,
                },
            }))
        }
    }, [date, selectedPeriod, students, periodAttendance])

    // Apply filters to students
    useEffect(() => {
        let result = [...students]

        // Apply search filter
        if (searchQuery) {
            result = result.filter(
                (student) =>
                    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Apply department filter
        if (selectedDepartment !== "all-departments") {
            result = result.filter((student) => student.department.toLowerCase().replace(/\s+/g, "-") === selectedDepartment)
        }

        // Apply tab filter (present/absent)
        if (activeTab !== "all" && periodAttendance[date]?.[Number(selectedPeriod)]) {
            result = result.filter((student) => {
                const isPresent = periodAttendance[date]?.[Number(selectedPeriod)]?.[student.id] ?? true
                return activeTab === "present" ? isPresent : !isPresent
            })
        }

        setFilteredStudents(result)
    }, [students, searchQuery, selectedDepartment, activeTab, periodAttendance, date, selectedPeriod])

    const handleStatusChange = (studentId: number, checked: boolean) => {
        setPeriodAttendance((prev) => ({
            ...prev,
            [date]: {
                ...(prev[date] || {}),
                [selectedPeriod]: {
                    ...(prev[date]?.[Number(selectedPeriod)] || {}),
                    [studentId]: checked,
                },
            },
        }))
    }

    const handleSaveAttendance = () => {
        // Save to localStorage
        localStorage.setItem("attendanceData", JSON.stringify(periodAttendance))

        // Close dialogs if open
        if (isMarkAttendanceOpen) setIsMarkAttendanceOpen(false)
        if (isBatchAttendanceOpen) setIsBatchAttendanceOpen(false)

        // Show success message
        toast("Attendance Saved", {
            description: `Attendance for Period ${selectedPeriod} on ${date} has been saved successfully.`,
            duration: 3000,
        })
    }

    const handleBatchAttendance = (status: boolean) => {
        const updatedAttendance: Record<number, boolean> = {}
        students.forEach((student) => {
            updatedAttendance[student.id] = status
        })

        setPeriodAttendance((prev) => ({
            ...prev,
            [date]: {
                ...(prev[date] || {}),
                [selectedPeriod]: updatedAttendance,
            },
        }))
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Attendance Tracking</h2>
                    <p className="text-sm text-gray-500">Manage and track student attendance</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setIsBatchAttendanceOpen(true)} className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                        <UsersRound className="h-4 w-4" />
                        Batch Attendance
                    </Button>
                    <Button onClick={() => setIsMarkAttendanceOpen(true)} className="gap-2 bg-sky-500 hover:bg-sky-600">
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
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
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
                                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                        <SelectTrigger className="w-full md:w-[150px]">
                                            <SelectValue placeholder="Select Period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Period 1</SelectItem>
                                            <SelectItem value="2">Period 2</SelectItem>
                                            <SelectItem value="3">Period 3</SelectItem>
                                            <SelectItem value="4">Period 4</SelectItem>
                                            <SelectItem value="5">Period 5</SelectItem>
                                            <SelectItem value="6">Period 6</SelectItem>
                                            <SelectItem value="7">Period 7</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
                                <div className="text-sm font-medium text-gray-500">Attendance</div>
                                <div className="text-sm font-medium text-gray-500">Actions</div>
                            </div>
                            <div className="divide-y">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => {
                                        const isPresent = periodAttendance[date]?.[Number(selectedPeriod)]?.[student.id] ?? true
                                        return (
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
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`attendance-${student.id}`}
                                                        checked={isPresent}
                                                        onCheckedChange={(checked) => handleStatusChange(student.id, checked as boolean)}
                                                    />
                                                    <Label
                                                        htmlFor={`attendance-${student.id}`}
                                                        className={`text-sm font-medium ${isPresent ? "text-green-600" : "text-rose-600"}`}
                                                    >
                                                        {isPresent ? "Present" : "Absent"}
                                                    </Label>
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
                                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                                            <DropdownMenuItem>View All Periods</DropdownMenuItem>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="px-6 py-8 text-center text-gray-500">
                                        No students found matching the current filters.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing {filteredStudents.length} of {students.length} records
                            </div>
                            <Button onClick={handleSaveAttendance} className="gap-2 bg-sky-500 hover:bg-sky-600">
                                Save Attendance
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Mark Attendance Dialog */}
            <Dialog open={isMarkAttendanceOpen} onOpenChange={setIsMarkAttendanceOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Mark Attendance</DialogTitle>
                        <DialogDescription>
                            Mark attendance for Period {selectedPeriod} on {date}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[400px] overflow-y-auto py-4">
                        <div className="space-y-4">
                            {students.map((student) => {
                                const isPresent = periodAttendance[date]?.[Number(selectedPeriod)]?.[student.id] ?? true
                                return (
                                    <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border">
                                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={student.name} />
                                                <AvatarFallback className="bg-gray-100">{student.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{student.name}</p>
                                                <p className="text-xs text-gray-500">{student.rollNo}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={`dialog-attendance-${student.id}`}
                                                checked={isPresent}
                                                onCheckedChange={(checked) => handleStatusChange(student.id, checked as boolean)}
                                            />
                                            <Label
                                                htmlFor={`dialog-attendance-${student.id}`}
                                                className={`text-sm font-medium ${isPresent ? "text-green-600" : "text-rose-600"}`}
                                            >
                                                {isPresent ? "Present" : "Absent"}
                                            </Label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsMarkAttendanceOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveAttendance} className="bg-sky-500 hover:bg-sky-600">
                            Save Attendance
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Batch Attendance Dialog */}
            <Dialog open={isBatchAttendanceOpen} onOpenChange={setIsBatchAttendanceOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Batch Attendance</DialogTitle>
                        <DialogDescription>Mark attendance for all students in Period {selectedPeriod}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-4">
                            <div className="rounded-lg border p-4">
                                <p className="mb-4 text-sm">Select attendance status for all students:</p>
                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => handleBatchAttendance(true)}
                                        className="flex-1 gap-2 bg-green-500 hover:bg-green-600"
                                    >
                                        All Present
                                    </Button>
                                    <Button
                                        onClick={() => handleBatchAttendance(false)}
                                        className="flex-1 gap-2 bg-rose-500 hover:bg-rose-600"
                                    >
                                        All Absent
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg border p-4">
                                <div className="space-y-2">
                                    <Label htmlFor="batch-period">Period</Label>
                                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                        <SelectTrigger id="batch-period">
                                            <SelectValue placeholder="Select Period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Period 1</SelectItem>
                                            <SelectItem value="2">Period 2</SelectItem>
                                            <SelectItem value="3">Period 3</SelectItem>
                                            <SelectItem value="4">Period 4</SelectItem>
                                            <SelectItem value="5">Period 5</SelectItem>
                                            <SelectItem value="6">Period 6</SelectItem>
                                            <SelectItem value="7">Period 7</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                        <SelectTrigger id="department">
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all-departments">All Departments</SelectItem>
                                            <SelectItem value="computer-science">Computer Science</SelectItem>
                                            <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBatchAttendanceOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveAttendance} className="bg-sky-500 hover:bg-sky-600">
                            Apply
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
