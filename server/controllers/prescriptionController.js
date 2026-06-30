const Prescription = require("../models/Prescription");

exports.getPrescriptions = async (req, res) => {

  try {

    let query = {};

    if (req.user.role === "doctor") {
      query.doctorUser = req.user.id;
    }

    if (req.user.role === "hospital_admin") {
      query.hospital = req.user.hospital;
    }

    const data = await Prescription.find(query);

    res.json(data);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.addPrescription = async (req, res) => {

  try {

    const data = await Prescription.create({
      ...req.body,
      hospital: req.user.hospital,
      doctorUser: req.user.id
    });

    res.json(data);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.deletePrescription = async (req, res) => {

  try {

    await Prescription.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json(err);
  }

};