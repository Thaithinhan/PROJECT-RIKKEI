import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./MainContentUser.css";

import MyLearn from "../MyLearn/MyLearn";
import SliderCourse from "../SliderCourses/SliderCourse";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/reducer/CoursesSlice";
import StudentsView from "../StudentView/StudentsView";

const MainContentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll()).unwrap();
  }, [dispatch]);

  const myTeach = useSelector((state) => state.myTeach);
  // const courses = useSelector((state) => state.courses);

  let listCourses = myTeach.map((courses) => courses.courseUser);

  // console.log(listCourses);
  listCourses = listCourses.flat(Infinity);
  // console.log(listCourses);

  return (
    <Container>
      <div className="my-learning my-5">
        <div className="link-my-learn d-lg-flex align-items-center justify-content-between">
          <h2 className="fw-bold m-0">Let's start learning, Thi Nhan</h2>
          <Link to={"/my-learn"} className="my-learn-link fw-bold">
            My Learn
          </Link>
        </div>

        <MyLearn />
      </div>

      <div className="recommend-for-u my-5">
        <h2 className="fw-bold my-3">Recommended for you</h2>
        <StudentsView courses={listCourses} />
      </div>

      <div className="recommend-for-u my-5">
        <h2 className="fw-bold my-3">Students are viewing</h2>
        <StudentsView courses={listCourses} />
      </div>
    </Container>
  );
};

export default MainContentUser;
