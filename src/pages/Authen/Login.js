import React from "react";
import "./Login.css";
import LoginComponent from "../../components/Login/Login";
import HeaderCpmponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";

const Login = () => {
  return (
    <>
      <HeaderCpmponent />
      <LoginComponent />;
      <FooterComponent />
    </>
  );
};

export default Login;
