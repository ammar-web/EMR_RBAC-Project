const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/roles");

const {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient
} = require("../controllers/patientController");

router.get("/", auth, role("platform_admin", "hospital_admin"), getPatients);

router.post("/", auth, role("platform_admin", "hospital_admin"), addPatient);

router.put("/:id", auth, role("platform_admin", "hospital_admin"), updatePatient);

router.delete("/:id", auth, role("platform_admin", "hospital_admin"), deletePatient);

module.exports = router;