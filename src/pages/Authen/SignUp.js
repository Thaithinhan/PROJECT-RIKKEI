import React from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import Signup from "../../components/Signup/Signup";
import HeaderCpmponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";

const SignUp = () => {
  return (
    <>
      <HeaderCpmponent />
      <Signup />;
      <FooterComponent />
    </>
  );
};

export default SignUp;
