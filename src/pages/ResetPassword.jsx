import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetPassword } from "../features/user/userSlice";

const passwordSchema = yup.object({
  password: yup.string().required("Password is Required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({token:getToken,password:values.password}));
      navigate("/login");
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <div className="login-wrapper py-5 home-wrapper-2 container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Ok
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
