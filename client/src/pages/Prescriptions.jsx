import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Prescriptions() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [medicine, setMedicine] = useState("");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/prescriptions";

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {

    try {

      const res = await axios.get(API, {
        headers: {
          authorization: token
        }
      });

      setPrescriptions(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  const addPrescription = async () => {

    if (!patient || !doctor || !medicine) return;

    try {

      await axios.post(
        API,
        {
          patient,
          doctor,
          medicine,
          notes
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      setPatient("");
      setDoctor("");
      setMedicine("");
      setNotes("");

      loadPrescriptions();

    } catch (err) {
      console.log(err);
    }

  };

  const deletePrescription = async (id) => {

    if (!window.confirm("Delete prescription?")) return;

    try {

      await axios.delete(API + "/" + id, {
        headers: {
          authorization: token
        }
      });

      loadPrescriptions();

    } catch (err) {
      console.log(err);
    }

  };

  const filtered = prescriptions.filter((p) =>
    p.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <Layout>

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between">

          <h3 className="fw-bold">

            Prescription Management

          </h3>

          <input
            className="form-control"
            style={{ width: "250px" }}
            placeholder="Search Patient"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="card-body">

          <div className="row g-3 mb-4">

            <div className="col-md-3">

              <input
                className="form-control form-control-lg"
                placeholder="Patient"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control form-control-lg"
                placeholder="Doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control form-control-lg"
                placeholder="Medicine"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={addPrescription}
              >

                Add Prescription

              </button>

            </div>

          </div>

          <textarea
            className="form-control mb-4"
            rows="3"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <table className="table table-hover">

            <thead className="table-light">

              <tr>

                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Medicine</th>
                <th>Notes</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                filtered.map((p, index) => (

                  <tr key={p._id}>

                    <td>{index + 1}</td>

                    <td>{p.patient}</td>

                    <td>{p.doctor}</td>

                    <td>{p.medicine}</td>

                    <td>{p.notes}</td>

                    <td>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deletePrescription(p._id)}
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );

}

export default Prescriptions;