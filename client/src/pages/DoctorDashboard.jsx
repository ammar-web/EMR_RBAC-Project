import Layout from "../components/Layout";

function DoctorDashboard(){

return(

<Layout>

<h2>

Doctor Dashboard

</h2>

<div className="row mt-4">

<div className="col-md-4">

<div className="card shadow p-4">

<h5>

Today's Patients

</h5>

<h2>

12

</h2>

</div>

</div>

<div className="col-md-4">

<div className="card shadow p-4">

<h5>

Appointments

</h5>

<h2>

8

</h2>

</div>

</div>

<div className="col-md-4">

<div className="card shadow p-4">

<h5>

Prescriptions

</h5>

<h2>

17

</h2>

</div>

</div>

</div>

</Layout>

);

}

export default DoctorDashboard;