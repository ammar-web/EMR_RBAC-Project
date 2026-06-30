import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "platform_admin") {
        navigate("/dashboard");
      } else if (res.data.role === "hospital_admin") {
        navigate("/hospital-dashboard");
      } else {
        navigate("/doctor-dashboard");
      }
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      {/* Left Side */}
      <div className="left-panel">
        <h1>EMR SaaS</h1>

        <h3>Electronic Medical Records</h3>

        <p>
          Secure cloud-based healthcare management platform for Hospitals,
          Doctors and Patients.
        </p>

        <div
          style={{
            fontSize: "140px",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          🏥
        </div>
      </div>

      {/* Right Side */}
      <div className="right-panel">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginBottom: "25px",
            }}
          >
            Sign in to continue
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={login}>
            Login
          </button>

          <div className="role-selector">
            <h5>Quick Login</h5>

            {/* Platform Admin */}
            <div
              className="role-card"
              onClick={() => {
                setEmail("admin@emr.com");
                setPassword("admin123");
              }}
            >
              <div className="role-icon">🛡️</div>

              <div>
                <h6>Platform Admin</h6>
                <small>Manage hospitals, users & system</small>
              </div>
            </div>

            {/* Hospital Admin */}
            <div
              className="role-card"
              onClick={() => {
                setEmail("apollo@emr.com");
                setPassword("apollo123");
              }}
            >
              <div className="role-icon">🏥</div>

              <div>
                <h6>Hospital Admin</h6>
                <small>Manage doctors, staff & patients</small>
              </div>
            </div>

            {/* Doctor */}
            <div
              className="role-card"
              onClick={() => {
                setEmail("doctor@emr.com");
                setPassword("doctor123");
              }}
            >
              <div className="role-icon">🩺</div>

              <div>
                <h6>Doctor</h6>
                <small>Appointments & Prescriptions</small>
              </div>
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Select a role to auto-fill credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;