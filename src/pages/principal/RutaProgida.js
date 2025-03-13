import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, rolesPermitidos }) => {
  const token = localStorage.getItem("token");
  const cargo = localStorage.getItem("cargo");

  if (!token || !rolesPermitidos.includes(cargo)) {
    return <Navigate to="/Explorar" />;
  }

  return children;
};

export default RutaProtegida;
