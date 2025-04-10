import type React from "react"
import { Routes, Route, Navigate } from "react-router"
import { AuthProvider } from "./context/auth-context"
import { AuthLayout } from "./components/sidebar/auth-layout"
import { LoginPage } from "./auth/login"
import { Layout } from "./components/sidebar/layout"
import OverviewPage from "./pages/Dashboard"
import StudentsPage from "./pages/Student"
import ReportsPage from "./pages/Report"
import SettingsPage from "./pages/Setting"
import { UsersPage } from "./pages/Users"
import { ViewAttendancePage } from "./pages/ViewAttendance"
import { AttendancePage } from "./pages/Attendance"



// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // For demo purposes, we'll check if the user exists in localStorage
  const userExists = localStorage.getItem("user") !== null

  if (!userExists) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

// Auth route component - redirects to home if already logged in
function AuthRoute({ children }: { children: React.ReactNode }) {
  const userExists = localStorage.getItem("user") !== null

  if (userExists) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default function App() {
  return (

    <AuthProvider>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <AuthLayout />
            </AuthRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="view-attendance" element={<ViewAttendancePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Logout route */}
        <Route path="/logout" element={<Navigate to="/auth/login" replace />} />

        {/* Catch-all redirect to login or home based on auth status */}
        <Route
          path="*"
          element={localStorage.getItem("user") ? <Navigate to="/" replace /> : <Navigate to="/auth/login" replace />}
        />
      </Routes>
    </AuthProvider>

  )
}
