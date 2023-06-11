import React, { useEffect, useState } from "react";
import AdminComponent from "../../components/Admin/Admin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

const Admin = () => {
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
 

  // useEffect(() => {
  //   if (userLogin && userLogin.email !== "admin@gmail.com") {
  //     navigate("/");
  //   } else {
  //     navigate("/admin");
  //   }
  // }, []);
  const [tab, setTab] = useState("users");
  const [showContentTab, setShowContentTab] = useState(tab);

  const handleChangeTab = (value) => {
    setTab(value);
    setShowContentTab(value);
  };

  return (
    <div>
      <SidebarAdmin handleChangeTab={handleChangeTab} />
      <AdminComponent showContentTab={showContentTab} />
    </div>
  );
};

export default Admin;
