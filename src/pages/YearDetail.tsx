"use client"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {
    ArrowLeft,
    GraduationCap,
    MoreHorizontal,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react"

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
import { getAuthToken } from "@/api/getAuthToken"

type StudyYear = {
    id: string
    name: string
}

export function YearDetailPage() {
    const { id: departmentId, yearId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [yearName, setYearName] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newYear, setNewYear] = useState("")
    const [error, setError] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [selectedYear, setSelectedYear] = useState<StudyYear | null>(null)

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [yearToDelete, setYearToDelete] = useState<StudyYear | null>(null)

    useEffect(() => {
        if (location.state?.yearName) setYearName(location.state.yearName)

        const deptId = Number.parseInt(departmentId || "0")
        if (deptId === 1) setDepartmentName("Computer Science")
        else if (deptId === 2) setDepartmentName("Electrical Engineering")
        else if (deptId === 3) setDepartmentName("Mechanical Engineering")
        else if (deptId === 4) setDepartmentName("Civil Engineering")
        else setDepartmentName("Department")

        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = `${yearName} - ${departmentName}`
    }, [location.state, departmentId, yearName, departmentName])

    const {
        data: years = [],
        isLoading,
        error: fetchError,
    } = useQuery<StudyYear[]>({
        queryKey: ["years"],
        queryFn: async () => {
            const res = await axios.get("http://10.5.0.2:8001/api/years", {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            })
            return res.data
        },
    })

    const addYearMutation = useMutation({
        mutationFn: async (yearName: string) => {
            return await axios.post(
                "http://10.5.0.2:8001/api/years",
                { name: yearName, batch_id: yearId },
                { headers: { Authorization: `Bearer ${getAuthToken()}` } },
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["years"] })
            toast.success(`Study year "${newYear}" added successfully.`)
            resetDialog()
        },
        onError: () => toast.error("Failed to add year."),
    })

    const updateYearMutation = useMutation({
        mutationFn: async ({ id, name }: { id: string; name: string }) => {
            return await axios.put(
                `http://10.5.0.2:8001/api/batches/${id}`,
                { name },
                { headers: { Authorization: `Bearer ${getAuthToken()}` } },
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["years"] })
            toast.success("Study year updated successfully.")
            resetDialog()
        },
        onError: () => toast.error("Failed to update year."),
    })

    const deleteYearMutation = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`http://10.5.0.2:8001/api/batches/${id}`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["years"] })
            toast.success("Study year deleted successfully.")
            setDeleteDialogOpen(false)
            setYearToDelete(null)
        },
        onError: () => toast.error("Failed to delete year."),
    })

    const handleAddOrEditYear = () => {
        if (!newYear.trim()) {
            setError("Year name is required")
            return
        }

        if (editMode && selectedYear) {
            updateYearMutation.mutate({ id: selectedYear.id, name: newYear })
        } else {
            addYearMutation.mutate(newYear)
        }
    }

    const handleYearClick = (year: StudyYear) => {
        navigate(`/department/${departmentId}/year/${year.id}/sections`, {
            state: { yearName: year.name, departmentName },
        })
    }

    const resetDialog = () => {
        setIsDialogOpen(false)
        setNewYear("")
        setEditMode(false)
        setError("")
        setSelectedYear(null)
    }

    const openEditDialog = (year: StudyYear) => {
        setSelectedYear(year)
        setNewYear(year.name)
        setEditMode(true)
        setIsDialogOpen(true)
    }

    const openDeleteDialog = (year: StudyYear) => {
        setYearToDelete(year)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = () => {
        if (yearToDelete) {
            deleteYearMutation.mutate(yearToDelete.id)
        }
    }

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
                <Button className="gap-2 bg-sky-500 hover:bg-sky-600" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add Year
                </Button>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b  px-6">
                    <CardTitle className="text-lg font-medium">Study Years</CardTitle>
                    <CardDescription>Select a year to view sections</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    {isLoading ? (
                        <p>Loading years...</p>
                    ) : fetchError ? (
                        <p className="text-red-500">Failed to load years.</p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                            {years.map((year) => (
                                <Card key={year.id} className="relative">
                                    <div className="absolute top-2 right-2 z-10">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem onClick={() => openEditDialog(year)}>
                                                    <Pencil className="h-4 w-4 mr-2" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-500 focus:text-red-500"
                                                    onClick={() => openDeleteDialog(year)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CardContent
                                        className="flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-sky-50"
                                        onClick={() => handleYearClick(year)}
                                    >
                                        <GraduationCap className="mb-4 h-12 w-12 text-sky-500" />
                                        <h3 className="text-lg font-medium">{year.name}</h3>
                                        <p className="text-sm text-gray-500">View sections</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={resetDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editMode ? "Edit Study Year" : "Add Study Year"}</DialogTitle>
                        <DialogDescription>
                            {editMode ? "Update the study year name." : "Enter the name of the new study year."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="study-year">Study Year</Label>
                            <Input
                                id="study-year"
                                placeholder="e.g., 1st Year"
                                value={newYear}
                                className={error ? "border-red-500" : ""}
                                onChange={(e) => {
                                    setNewYear(e.target.value)
                                    setError("")
                                }}
                            />
                            {error && <p className="text-xs text-red-500">{error}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={resetDialog}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddOrEditYear}
                            className="bg-sky-500 hover:bg-sky-600"
                            disabled={addYearMutation.isPending || updateYearMutation.isPending}
                        >
                            {editMode
                                ? updateYearMutation.isPending
                                    ? "Updating..."
                                    : "Update Year"
                                : addYearMutation.isPending
                                    ? "Adding..."
                                    : "Add Year"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Delete Study Year</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-red-600">{yearToDelete?.name}</span>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleDeleteConfirm}
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
