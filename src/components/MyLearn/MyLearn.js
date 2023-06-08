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

const MyLearn = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);

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
        <SwiperSlide>
          <div className="list-my-learn p-2">
            <Link to={`/my-learn-detail/`} className="nav-link">
              <img
                src="https://mp4-c.udemycdn.com/2022-07-05_12-49-14-10f52f209930541104944d8d858a1a8c/2/thumb-1.jpg?Expires=1685904619&Signature=ALtxksNHZRrMDdE9E7Dra3crYXrXcu7gM4JjYckcPu2B2sET2gK9kKl-LJr31u6aRc4VTCekEFG93LSnIKCESLOUhNb5kPvIYup-LOYj6LF9IirPqsaEaNhAFT1BAvNJTj8orPpfA~PljXF650tuIklbvAbO0uTGN85qIwYTEP1X4ldSZpUImCQMpbDRIctyQzZ30eGFdT3x0Xzft4OXgw6BfRRPeDSb4Xy7m5apPug-f5mk-FafkS7fo0lSPbCqPnDGWGIGY4TRtKj7mQAfVAmvedgXAfif4zqBkT11sFVvcioPpyiDovEd4wSzY~HsiBbaW~kBeaGDDIyj3NVZ6g__&Key-Pair-Id=APKAITJV77WS5ZT7262A"
                alt="img-mycourse"
                className="img-mylearn"
              />
              <div className="mylearn-info">
                <p className="fw-bold name-mylearn mb-0 text-secondary">
                  HTML and CSS for Beginners - Build a Website & Launch ONLINE
                </p>
                <p className="lession-mylearn fw-bold m-0">
                  #14. #1. Setup Environmen{" "}
                </p>
              </div>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="list-my-learn p-2">
            <Link to={`/my-learn-detail/`} className="nav-link">
              <img
                src="https://mp4-c.udemycdn.com/2022-07-05_12-49-14-10f52f209930541104944d8d858a1a8c/2/thumb-1.jpg?Expires=1685904619&Signature=ALtxksNHZRrMDdE9E7Dra3crYXrXcu7gM4JjYckcPu2B2sET2gK9kKl-LJr31u6aRc4VTCekEFG93LSnIKCESLOUhNb5kPvIYup-LOYj6LF9IirPqsaEaNhAFT1BAvNJTj8orPpfA~PljXF650tuIklbvAbO0uTGN85qIwYTEP1X4ldSZpUImCQMpbDRIctyQzZ30eGFdT3x0Xzft4OXgw6BfRRPeDSb4Xy7m5apPug-f5mk-FafkS7fo0lSPbCqPnDGWGIGY4TRtKj7mQAfVAmvedgXAfif4zqBkT11sFVvcioPpyiDovEd4wSzY~HsiBbaW~kBeaGDDIyj3NVZ6g__&Key-Pair-Id=APKAITJV77WS5ZT7262A"
                alt="img-mycourse"
                className="img-mylearn"
              />
              <div className="mylearn-info">
                <p className="fw-bold name-mylearn mb-0 text-secondary">
                  HTML and CSS for Beginners - Build a Website & Launch ONLINE
                </p>
                <p className="lession-mylearn fw-bold m-0">
                  #14. #1. Setup Environmen{" "}
                </p>
              </div>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="list-my-learn p-2">
            <Link to={`/my-learn-detail/`} className="nav-link">
              <img
                src="https://mp4-c.udemycdn.com/2022-07-05_12-49-14-10f52f209930541104944d8d858a1a8c/2/thumb-1.jpg?Expires=1685904619&Signature=ALtxksNHZRrMDdE9E7Dra3crYXrXcu7gM4JjYckcPu2B2sET2gK9kKl-LJr31u6aRc4VTCekEFG93LSnIKCESLOUhNb5kPvIYup-LOYj6LF9IirPqsaEaNhAFT1BAvNJTj8orPpfA~PljXF650tuIklbvAbO0uTGN85qIwYTEP1X4ldSZpUImCQMpbDRIctyQzZ30eGFdT3x0Xzft4OXgw6BfRRPeDSb4Xy7m5apPug-f5mk-FafkS7fo0lSPbCqPnDGWGIGY4TRtKj7mQAfVAmvedgXAfif4zqBkT11sFVvcioPpyiDovEd4wSzY~HsiBbaW~kBeaGDDIyj3NVZ6g__&Key-Pair-Id=APKAITJV77WS5ZT7262A"
                alt="img-mycourse"
                className="img-mylearn"
              />
              <div className="mylearn-info">
                <p className="fw-bold name-mylearn mb-0 text-secondary">
                  HTML and CSS for Beginners - Build a Website & Launch ONLINE
                </p>
                <p className="lession-mylearn fw-bold m-0">
                  #14. #1. Setup Environmen{" "}
                </p>
              </div>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="list-my-learn p-2">
            <Link to={`/my-learn-detail/`} className="nav-link">
              <img
                src="https://mp4-c.udemycdn.com/2022-07-05_12-49-14-10f52f209930541104944d8d858a1a8c/2/thumb-1.jpg?Expires=1685904619&Signature=ALtxksNHZRrMDdE9E7Dra3crYXrXcu7gM4JjYckcPu2B2sET2gK9kKl-LJr31u6aRc4VTCekEFG93LSnIKCESLOUhNb5kPvIYup-LOYj6LF9IirPqsaEaNhAFT1BAvNJTj8orPpfA~PljXF650tuIklbvAbO0uTGN85qIwYTEP1X4ldSZpUImCQMpbDRIctyQzZ30eGFdT3x0Xzft4OXgw6BfRRPeDSb4Xy7m5apPug-f5mk-FafkS7fo0lSPbCqPnDGWGIGY4TRtKj7mQAfVAmvedgXAfif4zqBkT11sFVvcioPpyiDovEd4wSzY~HsiBbaW~kBeaGDDIyj3NVZ6g__&Key-Pair-Id=APKAITJV77WS5ZT7262A"
                alt="img-mycourse"
                className="img-mylearn"
              />
              <div className="mylearn-info">
                <p className="fw-bold name-mylearn mb-0 text-secondary">
                  HTML and CSS for Beginners - Build a Website & Launch ONLINE
                </p>
                <p className="lession-mylearn fw-bold m-0">
                  #14. #1. Setup Environmen{" "}
                </p>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MyLearn;
