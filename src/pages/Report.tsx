"use client"
import { useEffect } from "react"
import { BarChart, Calendar, ChevronDown, Download, FileText, Filter, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  useEffect(() => {
    // Update the page title
    const pageTitle = document.getElementById("page-title")
    if (pageTitle) pageTitle.textContent = "Reports"
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Attendance Reports</h2>
          <p className="text-sm text-gray-500">Generate and analyze attendance reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                <Download className="h-4 w-4" />
                Export Report
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-gray-50/50 px-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <CardTitle className="text-lg font-medium">Daily Report</CardTitle>
                  <CardDescription>Generate attendance report for a specific date</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date:
                  </label>
                  <div className="flex gap-2">
                    <Input type="date" id="date" defaultValue="2025-04-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department:
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                    <Filter className="h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none bg-gradient-to-br from-blue-50 to-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">248</div>
              </CardContent>
            </Card>
            <Card className="border-none bg-gradient-to-br from-green-50 to-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">215</div>
              </CardContent>
            </Card>
            <Card className="border-none bg-gradient-to-br from-rose-50 to-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">33</div>
              </CardContent>
            </Card>
            <Card className="border-none bg-gradient-to-br from-amber-50 to-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">86.7%</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-gray-50/50 px-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <CardTitle className="text-lg font-medium">Department Breakdown</CardTitle>
                  <CardDescription>Attendance by department for April 10, 2025</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full rounded-lg bg-gray-50 p-4 flex items-center justify-center">
                <div className="flex items-center gap-2 text-gray-500">
                  <BarChart className="h-5 w-5" />
                  <span>Chart visualization would appear here</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50/50 p-4">
              <div className="flex w-full items-center justify-between">
                <div className="text-sm text-gray-500">
                  <Calendar className="mr-2 inline-block h-4 w-4" />
                  Report generated for April 10, 2025
                </div>
                <Button variant="outline" size="sm">
                  View Detailed Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-gray-50/50 px-6">
              <CardTitle className="text-lg font-medium">Weekly Report</CardTitle>
              <CardDescription>Select a week to generate the report</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center p-12 text-gray-500">
                Weekly report configuration would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-gray-50/50 px-6">
              <CardTitle className="text-lg font-medium">Monthly Report</CardTitle>
              <CardDescription>Select a month to generate the report</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center p-12 text-gray-500">
                Monthly report configuration would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-gray-50/50 px-6">
              <CardTitle className="text-lg font-medium">Custom Report</CardTitle>
              <CardDescription>Select a custom date range</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center p-12 text-gray-500">
                Custom report configuration would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
