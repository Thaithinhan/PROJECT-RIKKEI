import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import "./Course.css";

const Course = () => {
  return (
    <Link to={"/course-detail"} className="course-component nav-link">
      <div className="top-course d-lg-flex">
        <img
          src="https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg"
          alt=""
        />
        <div className="course-info">
          <p className="fw-bold name-course mb-0">
            HTML and CSS for Beginners - Build a Website & Launch ONLINE
          </p>
          <p className="author text-secondary m-0">Author</p>

          <div className="rating-course m-0 text-warning">
            <span className="fw-bold me-2">5.0</span>
            <Rate allowHalf defaultValue={5} />
          </div>
          <p className="price-course fw-bold mb-0">đ 1.900.000</p>
          <span className="bg-success-subtle py-1 px-2  fw-bold d-inline-block mt-1 rounded best-seller">
            Best Seller
          </span>
        </div>
      </div>
      <div className="bot-course">
        <button className="btn btn-none rounded-0 add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default Course;
