const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {

  try {

    let query = {};

    if (req.user.role === "hospital_admin") {
      query.hospital = req.user.hospital;
    }

    const patients = await Patient.find(query);

    res.json(patients);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.addPatient = async (req, res) => {

  try {

    const patient = await Patient.create({
      ...req.body,
      hospital: req.user.hospital,
      createdBy: req.user.id
    });

    res.json(patient);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.updatePatient = async (req, res) => {

  try {

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(patient);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.deletePatient = async (req, res) => {

  try {

    await Patient.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json(err);
  }

};