import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  const token = localStorage.getItem("token");

  const loadDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors", {
        headers: { authorization: token }
      });
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const addDoctor = async () => {

    if (!name || !specialization) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/doctors",
        { name, specialization },
        { headers: { authorization: token } }
      );

      toast.success("Doctor added");

      setName("");
      setSpecialization("");
      loadDoctors();

    } catch (err) {
      toast.error("Error adding doctor");
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`, {
        headers: { authorization: token }
      });

      toast.success("Deleted");
      loadDoctors();

    } catch (err) {
      toast.error("Error deleting");
    }
  };

  return (
    <Layout>

      <h3 className="mb-3">Doctors</h3>

      {/* Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row">

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={addDoctor}>
              Add
            </button>
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm p-3">

        {doctors.length === 0 ? (
          <p className="text-center text-muted">No doctors found</p>
        ) : (

          <table className="table table-hover">

            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.name}</td>
                  <td>{doc.specialization}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteDoctor(doc._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        )}

      </div>

    </Layout>
  );
}

export default Doctors;