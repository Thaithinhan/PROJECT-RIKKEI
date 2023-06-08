import "./ListLecture.css";

import React from "react";

const ListLecture = () => {
  return (
    <div className="list-lectures">
      <ul>
        <li className="active-lec">
          <input type="checkbox" />
          <button className="btn btn-none">Bài 1</button>
        </li>
        <li>
          <input type="checkbox" />
          <button className="btn btn-none">Bài 2</button>
        </li>
      </ul>
    </div>
  );
};

export default ListLecture;
