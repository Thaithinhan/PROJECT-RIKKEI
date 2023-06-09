import React from "react";
import { Link, useParams } from "react-router-dom";
import { Rate } from "antd";
import "./Course.css";
import { useSelector } from "react-redux";

const Course = (props) => {
  // const courses = useSelector((state) => state.courses);

  const myTeach = useSelector((state) => state.myTeach);

  // const courses = useSelector((state) => state.courses);

  let courses = myTeach.map((courses) => courses.courseUser);

  // console.log(listCourses);
  courses = courses.flat(Infinity);
  // console.log(courses);
  const category = props.category;

  const selectedCategories = props.selectedCategories;
  // console.log(selectedCategories);
  const chooseByCate =
    category.category === "Web-Development" ? "webdevelopment" : "accounting";

  const listCourses = courses.filter(
    (course) => course.category === chooseByCate
  );

  const filteredCourses = listCourses.filter((course) =>
    selectedCategories.includes(course.topic.toLowerCase())
  );

  console.log(filteredCourses);
  console.log(listCourses);

  // console.log(listCourses);

  return filteredCourses.length > 0
    ? filteredCourses.map((course) => (
        <Link
          key={course.id}
          to={`/course-detail/${course.id}`}
          className="course-component nav-link"
        >
          <div className="top-course d-lg-flex">
            <img src={course.image} alt="" />
            <div className="course-info">
              <p className="fw-bold name-course mb-0">{course.name}</p>
              <p className="author text-secondary m-0">{course.author}</p>

              <div className="rating-course m-0 text-warning">
                <span className="fw-bold me-2">5.0</span>
                <Rate allowHalf defaultValue={5} />
              </div>
              <p className="price-course fw-bold mb-0">
                đ {Number(course.price).toLocaleString()}
              </p>
              <span className="bg-success-subtle py-1 px-2  fw-bold d-inline-block mt-1 rounded best-seller">
                Best Seller
              </span>
            </div>
          </div>
          <div className="bot-course">
            <button className="btn btn-none rounded-0 add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </Link>
      ))
    : listCourses.map((course) => (
        <Link
          key={course.id}
          to={`/course-detail/${course.id}`}
          className="course-component nav-link"
        >
          <div className="top-course d-lg-flex">
            <img src={course.image} alt="" />
            <div className="course-info">
              <p className="fw-bold name-course mb-0">{course.name}</p>
              <p className="author text-secondary m-0">{course.author}</p>

              <div className="rating-course m-0 text-warning">
                <span className="fw-bold me-2">5.0</span>
                <Rate allowHalf defaultValue={5} />
              </div>
              <p className="price-course fw-bold mb-0">
                đ {Number(course.price).toLocaleString()}
              </p>
              <span className="bg-success-subtle py-1 px-2  fw-bold d-inline-block mt-1 rounded best-seller">
                Best Seller
              </span>
            </div>
          </div>
          <div className="bot-course">
            <button className="btn btn-none rounded-0 add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </Link>
      ));
};

export default Course;
