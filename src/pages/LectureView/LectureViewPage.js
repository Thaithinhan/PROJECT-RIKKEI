import React from "react";
import LectureView from "../../components/LectureView/LectureView";
import ListLecture from "../../components/ListLecture/ListLecture";
import "./LectureViewPage.css";

export const LectureViewPage = () => {
  return (
    <div className="lectures">
      <LectureView />
    </div>
  );
};
export default LectureViewPage;
