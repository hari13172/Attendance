import type React from "react"
import { Routes, Route, Navigate } from "react-router"
import { LoginPage } from "./auth/login"
import { Layout } from "./components/sidebar/layout"
import OverviewPage from "./pages/Dashboard"
import StudentsPage from "./pages/Student"
import ReportsPage from "./pages/Report"
import SettingsPage from "./pages/Setting"
import { UsersPage } from "./pages/Users"
import { ViewAttendancePage } from "./pages/ViewAttendance"
import { AttendancePage } from "./pages/Attendance"
import AuthLayout from "./components/sidebar/auth-layout"
import { YearDetailPage } from "./pages/YearDetail"
import { DepartmentDetailPage } from "./pages/DepartmentDetail"





export default function App() {
  return (


    <Routes>
      {/* Auth routes */}
      <Route
        path="/auth" >
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<OverviewPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="view-attendance" element={<ViewAttendancePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="department/:id" element={<DepartmentDetailPage />} />
          <Route path="department/:id/year/:yearId" element={<YearDetailPage />} />
        </Route>
      </Route>


      {/* Logout route */}
      <Route path="/logout" element={<Navigate to="/auth/login" replace />} />

      {/* Catch-all redirect to login or home based on auth status */}
      {/* <Route
        path="*"
        element={localStorage.getItem("user") ? <Navigate to="/" replace /> : <Navigate to="/auth/login" replace />}
      /> */}
    </Routes>


  )
}
