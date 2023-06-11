import React from "react";
import CourseDetail from "../../components/CourseDetail/CourseDetail";
import HeaderCpmponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";

const CourseDetailPage = () => {
  return (
    <>
      <HeaderCpmponent />
      <div>
        <CourseDetail />
      </div>
      <FooterComponent />
    </>
  );
};

export default CourseDetailPage;
