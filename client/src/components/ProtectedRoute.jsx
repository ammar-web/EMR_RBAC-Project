import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return (
      <Navigate
        to="/emr-platform/login"
        replace
      />
    );
  }

  if (roles && !roles.includes(role)) {
    return (
      <Navigate
        to="/emr-platform/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;