"use client"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { ArrowLeft, BookOpen, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"

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

type Section = {
    id: string
    name: string
}

export function SectionsPage() {
    const { id: departmentId, yearId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [yearName, setYearName] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newSection, setNewSection] = useState("")
    const [error, setError] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [sectionToDelete, setSectionToDelete] = useState<Section | null>(null)

    useEffect(() => {
        if (location.state?.yearName) setYearName(location.state.yearName)
        if (location.state?.departmentName) setDepartmentName(location.state.departmentName)

        const pageTitle = document.getElementById("page-title")
        if (pageTitle) pageTitle.textContent = `Sections - ${yearName} - ${departmentName}`
    }, [location.state, yearName, departmentName])

    const {
        data: sections = [],
        isLoading,
        error: fetchError,
    } = useQuery<Section[]>({
        queryKey: ["sections", yearId],
        queryFn: async () => {
            const res = await axios.get(`http://10.5.0.2:8001/api/sections?year_id=${yearId}`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            })
            return res.data
        },
    })

    const addSectionMutation = useMutation({
        mutationFn: async (name: string) => {
            return await axios.post(
                "http://10.5.0.2:8001/api/sections",
                { name, year_id: yearId, department_id: departmentId },
                { headers: { Authorization: `Bearer ${getAuthToken()}` } }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections", yearId] })
            toast.success(`Section "${newSection}" added successfully.`)
            resetDialog()
        },
        onError: () => toast.error("Failed to add section."),
    })

    const updateSectionMutation = useMutation({
        mutationFn: async ({ id, name }: { id: string; name: string }) => {
            return await axios.put(
                `http://10.5.0.2:8001/api/sections/${id}`,
                { name, year_id: yearId },
                { headers: { Authorization: `Bearer ${getAuthToken()}` } }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections", yearId] })
            toast.success("Section updated.")
            resetDialog()
        },
        onError: () => toast.error("Failed to update section."),
    })

    const deleteSectionMutation = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`http://10.5.0.2:8001/api/sections/${id}`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sections", yearId] })
            toast.success("Section deleted.")
            setDeleteDialogOpen(false)
            setSectionToDelete(null)
        },
        onError: () => toast.error("Failed to delete section."),
    })

    const handleSectionClick = (section: Section) => {
        navigate(`/students?department=${departmentId}&year=${yearId}&section=${section.id}`)
    }

    const handleAddOrUpdateSection = () => {
        if (!newSection.trim()) {
            setError("Section name is required")
            return
        }

        if (editMode && selectedSection) {
            updateSectionMutation.mutate({ id: selectedSection.id, name: newSection })
        } else {
            addSectionMutation.mutate(newSection)
        }
    }

    const openEditDialog = (section: Section) => {
        setNewSection(section.name)
        setSelectedSection(section)
        setEditMode(true)
        setIsDialogOpen(true)
    }

    const openDeleteDialog = (section: Section) => {
        setSectionToDelete(section)
        setDeleteDialogOpen(true)
    }

    const resetDialog = () => {
        setNewSection("")
        setSelectedSection(null)
        setError("")
        setEditMode(false)
        setIsDialogOpen(false)
    }

    const confirmDelete = () => {
        if (sectionToDelete) {
            deleteSectionMutation.mutate(sectionToDelete.id)
        }
    }


    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(`/department/${departmentId}/year/${yearId}`)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Sections - {yearName}</h2>
                        <p className="text-sm text-gray-500">{departmentName} Department</p>
                    </div>
                </div>
                <Button className="gap-2 bg-sky-500 hover:bg-sky-600" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add Section
                </Button>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b px-6">
                    <CardTitle className="text-lg font-medium">Sections</CardTitle>
                    <CardDescription>Select a section to view students</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    {isLoading ? (
                        <p>Loading sections...</p>
                    ) : fetchError ? (
                        <p className="text-red-500">Failed to load sections.</p>
                    ) : sections.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No sections found. Add a section to get started.</p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                            {sections.map((section) => (
                                <Card key={section.id} className="relative">
                                    <div className="absolute top-2 right-2 z-10">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem onClick={() => openEditDialog(section)}>
                                                    <Pencil className="h-4 w-4 mr-2" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-500 focus:text-red-500"
                                                    onClick={() => openDeleteDialog(section)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CardContent
                                        className="flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-sky-50"
                                        onClick={() => handleSectionClick(section)}
                                    >
                                        <BookOpen className="mb-4 h-12 w-12 text-sky-500" />
                                        <h3 className="text-lg font-medium">{section.name}</h3>
                                        <p className="text-sm text-gray-500">View students</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Section Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={resetDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editMode ? "Edit Section" : "Add Section"}</DialogTitle>
                        <DialogDescription>
                            {editMode ? "Update the section name." : "Enter the name of the new section."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="section-name">Section Name</Label>
                            <Input
                                id="section-name"
                                placeholder="e.g., Section A"
                                className={error ? "border-red-500" : ""}
                                value={newSection}
                                onChange={(e) => {
                                    setNewSection(e.target.value)
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
                            onClick={handleAddOrUpdateSection}
                            className="bg-sky-500 hover:bg-sky-600"
                            disabled={addSectionMutation.isPending || updateSectionMutation.isPending}
                        >
                            {editMode
                                ? updateSectionMutation.isPending
                                    ? "Updating..."
                                    : "Update Section"
                                : addSectionMutation.isPending
                                    ? "Adding..."
                                    : "Add Section"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Section</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-red-600">{sectionToDelete?.name}</span>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={confirmDelete}
                            disabled={deleteSectionMutation.isPending}
                        >
                            {deleteSectionMutation.isPending ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
