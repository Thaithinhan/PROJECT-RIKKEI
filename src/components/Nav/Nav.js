import React, { useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(-1);

  const toggleMenu = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  const menuData = [
    {
      category: "Development",
      articles: ["HTML-CSS", "REACTJS", "JAVASCRIPT", "NODEJS"],
    },
    {
      category: "Accounting & Finance",
      articles: ["Accounting", "Bookeeping", "Economic"],
    },
  ];

  return (
    <div className="dropdown">
      {menuData.map((menuItem, index) => (
        <div className="dropdown__item" key={index}>
          <Link
            to={"/"}
            className="dropdown__title nav-link"
            onClick={() => toggleMenu(index)}
          >
            {menuItem.category}
            <span
              className={`dropdown__arrow ${
                openMenuIndex === index ? "open" : ""
              }`}
            ></span>
          </Link>
        </div>
      ))}
      {/* Lọc article */}
      {menuData.map(
        (menuItem, index) =>
          openMenuIndex === index && (
            <ul className="dropdown__menu" key={index}>
              {menuItem.articles.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link to={"/"} className="nav-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )
      )}
    </div>
  );
};

export default Nav;
