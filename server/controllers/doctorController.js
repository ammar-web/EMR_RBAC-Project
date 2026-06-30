const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {

  try {

    let query = {};

    if (req.user.role === "hospital_admin") {
      query.hospital = req.user.hospital;
    }

    const doctors = await Doctor.find(query);

    res.json(doctors);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.addDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.create({
      ...req.body,
      hospital: req.user.hospital,
      createdBy: req.user.id
    });

    res.json(doctor);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.updateDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(doctor);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.deleteDoctor = async (req, res) => {

  try {

    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json(err);
  }

};