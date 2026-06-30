import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaFileMedical,
  FaSignOutAlt
} from "react-icons/fa";

function HospitalSidebar() {

  const navigate = useNavigate();

  const logout = () => {
  localStorage.clear();
  navigate("/emr-platform/login");
};

  return (
    <aside className="sidebar">

      <div className="logo">
        🏥 <span>Hospital Admin</span>
      </div>

      <nav>

        <NavLink to="/hospital-dashboard">
          <FaChartPie/>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/doctors">
          <FaUserMd/>
          <span>Doctors</span>
        </NavLink>

        <NavLink to="/patients">
          <FaUsers/>
          <span>Patients</span>
        </NavLink>

        <NavLink to="/appointments">
          <FaCalendarAlt/>
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/prescriptions">
          <FaFileMedical/>
          <span>Prescriptions</span>
        </NavLink>

      </nav>

      <button className="logout" onClick={logout}>
        <FaSignOutAlt/> Logout
      </button>

    </aside>
  );

}

export default HospitalSidebar;