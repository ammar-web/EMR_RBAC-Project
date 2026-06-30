const Appointment = require("../models/Appointment");

exports.getAppointments = async (req, res) => {

  try {

    let query = {};

    if (req.user.role === "doctor") {
      query.doctorUser = req.user.id;
    }

    if (req.user.role === "hospital_admin") {
      query.hospital = req.user.hospital;
    }

    const data = await Appointment.find(query);

    res.json(data);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.addAppointment = async (req, res) => {

  try {

    const appt = await Appointment.create({
      ...req.body,
      hospital: req.user.hospital,
      doctorUser: req.user.id
    });

    res.json(appt);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.deleteAppointment = async (req, res) => {

  try {

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json(err);
  }

};