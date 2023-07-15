import React, { useEffect } from "react";
import "./MainpageComponent.css";
import MainpageHeader from "../MainpageHeader/MainpageHeader";
import Tweet from "../Tweet/Tweet";
import { useState } from "react";
import axios from "axios";

const MainpageComponent = () => {
  const [tweets, setTweets] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const token = JSON.parse(localStorage.getItem("accessToken"));

  // Function to call when a new tweet is created
  const handleNewTweet = (tweet) => {
    setIsUpdate(!isUpdate);
  };

  //Render khi lần đầu vào
  useEffect(() => {
    getTweetsOnNewFeed();
  }, [isUpdate]);
  console.log(tweets);

  const getTweetsOnNewFeed = async () => {
    const response = await axios.get(
      "http://localhost:4000/tweets/getTweetByTime",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data.tweets);
    setTweets(response.data.tweets);
  };

  return (
    <div className="mainpage-component">
      <MainpageHeader setIsUpdate={setIsUpdate} />
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  );
};

export default MainpageComponent;
