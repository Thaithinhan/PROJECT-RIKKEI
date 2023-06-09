import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import "./CourseDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../redux/reducer/CartsSlice";

export const CourseDetail = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const carts = useSelector((state) => state.carts);
  const checkout = useSelector((state) => state.checkout);
  // console.log("checkout tại component ==>", checkout);
  courses.length > 0 &&
    localStorage.setItem("coursesLocal", JSON.stringify(courses));
  const dataLocal = JSON.parse(localStorage.getItem("coursesLocal"));
  const courseId = useParams();
  const [couserDetail, setCourseDetail] = useState(null);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  // const carts = JSON.parse(localStorage.getItem("carts"));
  const [isCheckCourse, setisCheckCourse] = useState(null);
  const [isGoToCourse, setisGoToCourse] = useState(null);
  const myTeach = useSelector((state) => state.myTeach);
  // const courses = useSelector((state) => state.courses);

  let listCourses = myTeach.map((courses) => courses.courseUser);

  // console.log(listCourses);
  listCourses = listCourses.flat(Infinity);

  const navigate = useNavigate();

  useEffect(() => {
    const data =
      listCourses?.length > 0 &&
      listCourses.find((course) => course.id === courseId.id);
    setCourseDetail(data);
  }, [listCourses]);

  useEffect(() => {
    const findUser = carts.findIndex(
      (cart) => cart.currentUser?.email === userLogin?.email
    );

    const findUserBuyCourse = checkout?.findIndex(
      (course) => course.currentUser?.email === userLogin?.email
    );

    setisGoToCourse(checkout[findUserBuyCourse]);

    setisCheckCourse(carts[findUser]);
  }, [carts, checkout, userLogin?.email]);

  //Handle Add to Cart
  const handleAddtoCart = (course) => {
    if (!userLogin) {
      toast.warning("Please login to add to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    //Thực thi khi đã login
    // console.log(couserDetail);
    // dispatch 1 action đồng bộ nó là object gồm 1 khoá học đc add, tài khoản đang đăng nhập
    dispatch(addToCart({ couserDetail, currentUser: userLogin }));
    toast.success("Add to cart successfull", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // console.log("isCheckCourse", isCheckCourse);
  const showGotoCart = isCheckCourse?.courseUser.find(
    (course) => course.id === courseId.id
  );

  const showGotoCourse = isGoToCourse?.courseUser.find(
    (course) => course.id === courseId.id
  );
  // console.log(showGotoCart);

  const handleGotoCart = () => {
    navigate("/cart");
  };

  const handleGotoCourse = () => {
    // console.log(courseId);
    navigate(`/lecture/${courseId.id}`);
  };

  return (
    <div className="course my-5">
      <ToastContainer />
      <div className="top-course bg-dark text-white p-2">
        <Container className="d-lg-flex justify-content-between">
          <div className="left-side-course">
            <h3 className="fw-bold course-name">{couserDetail?.name}</h3>
            <p className="course-short-desc">{couserDetail?.desc}</p>
            <div className="rating-number-student">
              <p className="text-warning fw-bold rating">
                <span className="me-1">4.6</span>
                <span className="star-rate">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarHalf />
                </span>
                <span className="students-view text-white ms-3">
                  1.750.000 students
                </span>
              </p>
            </div>
            <p className="created-by">Created by {couserDetail?.author}</p>
            <p className="last-update">Last update {couserDetail?.createdAt}</p>
          </div>
          <div className="right-course">
            <iframe
              width="300"
              height="250"
              src={couserDetail?.preVideo}
              title="React Course - Beginner&#39;s Tutorial for React JavaScript Library [2022]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h6 className="fw-bold ms-2">Preview this course</h6>
            <h4 className="fw-bold ms-2 course-price">
              đ{Number(couserDetail?.price).toLocaleString()}
            </h4>
            {showGotoCourse ? (
              <button
                className="btn btn-none bg-dark rounded-0 add-to-cart"
                onClick={() => handleGotoCourse(handleGotoCourse)}
              >
                GO TO COURSE
              </button>
            ) : !showGotoCart || !isCheckCourse ? (
              <button
                className="btn btn-none rounded-0 add-to-cart"
                onClick={() => handleAddtoCart(couserDetail)}
              >
                ADD TO CART
              </button>
            ) : (
              <button
                className="btn btn-none rounded-0 add-to-cart"
                onClick={() => handleGotoCart()}
              >
                GO TO CART
              </button>
            )}
          </div>
        </Container>
      </div>
      <div className="bottom-course my-5">
        <Container>
          <h3>What you'll learn in this course</h3>
          <ul>
            <li>
              <TiTick /> Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Iure libero quo aliquid minus, similique iusto.
            </li>
            <li>
              <TiTick /> Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Iure libero quo aliquid minus, similique iusto.
            </li>
            <li>
              <TiTick /> Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Iure libero quo aliquid minus, similique iusto.
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
};

export default CourseDetail;
