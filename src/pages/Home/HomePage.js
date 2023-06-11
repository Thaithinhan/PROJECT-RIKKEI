import React, { useEffect, useState } from "react";
import Banner from "../../components/Banners/Banner";
import MainContentNomal from "../../components/MainContent/MainContentNomal";
import MainContentUser from "../../components/MainContent/MainContentUser";
import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import HeaderCpmponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";
import { ToastContainer } from "react-bootstrap";

const HomePage = () => {
  const [url, setUrl] = useState(null);
  const [isCheck, setIssCheck] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userLogin && userLogin.email === "admin@gmail.com") {
  //     navigate("/admin");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);
  // localStorage.setItem(
  //   "login-user",
  //   JSON.stringify({ username: "Nhanthai123" })
  // );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login-user"))) {
      setIssCheck(true);
    }

    if (isCheck) {
      setUrl({
        url1: "https://img-c.udemycdn.com/notices/featured_carousel_slide/image/57a0c350-31a7-47e5-8038-3f1efa0e2a94.jpg",
        url2: "https://img-c.udemycdn.com/notices/featured_carousel_slide/image/df576593-ecce-49d3-a2fe-853ff71feeac.jpg",
      });
    }

    return () => {
      setIssCheck(false);
    };
  }, [isCheck]);

  return (
    <>
      <ToastContainer />
      <HeaderCpmponent />
      <div>
        {JSON.parse(localStorage.getItem("login-user")) && <Nav />}
        <Banner url={url} />
        {JSON.parse(localStorage.getItem("login-user")) ? (
          <MainContentUser />
        ) : (
          <MainContentNomal />
        )}
      </div>
      <FooterComponent />
    </>
  );
};

export default HomePage;
