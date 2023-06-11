import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderCpmponent from "../../components/Header/Header";
import MyTeach from "../../components/MyTeach/MyTeach";
import "./MyteachPage.css";

import React from "react";

const MyteachPage = () => {
  return (
    <>
      <HeaderCpmponent />
      <MyTeach />
      <FooterComponent />
    </>
  );
};

export default MyteachPage;
