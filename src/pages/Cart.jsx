import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";
import { resetState } from "../features/products/productSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setproductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null); 
  
  const userCartState = useSelector((state) => state.auth.cartProducts );
  const pState = useSelector((state) => state.auth.product );
  useEffect(() => {
    dispatch(resetState())
    dispatch(getUserCart());
  }, [pState]);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 1000);
    }
  }, [productUpdateDetail]);

  const deleteCart = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 1000);
  };
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);
  // const updateCart=(productUpdateDetail)=>{

  // }
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId.images[0].url}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>
                      <div className="w-75">
                        <p className="d-flex gap-3">{item?.productId.title}</p>
                        <p>
                          Color :
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color.title }}
                            ></li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">$ {item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        id=""
                        min={1}
                        max={10}
                        value={
                          productUpdateDetail?.quantity
                            ? productUpdateDetail?.quantity
                            : item?.quantity
                        }
                        onChange={(e) => {
                          setproductUpdateDetail({
                            cartItemId: item?._id,
                            quantity: e.target.value,
                          });
                        }}
                      />
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteCart(item?._id);
                          }}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        $ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: ${totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
