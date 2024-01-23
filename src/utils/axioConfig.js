export const base_url="https://ecommerce-backend-yp85.onrender.com/api/";
// export const base_url="http://localhost:5050/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage?.token : ""
    }`,
    Accept: "application/json",
  },
};