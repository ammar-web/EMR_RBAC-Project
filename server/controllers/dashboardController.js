const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

exports.getDashboard = async (req, res) => {

  try {

    let filter = {};

    if (req.user.role === "hospital_admin") {
      filter.hospital = req.user.hospital;
    }

    if (req.user.role === "doctor") {
      filter.doctorUser = req.user.id;
    }

    const hospitals = await Hospital.countDocuments();
    const doctors = await Doctor.countDocuments(filter);
    const patients = await Patient.countDocuments(filter);
    const appointments = await Appointment.countDocuments(filter);
    const prescriptions = await Prescription.countDocuments(filter);

    res.json({
      hospitals,
      doctors,
      patients,
      appointments,
      prescriptions
    });

  } catch (err) {
    res.status(500).json(err);
  }
};