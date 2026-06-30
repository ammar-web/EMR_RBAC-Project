import { useEffect, useState } from "react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const role = localStorage.getItem("role") || "Platform Admin";

  return (
    <header className="navbar">

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search doctors, patients..."
        />
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="profile-card">

          <FaUserCircle className="profile-icon" />

          <div>
            <h6>Administrator</h6>
            <small>{role}</small>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;