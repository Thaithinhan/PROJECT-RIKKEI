import ListLecture from "../ListLecture/ListLecture";
import { Reviews, SearchTab, YourComment } from "../TabLecture/TabLecture";
import "./LecturView.css";
import React, { useState } from "react";

const LectureView = () => {
  const [tab, setTab] = useState("reviews");

  return (
    <div className="lecture">
      <div className="top-lecture bg-dark p-2">
        <h5 className="text-white">Học ReactJS Từ A-Z</h5>
      </div>
      <div className="lecture-content d-lg-flex">
        <div className="left-lecture">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/bMknfKXIFA8"
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
          <ListLecture />
        </div>
      </div>
    </div>
  );
};

export default LectureView;
