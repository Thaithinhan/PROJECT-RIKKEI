import React, { useState } from "react";
import "./CoursesPage.css";
import { MdFilterList } from "react-icons/md";
import { Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import Course from "../../components/Course/Course";

const CoursesPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="courses">
      <Container>
        <h2 className="fw-bold category-name">Development Course</h2>
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
            <Sidebar />
          </div>
          <div className={`course ${showSidebar ? "shift-right" : ""}`}>
            <Course />
            <Course />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CoursesPage;
