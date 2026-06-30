const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/roles");

const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor
} = require("../controllers/doctorController");

router.get("/", auth, role("platform_admin", "hospital_admin"), getDoctors);

router.post("/", auth, role("platform_admin", "hospital_admin"), addDoctor);

router.put("/:id", auth, role("platform_admin", "hospital_admin"), updateDoctor);

router.delete("/:id", auth, role("platform_admin", "hospital_admin"), deleteDoctor);

module.exports = router;