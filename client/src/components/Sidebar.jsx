import {
  FaChartPie,
  FaHospital,
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaFileMedical,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="logo">
        🏥 <span>EMR SaaS</span>
      </div>

      <nav>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaChartPie />
          <span>Dashboard</span>
        </NavLink>

        {(role === "platform_admin" || role === "hospital_admin") && (
          <NavLink
            to="/hospitals"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaHospital />
            <span>Hospitals</span>
          </NavLink>
        )}

        {(role === "platform_admin" || role === "hospital_admin") && (
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaUserMd />
            <span>Doctors</span>
          </NavLink>
        )}

        {(role === "platform_admin" || role === "hospital_admin") && (
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaUsers />
            <span>Patients</span>
          </NavLink>
        )}

        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaCalendarAlt />
          <span>Appointments</span>
        </NavLink>

        <NavLink
          to="/prescriptions"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaFileMedical />
          <span>Prescriptions</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      <button
        className="logout"
        onClick={logout}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;