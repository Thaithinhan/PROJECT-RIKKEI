import {
  MyCustomer,
  MyTeachCourse,
  TabAddNewACourse,
} from "../TabMyTeach/TabMyTeach";
import "./Myteach.css";

import React, { useState } from "react";

export const MyTeach = () => {
  const [tab, setTab] = useState("add");

  return (
    <div className="teach-page">
      <div className="btns-tabs">
        <button
          className={`btn-search-lecture btn btn-none fw-bold ${
            tab === "add" ? "active-tab" : ""
          }`}
          onClick={() => setTab("add")}
        >
          Create A Course
        </button>
        <button
          className={`btn-comment btn btn-none fw-bold ${
            tab === "course" ? "active-tab" : ""
          }`}
          onClick={() => setTab("course")}
        >
          My training course
        </button>
        <button
          className={`btn-comment btn btn-none fw-bold ${
            tab === "customer" ? "active-tab" : ""
          } `}
          onClick={() => setTab("customer")}
        >
          My Customer
        </button>
      </div>
      <div className="show-tab">
        {tab === "add" ? (
          <TabAddNewACourse />
        ) : tab === "course" ? (
          <MyTeachCourse />
        ) : (
          <MyCustomer />
        )}
      </div>
    </div>
  );
};

export default MyTeach;
