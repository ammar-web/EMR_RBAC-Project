import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function DoctorPatients() {

  const [patients, setPatients] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/patients",
        {
          headers: {
            authorization: token
          }
        }
      );

      setPatients(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <Layout>

      <h2 className="page-title">

        My Patients

      </h2>

      <div className="card shadow-sm p-4">

        <table className="table table-hover">

          <thead>

            <tr>

              <th>Name</th>

              <th>Age</th>

              <th>Gender</th>

            </tr>

          </thead>

          <tbody>

            {patients.map((patient) => (

              <tr key={patient._id}>

                <td>{patient.name}</td>

                <td>{patient.age}</td>

                <td>{patient.gender}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default DoctorPatients;