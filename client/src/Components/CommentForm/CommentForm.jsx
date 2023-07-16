import React, { useState } from "react";
import "./CommentForm.css";
import { AiOutlinePicture } from "react-icons/ai"; // For image icon
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getCommentByTweetId,
} from "../../redux/reducer/commentSlice";
import { useLocation } from "react-router-dom";

const CommentForm = ({ parentId, setComments, comments, setTweets }) => {
  const [images, setImages] = useState([]);
  const [contentComment, setContentComment] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  //Sự kiện Onchange ô input
  const handleInputChange = (e) => {
    setContentComment(e.target.value);
  };

  //Sự kiện submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      content: contentComment,
      parentId: parentId,
    };
    const data = dispatch(createComment(newComment)).unwrap();
    setContentComment("");

    if (location.pathname === `/post-detail/${parentId}`) {
      setTweets((prevArray) => [...prevArray, data]);
      getCommentOfCurrentTweet(parentId);
    }
  };

  //Render ngay khi comment xong
  // Lấy comment theo IDtweet

  const getCommentOfCurrentTweet = async (id) => {
    try {
      const data = await dispatch(getCommentByTweetId(id)).unwrap();
      if (location.pathname === `/post-detail/${parentId}`) {
        setComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    // code to handle click event
  }; //stop event propagation

  return (
    <form
      className="comment-form"
      onSubmit={handleSubmit}
      onClick={handleClick}
    >
      <div className="comment-form__images">
        {images.map((image, index) => (
          <div key={index} className="comment-form__image">
            <img src={URL.createObjectURL(image)} alt="Preview" />
            <button
              onClick={() => handleImageRemove(index)}
              className="remove-image-comment-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <textarea
        placeholder="Write your comment..."
        name="content"
        onChange={handleInputChange}
        value={contentComment}
      ></textarea>
      <label className="img-comment text-primary">
        <AiOutlinePicture size={20} />
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          hidden
          name="images"
        />
      </label>
      <button type="submit" className="btn-sendcomment text-primary">
        <BsFillSendFill />
      </button>
    </form>
  );
};

export default CommentForm;
