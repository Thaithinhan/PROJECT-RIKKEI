import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = (props) => {
  const [url, setUrl] = useState({
    url1: "",
    url2: "",
  });
  useEffect(() => {
    if (localStorage.getItem("login-user")) {
      return setUrl({ ...props.url });
    } else {
      return setUrl({
        url1: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/785695e9-5e74-486e-98d5-27354a474246.jpg",
        url2: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg",
      });
    }
  }, [props.url]);
  return (
    <Container>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide
          className="slide-first p-5"
          style={{ backgroundImage: `url(${url.url1})` }}
        >
          <div className="bg-white p-4 content-banner">
            <h2 className="fw-bold">Unlock the power of your people</h2>
            <p>
              Udemy Business is trusted by 12.5K+ companies around the world.
              Find out what we can do for yours.
            </p>
            <Link className="btn btn-dark">Request a demo</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="slide-second p-5"
          style={{ backgroundImage: `url(${url.url2})` }}
        >
          <div className="bg-white p-4 content-banner">
            <h2 className="fw-bold">Learning that gets you</h2>
            <p>
              Udemy Business is trusted by 12.5K+ companies around the world.
              Find out what we can do for yours.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Banner;
