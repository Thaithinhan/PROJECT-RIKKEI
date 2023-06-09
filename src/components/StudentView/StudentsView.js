import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Rate } from "antd";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderCourse.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { login } from "../../redux/reducer/UsersSlice";

const StudentsView = (props) => {
  const [slidesPerView, setSlidesPerView] = useState(5);

  // console.log(props.filterCourses);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSlidesPerView(1.5);
      } else {
        setSlidesPerView(5);
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
        {props.courses.map((course) => (
          <SwiperSlide key={course.id}>
            <div className="list-course p-2">
              <Link to={`/course-detail/${course.id}`} className="nav-link">
                <img
                  src={course.image}
                  alt="img-course"
                  className="img-course"
                />
                <p className="fw-bold name-course mb-0">{course.name}</p>
                <p className="author text-secondary m-0">Author</p>
              </Link>
              <div className="rating-course m-0 text-warning">
                <span className="fw-bold me-2">5</span>
                <Rate allowHalf defaultValue={5} />
              </div>
              <p className="price-course fw-bold mb-0">
                đ{Number(course.price).toLocaleString()}
              </p>
              <span className="bg-success-subtle py-1 px-2  fw-bold d-inline-block mt-1 rounded best-seller">
                Best Seller
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StudentsView;
