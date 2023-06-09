import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ handleFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        checkboxValue,
      ]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== checkboxValue)
      );
    }
  };
  useEffect(() => {
    handleFilter(selectedCategories);
  }, [selectedCategories]);

  return (
    <div>
      <div className="rating-filter">
        <h5>Rating</h5>
        <ul className="p-2">
          <li>
            <input
              type="radio"
              name="rate"
              value="1"
              id="max-high"
              onChange={handleCheckboxChange}
            />
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
            <input
              type="checkbox"
              name="js"
              value="javascript"
              id="js"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="js" className="mx-2">
              Javascript
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="html-css"
              value="html-css"
              id="html-css"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="html-css" className="mx-2">
              HTML-CSS
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="reactjs"
              value="reactjs"
              id="reactjs"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="reactjs" className="mx-2">
              ReactJS
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="accounting"
              value="accounting"
              id="accounting"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="accounting" className="mx-2">
              Accounting
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="bookeeping"
              value="bookeeping"
              id="bookeeping"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="bookeeping" className="mx-2">
              Bookeeping
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
