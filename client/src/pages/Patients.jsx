import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Patients() {

  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/patients";

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {

    try {

      const res = await axios.get(API, {
        headers: {
          authorization: token
        }
      });

      setPatients(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const savePatient = async () => {

    if (!name || !age) return;

    try {

      if (editingId) {

        await axios.put(
          API + "/" + editingId,
          {
            name,
            age,
            gender
          },
          {
            headers: {
              authorization: token
            }
          }
        );

      } else {

        await axios.post(
          API,
          {
            name,
            age,
            gender
          },
          {
            headers: {
              authorization: token
            }
          }
        );

      }

      setEditingId(null);
      setName("");
      setAge("");
      setGender("Male");

      loadPatients();

    } catch (err) {

      console.log(err);

    }

  };

  const editPatient = (patient) => {

    setEditingId(patient._id);
    setName(patient.name);
    setAge(patient.age);
    setGender(patient.gender);

  };

  const deletePatient = async (id) => {

    if (!window.confirm("Delete Patient?")) return;

    try {

      await axios.delete(API + "/" + id, {
        headers: {
          authorization: token
        }
      });

      loadPatients();

    } catch (err) {

      console.log(err);

    }

  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <Layout>

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between">

          <h3 className="fw-bold">

            Patient Management

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

            <div className="col-md-4">

              <input
                className="form-control form-control-lg"
                placeholder="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            <div className="col-md-2">

              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <select
                className="form-select form-select-lg"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >

                <option>Male</option>
                <option>Female</option>
                <option>Other</option>

              </select>

            </div>

            <div className="col-md-3">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={savePatient}
              >

                {editingId ? "Update" : "Add Patient"}

              </button>

            </div>

          </div>

          <table className="table table-hover">

            <thead className="table-light">

              <tr>

                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                filtered.map((patient, index) => (

                  <tr key={patient._id}>

                    <td>{index + 1}</td>

                    <td>{patient.name}</td>

                    <td>{patient.age}</td>

                    <td>{patient.gender}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editPatient(patient)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deletePatient(patient._id)}
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

export default Patients;