import Layout from "../components/Layout";

function HospitalDashboard(){

return(

<Layout>

<h2>

Hospital Admin Dashboard

</h2>

<div className="row mt-4">

<div className="col-md-3">

<div className="card shadow p-4">

<h5>

Doctors

</h5>

<h2>

25

</h2>

</div>

</div>

<div className="col-md-3">

<div className="card shadow p-4">

<h5>

Patients

</h5>

<h2>

120

</h2>

</div>

</div>

<div className="col-md-3">

<div className="card shadow p-4">

<h5>

Appointments

</h5>

<h2>

45

</h2>

</div>

</div>

</div>

</Layout>

);

}

export default HospitalDashboard;