"use client"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ArrowLeft, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
import { toast } from "sonner"

// Sample department data
const departmentsData = [
    { id: 1, name: "Computer Science", code: "CS" },
    { id: 2, name: "Electrical Engineering", code: "EE" },
    { id: 3, name: "Mechanical Engineering", code: "ME" },
    { id: 4, name: "Civil Engineering", code: "CE" },
]

// Sample academic years
const initialAcademicYears = [
    { id: 1, name: "2024-2025" },
    { id: 2, name: "2023-2024" },
    { id: 3, name: "2022-2023" },
    { id: 4, name: "2021-2022" },
]

export function DepartmentDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [academicYears, setAcademicYears] = useState(initialAcademicYears)
    const [isAddYearOpen, setIsAddYearOpen] = useState(false)
    const [newYear, setNewYear] = useState("")
    const [error, setError] = useState("")

    const department = departmentsData.find((dept) => dept.id === Number(id))

    useEffect(() => {
        // Update the page title
        const pageTitle = document.getElementById("page-title")
        if (pageTitle && department) pageTitle.textContent = department.name
    }, [department])

    useEffect(() => {
        if (!department) {
            // Redirect to settings if department not found
            navigate("/settings")
        }
    }, [department, navigate])

    const handleAddYear = () => {
        if (!newYear.trim()) {
            setError("Academic year is required")
            return
        }

        // Validate year format (YYYY-YYYY)
        const yearPattern = /^\d{4}-\d{4}$/
        if (!yearPattern.test(newYear)) {
            setError("Academic year must be in format YYYY-YYYY")
            return
        }

        const newYearData = {
            id: academicYears.length + 1,
            name: newYear,
        }

        setAcademicYears((prev) => [...prev, newYearData])
        setNewYear("")
        setIsAddYearOpen(false)

        toast("success", {
            description: `${newYear} has been added successfully.`,
            duration: 3000,
        })
    }

    const handleYearClick = (yearId: number, yearName: string) => {
        if (department) {
            navigate(`/department/${department.id}/year/${yearId}`, { state: { yearName } })
        }
    }

    if (!department) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate("/settings")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{department.name}</h2>
                        <p className="text-sm text-gray-500">Department Code: {department.code}</p>
                    </div>
                </div>
                <Button className="gap-2 bg-sky-500 hover:bg-sky-600" onClick={() => setIsAddYearOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add Academic Year
                </Button>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b bg-gray-50/50 px-6">
                    <CardTitle className="text-lg font-medium">Academic Years</CardTitle>
                    <CardDescription>Select an academic year to view details</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-wrap gap-4">
                        {academicYears.map((year) => (
                            <Badge
                                key={year.id}
                                variant="outline"
                                className="cursor-pointer px-4 py-2 text-base hover:bg-sky-50"
                                onClick={() => handleYearClick(year.id, year.name)}
                            >
                                {year.name}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Add Academic Year Dialog */}
            <Dialog open={isAddYearOpen} onOpenChange={setIsAddYearOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Academic Year</DialogTitle>
                        <DialogDescription>Enter the new academic year.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="academic-year">Academic Year</Label>
                            <Input
                                id="academic-year"
                                placeholder="e.g., 2024-2025"
                                className={error ? "border-red-500" : ""}
                                value={newYear}
                                onChange={(e) => {
                                    setNewYear(e.target.value)
                                    setError("")
                                }}
                            />
                            {error && <p className="text-xs text-red-500">{error}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddYearOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddYear} className="bg-sky-500 hover:bg-sky-600">
                            Add Year
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
