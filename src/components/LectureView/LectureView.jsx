import { useNavigate, useParams } from "react-router-dom";
import ListLecture from "../ListLecture/ListLecture";
import { Reviews, SearchTab, YourComment } from "../TabLecture/TabLecture";
import "./LecturView.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const LectureView = () => {
  const [tab, setTab] = useState("reviews");
  const [isCheck, isChecked] = useState(true);
  const navigate = useNavigate();

  const courses = useSelector((state) => state.myTeach);
  const getAllCourse = courses.map((course) => course.courseUser).flat();
  const courseID = useParams();
  const listMycoure = useSelector((state) => state.checkout);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const findIndex = listMycoure.findIndex(
    (course) => course.currentUser?.email === userLogin?.email
  );

  const lecture = listMycoure[findIndex]?.courseUser?.find(
    (course) => course.id === courseID.id
  );

  const listUrls = lecture?.listVideo;
  // console.log(listUrls);
  const [url, setUrrl] = useState(listUrls[0]);

  if (!getAllCourse.find((course) => course.id === courseID.id)) {
    toast.error("This courser is not available", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    return <ToastContainer />;
  }

  const handleChangeurl = (value) => {
    setUrrl(value);
  };

  return (
    <div className="lecture">
      <div className="top-lecture bg-dark p-2">
        <h5 className="text-white">Khoá học: {lecture.name}</h5>
      </div>
      <div className="lecture-content d-lg-flex">
        <div className="left-lecture">
          <iframe
            width="100%"
            height="500"
            src={url}
            title="React Course - Beginner&#39;s Tutorial for React JavaScript Library [2022]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <div className={`comment review `}>
            <div className="btns-tabs">
              <button
                className={`btn-search-lecture btn btn-none fw-bold ${
                  tab === "search" ? "active-tab" : ""
                }`}
                onClick={() => setTab("search")}
              >
                Search Lecture
              </button>
              <button
                className={`btn-comment btn btn-none fw-bold ${
                  tab === "comment" ? "active-tab" : ""
                }`}
                onClick={() => setTab("comment")}
              >
                Comment
              </button>
              <button
                className={`btn-comment btn btn-none fw-bold ${
                  tab === "reviews" ? "active-tab" : ""
                } `}
                onClick={() => setTab("reviews")}
              >
                Reviews
              </button>
            </div>
            <div className="show-tab">
              {tab === "search" ? (
                <SearchTab />
              ) : tab === "comment" ? (
                <YourComment />
              ) : (
                <Reviews />
              )}
            </div>
          </div>
        </div>
        <div className="right-lecture">
          <ListLecture handleChangeurl={handleChangeurl} />
        </div>
      </div>
    </div>
  );
};

export default LectureView;
