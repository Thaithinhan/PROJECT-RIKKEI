import React from "react";
import LectureView from "../../components/LectureView/LectureView";

import "./LectureViewPage.css";
import HeaderCpmponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";

export const LectureViewPage = () => {
  return (
    <>
      <HeaderCpmponent />
      <div className="lectures">
        <LectureView />
      </div>
      <FooterComponent />
    </>
  );
};
export default LectureViewPage;
