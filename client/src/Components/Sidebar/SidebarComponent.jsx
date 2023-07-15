import React from "react";
import TopSidebar from "./TopSidebar";
import BottomSidebar from "./BottomSidebar";
import "./SidebarComponent.css";

const SidebarComponent = () => {
  return (
    <div className="sidebar">
      <TopSidebar />
      <BottomSidebar />
    </div>
  );
};

export default SidebarComponent;
