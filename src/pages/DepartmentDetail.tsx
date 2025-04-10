"use client"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, ArrowLeft, Plus } from "lucide-react"
import { getAuthToken } from "@/api/getAuthToken"

type AcademicYear = {
    id: string
    name: string
    department_id: string
}

export function DepartmentDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [isAddYearOpen, setIsAddYearOpen] = useState(false)
    const [newYear, setNewYear] = useState("")
    const [error, setError] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [yearToDelete, setYearToDelete] = useState<AcademicYear | null>(null)

    const {
        data: academicYears = [],
        isLoading,
        error: fetchError,
    } = useQuery<AcademicYear[]>({
        queryKey: ["batches"],
        queryFn: async () => {
            const res = await axios.get("http://10.5.0.2:8001/api/batches", {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            })
            return res.data
        },
    })

    const addYearMutation = useMutation({
        mutationFn: async (year: string) => {
            return await axios.post(
                "http://10.5.0.2:8001/api/batches",
                { name: year, department_id: id },
                {
                    headers: { Authorization: `Bearer ${getAuthToken()}` },
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["batches"] })
            toast("Success", {
                description: `${newYear} has been added successfully.`,
            })
            setNewYear("")
            setIsAddYearOpen(false)
        },
        onError: () => {
            toast("Error", {
                description: "Failed to add academic year.",
            })
        },
    })

    const updateYearMutation = useMutation({
        mutationFn: async ({ id, name }: { id: string; name: string }) => {
            return await axios.put(
                `http://10.5.0.2:8001/api/departments/${id}`,
                { name },
                {
                    headers: { Authorization: `Bearer ${getAuthToken()}` },
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["batches"] })
            toast("Success", { description: "Academic year updated." })
            setNewYear("")
            setEditMode(false)
            setIsAddYearOpen(false)
            setSelectedYear(null)
        },
        onError: () => {
            toast("Error", { description: "Failed to update academic year." })
        },
    })

    const deleteYearMutation = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`http://10.5.0.2:8001/api/departments/${id}`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["batches"] })
            toast("Deleted", { description: "Academic year deleted successfully." })
            setIsDeleteOpen(false)
            setYearToDelete(null)
        },
        onError: () => {
            toast("Error", { description: "Failed to delete academic year." })
        },
    })

    const handleAddYear = () => {
        if (!newYear.trim()) {
            setError("Academic year is required")
            return
        }

        const yearPattern = /^\d{4}-\d{4}$/
        if (!yearPattern.test(newYear)) {
            setError("Academic year must be in format YYYY-YYYY")
            return
        }

        if (editMode && selectedYear) {
            updateYearMutation.mutate({ id: selectedYear.id, name: newYear })
        } else {
            addYearMutation.mutate(newYear)
        }
    }

    const handleEditYear = (year: AcademicYear) => {
        setNewYear(year.name)
        setSelectedYear(year)
        setEditMode(true)
        setIsAddYearOpen(true)
    }

    const handleDeleteYear = (year: AcademicYear) => {
        setYearToDelete(year)
        setIsDeleteOpen(true)
    }

    const confirmDelete = () => {
        if (yearToDelete) {
            deleteYearMutation.mutate(yearToDelete.id)
        }
    }

    const handleYearClick = (yearId: string, yearName: string) => {
        navigate(`/department/${id}/year/${yearId}`, { state: { yearName } })
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate("/settings")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Department ID: {id}</h2>
                        <p className="text-sm text-gray-500">Manage academic years for this department</p>
                    </div>
                </div>
                <Button className="gap-2 bg-sky-500 hover:bg-sky-600" onClick={() => setIsAddYearOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add Academic Year
                </Button>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b  px-6">
                    <CardTitle className="text-lg font-medium">Academic Years</CardTitle>
                    <CardDescription>Select a year to view students or manage it</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    {isLoading ? (
                        <p>Loading academic years...</p>
                    ) : fetchError ? (
                        <p className="text-red-500">Failed to load academic years</p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {academicYears.map((year) => (
                                <Card key={year.id} className="relative w-[180px]">
                                    <div className="absolute right-2 top-2 z-10">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost" className="h-6 w-6 p-0">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem
                                                    className="flex items-center gap-2"
                                                    onClick={() => handleEditYear(year)}
                                                >
                                                    <Pencil className="h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="flex items-center gap-2 text-red-500 focus:text-red-500"
                                                    onClick={() => handleDeleteYear(year)}
                                                >
                                                    <Trash2 className="h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CardContent
                                        className="flex flex-col items-center justify-center p-6 text-center cursor-pointer"
                                        onClick={() => handleYearClick(year.id, year.name)}
                                    >
                                        <h3 className="text-lg font-medium">{year.name}</h3>
                                        <p className="text-sm text-gray-500">View students</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Year Dialog */}
            <Dialog open={isAddYearOpen} onOpenChange={(open) => {
                setIsAddYearOpen(open)
                if (!open) {
                    setNewYear("")
                    setError("")
                    setEditMode(false)
                    setSelectedYear(null)
                }
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editMode ? "Edit Academic Year" : "Add Academic Year"}</DialogTitle>
                        <DialogDescription>
                            {editMode
                                ? "Update the academic year name."
                                : "Enter a new academic year to associate with this department."}
                        </DialogDescription>
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
                            {editMode ? "Update Year" : "Add Year"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Academic Year</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-red-600">{yearToDelete?.name}</span>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                            disabled={deleteYearMutation.isPending}
                        >
                            {deleteYearMutation.isPending ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
