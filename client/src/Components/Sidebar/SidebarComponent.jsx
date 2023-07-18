import React from "react";
import TopSidebar from "./TopSidebar";
import BottomSidebar from "./BottomSidebar";
import "./SidebarComponent.css";

const SidebarComponent = ({isUpdate, setIsUpdate}) => {
  return (
    <div className="sidebar">
      <TopSidebar />
      <BottomSidebar isUpdate={isUpdate} />
    </div>
  );
};

export default SidebarComponent;
