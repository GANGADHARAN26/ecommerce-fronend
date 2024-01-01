import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import cardimg from '../images/blog-1.jpg'
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlog } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const blogState = useSelector((state) => state.blog.singleBlog || []);
  const location =useLocation();
  const dispatch = useDispatch();
  const getBlogId=location.pathname.split('/')[2];
  console.log(getBlogId);
  useEffect(() => {
    getsingleblog();
  }, []);
  const getsingleblog = () => {
    dispatch(getBlog(getBlogId));
  };
  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4"/> {blogState?.title}
                </Link>
                <h3 className="title">
                {blogState?.title}
                </h3>
                <img
                  src={blogState?.images[0].url ?blogState?.images[0].url  : cardimg}
                  alt="Blog"
                  className="img-fluid w-100 my-4"
                />
                <p  dangerouslySetInnerHTML={{__html:blogState?.description}}>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
