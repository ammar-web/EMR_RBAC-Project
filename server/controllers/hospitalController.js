const Hospital = require("../models/Hospital");

exports.getHospitals = async (req, res) => {

  try {

    const hospitals = await Hospital.find();

    res.json(hospitals);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.addHospital = async (req, res) => {

  try {

    const hospital = await Hospital.create(req.body);

    res.json(hospital);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.updateHospital = async (req, res) => {

  try {

    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(hospital);

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.deleteHospital = async (req, res) => {

  try {

    await Hospital.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json(err);
  }

};