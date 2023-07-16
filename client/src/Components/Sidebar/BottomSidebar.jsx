import React from "react";
import "./BottomSidebar.css";
import { useNavigate } from "react-router-dom";

const BottomSidebar = () => {
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login-user");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="bottom-sidebar">
      <div className="loginUser-info">
        <div className="userAlphabet">
          <img src={userLogin.avatar} alt="avt" className="avt-user" />
        </div>
        <div className="username-content">
          <b className="emailname_info">{userLogin.fullname}</b>
          <p className="username-info m-0 text-secondary">
            @{userLogin.username}
          </p>
        </div>
      </div>
      <button
        className="btn-logout btn btn-outline-primary"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default BottomSidebar;
