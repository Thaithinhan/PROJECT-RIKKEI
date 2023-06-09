import { useParams } from "react-router-dom";
import "./ListLecture.css";

import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListLecture = (props) => {
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
  const [ative, setActive] = useState(listUrls[0]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleClick = (e, value) => {
    // console.log(value);
    props.handleChangeurl(value);
    setActive(value);
    // Cập nhật checkbox được chọn
    setSelectedCheckbox(value);
  };

  return (
    <div className="list-lectures">
      <ul>
        {listUrls &&
          listUrls.map((url, index) => (
            <li className={ative === url ? "active-lec" : ""} key={index}>
              <input
                type="checkbox"
                checked={selectedCheckbox === url}
                onChange={() => {}}
              />
              <button
                className="btn btn-none"
                onClick={(e) => handleClick(e, url)}
              >
                Bài {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListLecture;
