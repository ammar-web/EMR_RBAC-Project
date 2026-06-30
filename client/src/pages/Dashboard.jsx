import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { FaHospital, FaUserMd, FaUsers, FaCalendar, FaFileMedical } from "react-icons/fa";

function Dashboard() {

  const [data, setData] = useState({
    hospitals: 0,
    doctors: 0,
    patients: 0,
    appointments: 0,
    prescriptions: 0
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { authorization: token }
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const stats = [
    { label: "Hospitals", value: data.hospitals, icon: <FaHospital />, color: "#3b82f6" },
    { label: "Doctors", value: data.doctors, icon: <FaUserMd />, color: "#10b981" },
    { label: "Patients", value: data.patients, icon: <FaUsers />, color: "#ef4444" },
    { label: "Appointments", value: data.appointments, icon: <FaCalendar />, color: "#f59e0b" },
    { label: "Prescriptions", value: data.prescriptions, icon: <FaFileMedical />, color: "#8b5cf6" }
  ];

  const chartData = stats.map(item => ({
    name: item.label,
    value: item.value
  }));

  return (
    <Layout>

      {/* HEADER */}
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening in your EMR system.</p>
      </div>

      {/* STATS GRID */}
      <div className="stats-grid">

        {stats.map((item, i) => (
          <div className="stat-card" key={i}>

            <div className="stat-top">

              <div className="icon-box" style={{ background: item.color }}>
                {item.icon}
              </div>

              <span className="stat-label">{item.label}</span>

            </div>

            <h2 className="stat-value">{item.value}</h2>

            <div className="stat-footer">
              <span>+12% this month</span>
            </div>

          </div>
        ))}

      </div>

      {/* CHART SECTION */}
      <div className="chart-container">

        <div className="chart-header">
          <h3>Analytics Overview</h3>
          <span>Live system data</span>
        </div>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </Layout>
  );
}

export default Dashboard;