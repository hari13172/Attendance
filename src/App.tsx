import { Routes, Route, Navigate } from "react-router"
import StudentsPage from "./pages/Student"
import AttendancePage from "./pages/Attendance"
import ReportsPage from "./pages/Report"
import SettingsPage from "./pages/Setting"
import { Layout } from "./components/sidebar/layout"
import OverviewPage from "./pages/Dashboard"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<OverviewPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
