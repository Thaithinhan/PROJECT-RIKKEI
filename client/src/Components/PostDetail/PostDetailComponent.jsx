import React, { useState } from "react";
import "./PostDetailComponent.css";
import DropdownComponent from "../Dropdown/DropdownComponent";
import Tweet from "../Tweet/Tweet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const PostDetailComponent = () => {
  const [showComment, setShowComment] = useState(true);
  const [tweetParent, setTweetParent] = useState();
  const params = useParams();
  const idTweet = params.id;

  //Lấy dữ liệu tweet theo ID
  const getTweetByIdTweet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/tweets/${id}`);
      setTweetParent(response.data.tweet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweetByIdTweet(idTweet);
  }, [idTweet]);

  return (
    <div className="post-detail-component">
      <h4 className="p-2 fw-bold">Tweets</h4>
      <div className="post-detail-header">
        <Tweet tweet={tweetParent} />
      </div>
      <div className="list-comments">
        <h6 onClick={() => setShowComment(!showComment)}>
          <b>{showComment ? "Hidden comments" : "Show comments"}</b>
        </h6>
        {showComment && <Tweet />}
      </div>
    </div>
  );
};

export default PostDetailComponent;
