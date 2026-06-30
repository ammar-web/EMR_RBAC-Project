import { NavLink, useNavigate } from "react-router-dom";

import {
  FaChartPie,
  FaUsers,
  FaCalendarAlt,
  FaFileMedical,
  FaSignOutAlt
} from "react-icons/fa";

function DoctorSidebar() {

  const navigate = useNavigate();

  const logout = () => {
  localStorage.clear();
  navigate("/emr-platform/login");
};

  return (
    <aside className="sidebar">

      <div className="logo">
        👨‍⚕️ <span>Doctor</span>
      </div>

      <nav>

        <NavLink to="/doctor-dashboard">
          <FaChartPie/>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/my-patients">
          <FaUsers/>
          <span>My Patients</span>
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

export default DoctorSidebar;