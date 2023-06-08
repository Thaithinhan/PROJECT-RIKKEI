import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";

const Category = (props) => {
  const { img, category } = props;
  return (
    <div className="category p-1 mb-4">
      <Link to="/courses" className="category-link">
        <img src={img} alt="logo category" />
      </Link>
      <h6 className="fw-bold">{category}</h6>
    </div>
  );
};

export default Category;
