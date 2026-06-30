import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import HospitalDashboard from "./pages/HospitalDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import DoctorPatients from "./pages/DoctorPatients";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/emr-platform/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospital-dashboard"
          element={
            <ProtectedRoute roles={["hospital_admin"]}>
              <HospitalDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute roles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/my-patients"
  element={
    <ProtectedRoute roles={["doctor"]}>
      <DoctorPatients />
    </ProtectedRoute>
  }
/>

        <Route
          path="/hospitals"
          element={
            <ProtectedRoute roles={["platform_admin"]}>
              <Hospitals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute roles={["platform_admin", "hospital_admin"]}>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute roles={["platform_admin", "hospital_admin"]}>
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute
              roles={[
                "platform_admin",
                "hospital_admin",
                "doctor",
              ]}
            >
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prescriptions"
          element={
            <ProtectedRoute
              roles={[
                "platform_admin",
                "hospital_admin",
                "doctor",
              ]}
            >
              <Prescriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate
              to="/emr-platform/login"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/emr-platform/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;