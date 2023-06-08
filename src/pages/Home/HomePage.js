import React, { useEffect, useState } from "react";
import Banner from "../../components/Banners/Banner";
import MainContentNomal from "../../components/MainContent/MainContentNomal";
import MainContentUser from "../../components/MainContent/MainContentUser";
import Nav from "../../components/Nav/Nav";

const HomePage = () => {
  const [url, setUrl] = useState(null);
  const [isCheck, setIssCheck] = useState(false);

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
    <div>
      {JSON.parse(localStorage.getItem("login-user")) && <Nav />}
      <Banner url={url} />
      {JSON.parse(localStorage.getItem("login-user")) ? (
        <MainContentUser />
      ) : (
        <MainContentNomal />
      )}
    </div>
  );
};

export default HomePage;
