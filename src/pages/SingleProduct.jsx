import { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "./../components/Color";
import { AiOutlineHeart } from "react-icons/ai";
import { TbGitCompare } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getAProduct, getAllProducts, resetState } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import Container from "../components/Container";
const SingleProduct = () => {
  
  const [color, setColor] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(resetState())
    dispatch(getAProduct(getProductId));

      dispatch(getUserCart())
      dispatch(getAllProducts())
  }, []);
  const productState = useSelector(
    (state) => state?.product?.singleProduct || []
  );

  const productsState = useSelector((state) => state?.product?.products || []);
  const cartState = useSelector((state) => state.auth.cartProducts || []);
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);
  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        }),
      );
      navigate("/cart");
    }
  };
  const [orderedProduct, setOrderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);
const [star,setStar]=useState(null)
const [comment,setComment]=useState(null)

const addRatingToProduct=()=>{
  if(star===null){
    toast.error('Please add star to rating')
    return false
  }
  else if(comment===null){
    toast.error('Please Write Review About the Product')
    return false
  }else{
    dispatch(addRating({star:star,comment:comment,prodId:getProductId}))
    setTimeout(() => {
      dispatch(getAProduct(getProductId));
    }, 1000);
  }
  return false;
}
  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-fluid p-3 ">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  {/* <img
                    src={
                      productState.images[0].url
                        ? productState.images[0].url
                        : "data:image/jpeg;base64,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"
                    }
                    alt=""
                  /> */}
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15 justify-content-center ">
                {productState &&
                  productState?.images?.map((item, index) => {
                    return (
                      <div key={index}>
                        <img src={item?.url} alt="" className="" />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{productState?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">$ {productState?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <div className="star-component">
                      <ReactStars
                        count={5}
                        size={24}
                        value={Number(productState?.totalrating)}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mb-0 t-review">2 Review</p>
                  </div>
                  <a className="review-btn" href="#review">
                    Write a Review
                  </a>
                </div>
                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type :</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">{productState?.tags}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availablity :</h3>
                    <p className="product-data">In Stock</p>
                  </div>
                  {/* <div className="d-flex gap-10 flex-column mt-2 mb-2">
                    <h3 className="product-heading">Size :</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        Xl
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div>
                  </div> */}
                  <div className="d-flex gap-10 flex-column mt-2 mb-2">
                    {alreadyAdded == false && (
                      <>
                        <h3 className="product-heading">Color :</h3>
                        <Color
                          setColor={setColor}
                          colorData={productState?.color}
                        />
                      </>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-2">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading">Quantity :</h3>
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={10}
                            className="form-control"
                            style={{ width: "70px" }}
                            id=""
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </div>
                      </>
                    )}
                    <div
                      className={
                        alreadyAdded
                          ? "ms-0"
                          : "ms-5" + `d-flex align-items-center gap-30 ms-5`
                      }
                    >
                      <button
                        className="button border-0"
                        type="button"
                        onClick={() => {
                          alreadyAdded
                            ? navigate("/cart")
                            : uploadCart(productState?._id);
                        }}
                      >
                        {alreadyAdded ? "Go To Cart" : "Add to Cart"}
                      </button>
                      {/* <button className="button signup">Buy It Now</button> */}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <a href="">
                        <TbGitCompare className="fs-6 me-3" />
                        Add to Compare
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <AiOutlineHeart className="fs-6 me-3" />
                        Add to Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column  my-3">
                    <h3 className="product-heading">Shipping & Returns</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! <br />{" "}
                      We ship all US domestic orders within{" "}
                      <b>5-10 business days!</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">Product Link :</h3>
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                    >
                      copy link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>

              <div className="bg-white p-3">
                <p
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper  home-wrapper-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Review</p>
                    </div>
                  </div>

                  {orderedProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href=""
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={true}
                        activeColor="#ffd700"
                        onChange={(e)=>setStar(e)}
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        placeholder="Comment"
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        onChange={(e)=>setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button onClick={addRatingToProduct} className="button border-0" type="button">Sumbit Review</button>
                    </div>
                </div>
                <div className="reviews mt-4">
                 {
                  productState && productState?.ratings?.map((item,index)=>{
                    return(
                      <div className="review" key={index}>
                      <div className="d-flex gap-10 align-items-center">
                        <ReactStars
                          count={5}
                          size={24}
                          value={item.star}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-3">
                      {item?.comment}
                      </p>
                    </div>
                    )
                  })
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">Our Popular Products</div>
            </div>
          </div>
          <div className="row">
            <ProductCard data={popularProduct} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
