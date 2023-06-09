import React from "react";

import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Rate } from "antd";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Mylearn.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MyLearnComponent() {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const checkout = useSelector((state) => state.checkout);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  // console.log(checkout);
  const index = checkout?.findIndex(
    (item) => item.currentUser.email === userLogin.email
  );
  const myLearn = checkout[index]?.courseUser;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSlidesPerView(1.5);
      } else {
        setSlidesPerView(3);
      }
    };

    window.addEventListener("resize", handleResize);
    // Xóa lắng nghe sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={0}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {myLearn &&
          myLearn.map((course) => (
            <SwiperSlide key={course.id}>
              <div className="list-my-learn p-2">
                <Link to={`/lecture/${course.id}`} className="nav-link">
                  <img
                    src={course.image}
                    alt="img-mycourse"
                    className="img-mylearn"
                  />
                  <div className="mylearn-info">
                    <p className="fw-bold name-mylearn mb-0 text-secondary">
                      {course.name}
                    </p>
                    <p className="lession-mylearn fw-bold m-0">{course.desc}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
