import { Link } from "react-router-dom";
import cardimg from '../images/blog-1.jpg'
const BlogCart = () => {
  return (
      <div className="blog-card">
        <div className="card-image">
          <img src={cardimg} className="img-fluid w-100" alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">1 Dec,2022</p>
          <h5 className="title">A beatiful sunday morning renaissance</h5>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            voluptates 
          </p>
          <Link to="/blog/:id" className="button">Read More</Link>
        </div>
      </div>
  );
};

export default BlogCart;
