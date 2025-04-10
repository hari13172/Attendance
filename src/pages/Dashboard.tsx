"use client"
import { useEffect } from "react"
import { ArrowUpRight, CheckCircle, Clock, GraduationCap, PercentCircle, XCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OverviewPage() {
  useEffect(() => {
    // Update the page title
    const pageTitle = document.getElementById("page-title")
    if (pageTitle) pageTitle.textContent = "Overview"
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-gray-500">Welcome back, Admin</h2>
        <p className="text-sm text-gray-500">Here's what's happening with your attendance system today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none ">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              <div className="rounded-full p-1.5">
                <GraduationCap className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>4% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Present Today</CardTitle>
              <div className="rounded-full  p-1.5">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">215</div>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>2.5% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none ">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Absent Today</CardTitle>
              <div className="rounded-full  p-1.5">
                <XCircle className="h-4 w-4 text-rose-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33</div>
            <div className="mt-1 flex items-center text-xs text-rose-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>5% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none ">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
              <div className="rounded-full p-1.5">
                <PercentCircle className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.7%</div>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>1.2% from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2 border-none shadow-md">
          <CardHeader className="border-b  px-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-medium">Department Attendance</CardTitle>
                <CardDescription>Attendance rates by department</CardDescription>
              </div>
              <Tabs defaultValue="today">
                <TabsList className="grid w-[240px] grid-cols-3">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full "></div>
                    <span className="font-medium">Computer Science</span>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2 ">
                  <div className="h-full w-[92%] "></div>
                </Progress>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full "></div>
                    <span className="font-medium">Electrical Engineering</span>
                  </div>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2 ">
                  <div className="h-full w-[88%] "></div>
                </Progress>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full "></div>
                    <span className="font-medium">Mechanical Engineering</span>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2 ">
                  <div className="h-full w-[78%] "></div>
                </Progress>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full "></div>
                    <span className="font-medium">Civil Engineering</span>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2 ">
                  <div className="h-full w-[85%] "></div>
                </Progress>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="border-b  px-6">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            <CardDescription>Latest attendance records</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0 divide-y">
              <div className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                  <AvatarFallback className="text-blue-600">JS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-gray-500">Marked present</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className=" text-green-600">
                    Present
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>09:15 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                  <AvatarFallback className=" text-purple-600">AP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Alice Parker</p>
                  <p className="text-xs text-gray-500">Marked present</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className=" text-green-600">
                    Present
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>09:12 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
                  <AvatarFallback className=" text-amber-600">RJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Robert Johnson</p>
                  <p className="text-xs text-gray-500">Marked absent</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className=" text-rose-600">
                    Absent
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>09:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t  p-4">
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
