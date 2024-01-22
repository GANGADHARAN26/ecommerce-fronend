import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../utils/axioConfig";
import { createAnOrder, deleteUserCart, getUserCart, resetState } from "../features/user/userSlice";
import { toast } from "react-toastify";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartState = useSelector((state) => state?.auth?.cartProducts || []);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);
  const shippingSchema = yup.object({
    firstName: yup.string().required("First Name Address is Required"),
    lastName: yup.string().required("Last Name Address is Required"),
    address: yup.string().required("Address  is Required"),
    state: yup.string().required("State  is Required"),
    city: yup.string().required("City  is Required"),
    country: yup.string().required("Country  is Required"),
    pincode: yup.number().required("Pincode is Required"),
  });
  const authState = useSelector((state) => state?.auth);
  const pState = useSelector((state) => state.auth.product );
  useEffect(() => {
    dispatch(getUserCart());
  }, [pState])
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);
  useEffect(() => {
    if (
      authState?.orderedProduct !== null &&
      authState?.orderedProduct?.success == true
    ) {
      dispatch(deleteUserCart())
    dispatch(resetState())

      navigate("/my-orders");
    }
  }, [authState]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setTimeout(() => {
        checkOutHandler();
      }, 1000);
      if (cartProductState.length == 0) {
        toast.info("Please go back to cart and try again to order with some products");
      }
    },
  });
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    let items = [];

    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);
  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }
    const result = await axios.post(
      `https://ecommerce-backend-yp85.onrender.com/api/user/order/checkout`,
      { amount: totalAmount },
      config
    );
    if (!result) {
      alert("Something Went Wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_FsSnWI3yYMEFOX", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "dharan",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };
        const result = await axios.post(
          "http://localhost:5050/api/user/order/paymentVerification",
          data,
          config
        );
        setPaymentInfo({
          razorpayPaymentId: result.data.razorpayPaymentId,
          razorpayOrderId: result.data.razorpayOrderId,
        });

        setTimeout(() => {
          if (shippingInfo !== null) {
            dispatch(
              createAnOrder({
                totalPrice: totalAmount,
                totalPriceAfterDiscount: totalAmount,
                orderItems: cartProductState,
                paymentInfo,
                shippingInfo,
              })
            );
          } else {
            setTimeout(() => {
              if (shippingInfo !== null) {
                dispatch(
                  createAnOrder({
                    totalPrice: totalAmount,
                    totalPriceAfterDiscount: totalAmount,
                    orderItems: cartProductState,
                    paymentInfo,
                    shippingInfo,
                  })
                );
              } else {
                setTimeout(() => {
                  if (shippingInfo == null) {
                    toast.info(
                      "Payment Processing is got problem try again with Better Internet"
                    );
                  }else{
                    dispatch(
                      createAnOrder({
                        totalPrice: totalAmount,
                        totalPriceAfterDiscount: totalAmount,
                        orderItems: cartProductState,
                        paymentInfo,
                        shippingInfo,
                      })
                    );
                  }
                }, 3000);
              }
            }, 3000);
          }
        }, 5000);
      },
      prefill: {
        name: "Digitic",
        email: "gangadharan@gmail.com",
        contact: "6381762790",
      },
      notes: {
        address: "digitic Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="chechkout-left-data">
              <h3 className="website-name">Ecommerce</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": "'>';" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">Gangadharan (gangadharana01@gmail.com)</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    id=""
                    className="form-control form-select"
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    placeholder="First Name"
                    className="form-control"
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment,Suit,etc"
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    id=""
                    className="form-control form-select"
                  >
                    <option value="">Select State</option>
                    <option value="tamilnadu">Tamil Nadu</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Zipcode"
                    className="form-control"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" /> Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shopping
                    </Link>
                    <button className="button" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-6">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      className="d-flex gap-10 mb-2 align-items-center"
                      key={index}
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            width={100}
                            height={100}
                            src={item?.productId?.images[0]?.url}
                            alt="product image"
                          />
                        </div>
                        <div>
                          <h5 className="title-price">
                            {item?.productId?.title}
                          </h5>
                          <p className="total-price">{item?.color?.title}</p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          $ {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  ${totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                ${totalAmount ? totalAmount + 5 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
