import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth?.user);
  const [edit,setEdit] =useState(true);
  const profileSchema = yup.object({
    firstname: yup.string().required("First Name Address is Required"),
    lastname: yup.string().required("Last Name Address is Required"),
    email: yup
      .string()
      .email("Email should be Valid")
      .required("Address  is Required"),
    mobile: yup.string().required("Mobile Number  is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setEdit(false)
      setTimeout(() => {
        
      }, 1000);
    },
  });
  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Profile</h3>
              <FiEdit className="fs-3" onClick={()=>setEdit(false)}/>
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">
                  First Name
                </label>
                <input
                  name="firstname"
                  type="text"
                  className="form-control"
                  id="example1"
                  disabled={edit}
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error ms-2 my-1">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  id="example2"
                  disabled={edit}
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error ms-2 my-1">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example3" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="example3"
                  disabled={edit}
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />

                <div className="error ms-2 my-1">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example4" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  id="example4"
                  disabled={edit}
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error ms-2 my-1">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>

              {
                edit === false && <button type="submit" className="btn btn-primary">
                Save
              </button>
              }
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
