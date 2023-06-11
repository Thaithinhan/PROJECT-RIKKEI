import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css";

const SidebarAdmin = ({ handleChangeTab }) => {
  const [active, setActive] = useState("users");

  return (
    <div className="sidebar-component">
      <div className="logo-img">
        <Link to={"/"}>
          <img
            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
            alt="logo"
          />
        </Link>
      </div>
      <ul>
        <li>
          <button
            className={`btn-img btn btn-none text-white fw-bold ${
              active === "users" ? "active-admin" : ""
            }`}
            onClick={() => {
              handleChangeTab("users");
              setActive("users");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt=""
            />
            <span>Customer List</span>
          </button>
        </li>
        <li>
          <button
            className={`btn-img btn btn-none text-white fw-bold ${
              active === "orders" ? "active-admin" : ""
            }`}
            onClick={() => {
              handleChangeTab("orders");
              setActive("orders");
            }}
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/tools-and-materials-ecommerce-hazel-vol-2/256/Work_Order_Management-512.png"
              alt=""
            />
            <span>Order List</span>
          </button>
        </li>
        <li>
          <button
            className={`btn-img btn btn-none text-white fw-bold ${
              active === "courses" ? "active-admin" : ""
            }`}
            onClick={() => {
              handleChangeTab("courses");
              setActive("courses");
            }}
          >
            <img
              src="https://cxuniversity.com/wp-content/uploads/2018/08/online-course-icon.png"
              alt=""
            />
            <span>Courses List</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
