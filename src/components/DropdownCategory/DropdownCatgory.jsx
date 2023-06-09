import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./DropdownCategory.css";

const DropdownCatgory = (props) => {
  return (
    <div
      className={
        props.toggleDropdown
          ? "dropdown-cate-container show"
          : "dropdown-cate-container"
      }
    >
      <ul>
        <li>
          <Link to={`/courses/Web-Development`}>Web Development</Link>
        </li>
        <li>
          <Link to={`/courses/Accounting-Financial`}>Accounting & Finance</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropdownCatgory;
