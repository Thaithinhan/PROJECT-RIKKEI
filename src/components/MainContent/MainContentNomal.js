import React, { useEffect, useState } from "react";
import "./MainContentNomal.css";
import { Col, Container, Row } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import SliderCourse from "../SliderCourses/SliderCourse";
import Category from "../Category/Category";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/reducer/CoursesSlice";
import StudentsView from "../StudentView/StudentsView";

const MainContentNomal = () => {
  const [topic, setTopic] = useState("HTML-CSS");
  const [filterCourses, setFilterCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    setFilterCourses(courses.filter((course) => course.topic === topic));
  }, [topic]);

  const courses = useSelector((state) => state.courses);

  const handleClickButton = (value) => {
    setTopic(value);
  };

  return (
    <Container className="my-5">
      <div className="top-content ">
        <h2 className="fw-bold">A broad selection of courses</h2>
        <p className="fs-5">
          Choose from over 210,000 online video courses with new additions
          published every month
        </p>
      </div>
      <div className="list-topics ">
        <ul className="topics d-lg-none">
          <li className="topics-item border-bottom border-top ">
            <button
              className={`btn btn-none fw-bold ${
                topic === "HTML-CSS" ? "active-btn" : ""
              }`}
              onClick={() => handleClickButton("HTML-CSS")}
            >
              Html-Css <BsChevronDown />
            </button>
            <SliderCourse filterCourses={filterCourses} />
          </li>
          <li className="topics-item border-bottom">
            <button
              className={`btn btn-none fw-bold ${
                topic === "Javascript" ? "active-btn" : ""
              }`}
              onClick={() => handleClickButton("Javascript")}
            >
              Javascript <BsChevronDown />
            </button>
          </li>
          <li className="topics-item border-bottom ">
            <button
              className={`btn btn-none fw-bold ${
                topic === "ReactJS" ? "active-btn" : ""
              }`}
              onClick={() => handleClickButton("ReactJS")}
            >
              Reactjs <BsChevronDown />
            </button>
          </li>
          <li className="topics-item border-bottom ">
            <button
              className={`btn btn-none fw-bold ${
                topic === "Accounting " ? "active-btn" : ""
              }`}
              onClick={() => handleClickButton("Accounting ")}
            >
              Accounting <BsChevronDown />
            </button>
          </li>
          <li className="topics-item  border-bottom ">
            <button
              className={`btn btn-none fw-bold ${
                topic === " Bookeeping" ? "active-btn" : ""
              }`}
              onClick={() => handleClickButton("Bookeeping")}
            >
              Bookeeping <BsChevronDown />
            </button>
          </li>
        </ul>
        {/* Màn hình lớn */}
        <div className="lg-topics d-none d-lg-block">
          <ul className="topics d-none d-lg-flex my-3">
            <li className="topics-item">
              <button
                className={`btn btn-none fw-bold ${
                  topic === "HTML-CSS" ? "active-btn" : ""
                }`}
                onClick={() => handleClickButton("HTML-CSS")}
              >
                HTML-CSS
              </button>
            </li>
            <li className="topics-item">
              <button
                className={`btn btn-none fw-bold ${
                  topic === "Javascript" ? "active-btn" : ""
                }`}
                onClick={() => handleClickButton("Javascript")}
              >
                Javascript
              </button>
            </li>
            <li className="topics-item">
              <button
                className={`btn btn-none fw-bold ${
                  topic === "ReactJS" ? "active-btn" : ""
                }`}
                onClick={() => handleClickButton("ReactJS")}
              >
                Reactjs
              </button>
            </li>
            <li className="topics-item">
              <button
                className={`btn btn-none fw-bold ${
                  topic === "Accounting" ? "active-btn" : ""
                }`}
                onClick={() => handleClickButton("Accounting")}
              >
                Accounting
              </button>
            </li>
            <li className="topics-item">
              <button
                className={`btn btn-none fw-bold ${
                  topic === "Bookeeping" ? "active-btn" : ""
                }`}
                onClick={() => handleClickButton("Bookeeping")}
              >
                Bookeeping
              </button>
            </li>
          </ul>

          <SliderCourse filterCourses={filterCourses}></SliderCourse>
        </div>
      </div>
      <div className="students-viewing my-5">
        <h3 className="fw-bold">Students are viewing</h3>
        <StudentsView courses={courses} />
      </div>
      <div className="top-categories my-5">
        <h3 className="fw-bold">All Categories</h3>
        <Row>
          <Col lg={3}>
            <Category
              img="https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg"
              category="Web Development"
            />
          </Col>
          <Col lg={3}>
            <Category
              img="https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg"
              category="Accounting & Financials"
            />
          </Col>
          <Col lg={3}>
            <Category
              img="https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg"
              category="Accounting & Financials"
            />
          </Col>
        </Row>
      </div>
      <div className="trusted">
        <h3 className="text-center fw-bold">
          Trusted by over 13,400 great teams
        </h3>
        <p className="text-center">
          Leading companies use the same courses to help employees keep their
          skills fresh.
        </p>
        <ul className="row">
          <li className="col-md-4 col-lg-2">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg"
              alt=""
            />
          </li>
          <li className="col-md-4 col-lg-2">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg"
              alt=""
            />
          </li>
          <li className="col-md-4 col-lg-2">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/box-dark.svg"
              alt=""
            />
          </li>
          <li className="col-md-4 col-lg-2">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg"
              alt=""
            />
          </li>
          <li className="col-md-4 col-lg-2">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg"
              alt=""
            />
          </li>
          <li className="col-md-4 col-lg-2">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/tcs-dark.svg"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className="udemy-business my-5">
        <div className="left-business">
          <img
            src="https://www.udemy.com/staticx/udemy/images/v7/logo-ub.svg"
            alt=""
          />
          <h2 className="fw-bold my-3">
            Upskill your team with Udemy Business
          </h2>
          <ul>
            <li>
              Unlimited access to 22,000+ top Udemy courses, anytime, anywhere
            </li>
            <li>
              Unlimited access to 22,000+ top Udemy courses, anytime, anywhere
            </li>
            <li>Top certifications in tech and business</li>
          </ul>
          <button className="btn btn-dark rounded-0 my-4">
            Get Udemy Business
          </button>
        </div>
        <div className="right-business">
          <img
            src="https://s.udemycdn.com/home/non-student-cta/UB_Promo_800x800.jpg"
            width="400"
            alt=""
          />
        </div>
      </div>
      <div className="become-instructor my-5">
        <div className="left-instructor-img">
          <img
            src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
            width={"400"}
            alt=""
          />
        </div>
        <div className="right-instructor">
          <h2 className="fw-bold my-3">Become an instructor</h2>
          <p className="m-0">
            Instructors from around the world teach millions of students on
            Udemy. We provide the tools and skills to teach what you love.
          </p>
          <button className="btn btn-dark rounded-0 my-4">
            Get Teaching Today
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MainContentNomal;
