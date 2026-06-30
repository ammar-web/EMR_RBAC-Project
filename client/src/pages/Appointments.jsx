import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/appointments";

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {

      const res = await axios.get(API, {
        headers: {
          authorization: token
        }
      });

      setAppointments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const addAppointment = async () => {

    if (!patient || !doctor || !date) return;

    try {

      await axios.post(
        API,
        {
          patient,
          doctor,
          date,
          status
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      setPatient("");
      setDoctor("");
      setDate("");
      setStatus("Pending");

      loadAppointments();

    } catch (err) {
      console.log(err);
    }

  };

  const deleteAppointment = async (id) => {

    if (!window.confirm("Delete appointment?")) return;

    try {

      await axios.delete(API + "/" + id, {
        headers: {
          authorization: token
        }
      });

      loadAppointments();

    } catch (err) {
      console.log(err);
    }

  };

  const filtered = appointments.filter((a) =>
    a.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <Layout>

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between">

          <h3 className="fw-bold">

            Appointment Management

          </h3>

          <input
            className="form-control"
            style={{ width: "250px" }}
            placeholder="Search Patient"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <div className="card-body">

          <div className="row g-3 mb-4">

            <div className="col-md-3">

              <input
                className="form-control form-control-lg"
                placeholder="Patient"
                value={patient}
                onChange={(e)=>setPatient(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control form-control-lg"
                placeholder="Doctor"
                value={doctor}
                onChange={(e)=>setDoctor(e.target.value)}
              />

            </div>

            <div className="col-md-2">

              <input
                type="date"
                className="form-control form-control-lg"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />

            </div>

            <div className="col-md-2">

              <select
                className="form-select form-select-lg"
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
              >

                <option>Pending</option>
                <option>Completed</option>

              </select>

            </div>

            <div className="col-md-2">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={addAppointment}
              >

                Add

              </button>

            </div>

          </div>

          <table className="table table-hover">

            <thead className="table-light">

              <tr>

                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                filtered.map((a,index)=>(

                  <tr key={a._id}>

                    <td>{index+1}</td>

                    <td>{a.patient}</td>

                    <td>{a.doctor}</td>

                    <td>{a.date}</td>

                    <td>

                      <span className={
                        a.status==="Completed"
                        ?"badge bg-success"
                        :"badge bg-warning text-dark"
                      }>

                        {a.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={()=>deleteAppointment(a._id)}
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

export default Appointments;