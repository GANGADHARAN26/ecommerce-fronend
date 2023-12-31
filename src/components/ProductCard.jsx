import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
// import Wishlist from '../images/wish.svg';
// import watch from "../images/watch.jpg";
import watch2 from "../images/watch-01.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
// eslint-disable-next-line react/prop-types
const ProductCard = ({ grid, data }) => {
  // eslint-disable-next-line react/prop-types
  const dispatch=useDispatch();

  let location = useLocation();
  const addWishlist=(id)=>{
dispatch(addToWishlist(id))
  }
  return (
    <>
      {
        // eslint-disable-next-line react/prop-types
        Array.isArray(data) &&
          // eslint-disable-next-line react/prop-types
          data?.map((item, index) => {
            return (
              <div
                key={index}
                className={`${
                  location.pathname === "/product" ? `gr-${grid}` : "col-3"
                }`}
              >
                <div
                  className="product-card position-relative"
                >
                  <div className="wishlist-icon position-absolute ">
                    <button className="border-0 bg-transparent" onClick={()=>{addWishlist(item?._id)}}>
                      <img src={wish} alt="wishlist" />
                    </button>
                  </div>
                  <div className="product-image">
                    {item?.images && item.images.length > 0 && (
                      <img
                        src={item.images[0]?.url}
                        className="img-fluid  "
                        alt="product image"
                        // width={160}
                      />
                    )}
                    <img
                      src={watch2}
                      className="img-fluid  "
                      alt="product image"
                      // width={160}
                    />
                  </div>
                  <div className="product-details">
                    <h6 className="brand">{item?.brand}</h6>
                    <h5 className="product-title">{item?.title}</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={Number(item?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`} dangerouslySetInnerHTML={{__html:item?.description}}>
            </p>
                    <p className="price">$ {item?.price}</p>
                  </div>
                  <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                      {/* <button className="border-0 bg-transparent">
                        <img src={prodcompare} alt="compare" />
                      </button> */}
                      <Link to={`/product/${item?._id}`} className="border-0 bg-transparent">
                        <img src={view} alt="view" />
                      </Link>
                      {/* <button className="border-0 bg-transparent">
                        <img src={addcart} alt="addcart" />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      }
    </>
  );
};

export default ProductCard;
