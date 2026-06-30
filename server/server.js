const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const connectDB = require("./config/db");
const seedUsers = require("./seed");

const app = express();

// Connect Database
connectDB().then(() => {
  seedUsers();
});

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/dashboard",require("./routes/dashboardRoutes"));
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("EMR Backend Running...");
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});