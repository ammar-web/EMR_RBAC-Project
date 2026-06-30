const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/roles");

const {
  getAppointments,
  addAppointment,
  deleteAppointment
} = require("../controllers/appointmentController");

router.get("/", auth, role("platform_admin", "hospital_admin", "doctor"), getAppointments);

router.post("/", auth, role("platform_admin", "hospital_admin", "doctor"), addAppointment);

router.delete("/:id", auth, role("platform_admin", "hospital_admin", "doctor"), deleteAppointment);

module.exports = router;