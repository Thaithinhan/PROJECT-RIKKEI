import React, { useState } from "react";
import "./CoursesPage.css";
import { MdFilterList } from "react-icons/md";
import { Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import Course from "../../components/Course/Course";
import { useParams } from "react-router-dom";

const CoursesPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSidebarVisible(!sidebarVisible);
  };

  const category = useParams();

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilter = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="courses">
      <Container>
        <h2 className="fw-bold category-name">
          {category.category === "Web-Development"
            ? "Web Development Courses"
            : "Accounting and Financial Courses"}
        </h2>
        <div className="top-head">
          <button
            className="filter-btn btn btn-none border border-dark rounded-0"
            onClick={toggleSidebar}
          >
            Filter <MdFilterList />
          </button>
          <select className="sort">
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
          </select>
          <button className="btn btn-none clear-filter-btn fw-bold">
            Clear Filter
          </button>
        </div>
        <div className="show-content">
          <div className={`sidebar ${showSidebar ? "show-sidebar" : ""}`}>
            <Sidebar handleFilter={handleFilter} />
          </div>
          <div className={`course ${showSidebar ? "shift-right" : ""}`}>
            <Course
              category={category}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CoursesPage;
