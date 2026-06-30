import PlatformSidebar from "./PlatformSidebar";
import HospitalSidebar from "./HospitalSidebar";
import DoctorSidebar from "./DoctorSidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="layout">
      {role === "platform_admin" && <PlatformSidebar />}
      {role === "hospital_admin" && <HospitalSidebar />}
      {role === "doctor" && <DoctorSidebar />}

      <div className="main-wrapper">
        <Navbar />

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;