import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <div className="rating-filter">
        <h5>Rating</h5>
        <ul className="p-2">
          <li>
            <input type="radio" name="rate" value="1" id="max-high" />
            <label htmlFor="max-high" className="mx-2">
              4.5 & up
            </label>
          </li>
          <li>
            <input type="radio" name="rate" value="2" id="high" />
            <label htmlFor="high" className="mx-2">
              4.0 & up
            </label>
          </li>
          <li>
            <input type="radio" name="rate" value="3" id="medium" />
            <label htmlFor="medium" className="mx-2">
              3.5 & up
            </label>
          </li>
        </ul>
      </div>
      <div className="topic-filter">
        <h5>Topic</h5>
        <ul className="p-2">
          <li>
            <input type="checkbox" name="js" value="js" id="js" />
            <label htmlFor="js" className="mx-2">
              Javascript
            </label>
          </li>
          <li>
            <input type="checkbox" name="js" value="js" id="js" />
            <label htmlFor="js" className="mx-2">
              HTML-CSS
            </label>
          </li>
          <li>
            <input type="checkbox" name="js" value="js" id="js" />
            <label htmlFor="js" className="mx-2">
              ReactJS
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
