import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorage?.token !== undefined ? children : ( <Navigate to="/login" replace={true} /> );
};
