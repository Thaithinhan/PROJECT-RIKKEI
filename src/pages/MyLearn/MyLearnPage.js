import React from "react";
import MyLearnComponent from "../../components/MyLearn/MyLearn";
import "./MyLearnPage.css";
import HeaderCpmponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";

const MyLearnPage = () => {
  return (
    <>
      <HeaderCpmponent />
      <div className="my-learn">
        <MyLearnComponent />
      </div>
      <FooterComponent />
    </>
  );
};

export default MyLearnPage;
