import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Hospitals() {

  const [hospitals, setHospitals] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/hospitals";

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {

    try {

      const res = await axios.get(API, {
        headers: {
          authorization: token
        }
      });

      setHospitals(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const saveHospital = async () => {

    if (!name || !city) return;

    try {

      if (editingId) {

        await axios.put(
          API + "/" + editingId,
          {
            name,
            city,
            status
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
            city,
            status
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
      setCity("");
      setStatus("Active");

      loadHospitals();

    } catch (err) {

      console.log(err);

    }

  };

  const editHospital = (hospital) => {

    setEditingId(hospital._id);
    setName(hospital.name);
    setCity(hospital.city);
    setStatus(hospital.status);

  };

  const deleteHospital = async (id) => {

    if (!window.confirm("Delete Hospital?")) return;

    try {

      await axios.delete(API + "/" + id, {
        headers: {
          authorization: token
        }
      });

      loadHospitals();

    } catch (err) {

      console.log(err);

    }

  };

  const filtered = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <Layout>

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between">

          <h3 className="fw-bold">Hospital Management</h3>

          <input
            className="form-control"
            style={{ width: "250px" }}
            placeholder="Search Hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="card-body">

          <div className="row g-3 mb-4">

            <div className="col-md-4">

              <input
                className="form-control form-control-lg"
                placeholder="Hospital Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control form-control-lg"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <select
                className="form-select form-select-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

            </div>

            <div className="col-md-2">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={saveHospital}
              >

                {editingId ? "Update" : "Add"}

              </button>

            </div>

          </div>

          <table className="table table-hover">

            <thead className="table-light">

              <tr>

                <th>#</th>
                <th>Name</th>
                <th>City</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                filtered.map((hospital, index) => (

                  <tr key={hospital._id}>

                    <td>{index + 1}</td>

                    <td>{hospital.name}</td>

                    <td>{hospital.city}</td>

                    <td>

                      <span className={
                        hospital.status === "Active"
                          ? "badge bg-success"
                          : "badge bg-danger"
                      }>

                        {hospital.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editHospital(hospital)}
                      >

                        Edit

                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteHospital(hospital._id)}
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

export default Hospitals;