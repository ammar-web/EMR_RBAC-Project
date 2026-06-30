const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/roles");

const {
  getPrescriptions,
  addPrescription,
  deletePrescription
} = require("../controllers/prescriptionController");

router.get(
  "/",
  auth,
  role("platform_admin", "hospital_admin", "doctor"),
  getPrescriptions
);

router.post(
  "/",
  auth,
  role("platform_admin", "hospital_admin", "doctor"),
  addPrescription
);

router.delete(
  "/:id",
  auth,
  role("platform_admin", "hospital_admin", "doctor"),
  deletePrescription
);

module.exports = router;