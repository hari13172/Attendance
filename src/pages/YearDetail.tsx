"use client"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { ArrowLeft, GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample years data
const yearsData = [
    { id: 1, name: "1st Year" },
    { id: 2, name: "2nd Year" },
    { id: 3, name: "3rd Year" },
    { id: 4, name: "4th Year" },
]

export function YearDetailPage() {
    const { id: departmentId, yearId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [years] = useState(yearsData)
    const [yearName, setYearName] = useState("")
    const [departmentName, setDepartmentName] = useState("")

    useEffect(() => {
        // Get the year name from location state
        if (location.state?.yearName) {
            setYearName(location.state.yearName)
        }

        // For demo purposes, we'll use a hardcoded department name
        // In a real app, you would fetch this from an API
        const deptId = Number.parseInt(departmentId || "0")
        if (deptId === 1) setDepartmentName("Computer Science")
        else if (deptId === 2) setDepartmentName("Electrical Engineering")
        else if (deptId === 3) setDepartmentName("Mechanical Engineering")
        else if (deptId === 4) setDepartmentName("Civil Engineering")
        else setDepartmentName("Department")

        // Update the page title
        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = `${yearName} - ${departmentName}`
    }, [location.state, departmentId, yearName, departmentName])

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(`/department/${departmentId}`)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{yearName}</h2>
                        <p className="text-sm text-gray-500">{departmentName} Department</p>
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b bg-gray-50/50 px-6">
                    <CardTitle className="text-lg font-medium">Study Years</CardTitle>
                    <CardDescription>Select a year to view students</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                        {years.map((year) => (
                            <Card
                                key={year.id}
                                className="cursor-pointer border transition-colors hover:border-sky-200 hover:bg-sky-50"
                                onClick={() => navigate(`/students?department=${departmentId}&year=${year.id}`)}
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                    <GraduationCap className="mb-4 h-12 w-12 text-sky-500" />
                                    <h3 className="text-lg font-medium">{year.name}</h3>
                                    <p className="text-sm text-gray-500">View students</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
