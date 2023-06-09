import { useParams } from "react-router-dom";
import "./TabLecture.css";
import { useDispatch, useSelector } from "react-redux";
import { getComment, postComment } from "../../redux/reducer/CommentSlice";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

export const SearchTab = () => {
  return (
    <>
      <div className="search-tab">
        <input
          type="text"
          name="input-lecture"
          placeholder="Enter lecture name"
        />
        <button className="btn btn-dark rounded-0">Search</button>
      </div>
      <h3 className="fw-bold text-center">Start a new search</h3>
    </>
  );
};

export const YourComment = () => {
  const idCourse = useParams();
  const dispatch = useDispatch();
  const [inputValue, setInputvalue] = useState("");

  //Handle input Change

  const handleInputChange = debounce((e) => {
    setInputvalue(e.target.value);
  }, 1000);

  // console.log(inputValue);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const userLogin = JSON.parse(localStorage.getItem("login-user"));
    // console.log(idCourse.id);
    await dispatch(
      postComment({
        comment_email: userLogin,
        id_Course: idCourse.id,
        content_comment: inputValue,
      })
    ).unwrap();
    setInputvalue("");
  };

  return (
    <>
      <form className="comment-tab" onSubmit={handleSubmitComment}>
        <input
          type="text"
          name="input-lecture"
          placeholder="Enter your comment"
          onChange={handleInputChange}
        />
        <button className="btn btn-dark rounded-0" type="submit">
          Post your comment
        </button>
      </form>
      <h3 className="fw-bold text-center">Start a new comment</h3>
    </>
  );
};

export const Reviews = () => {
  const dispatch = useDispatch();
  const idCourse = useParams();

  useEffect(() => {
    dispatch(getComment()).unwrap();
  }, []);

  const comments = useSelector((state) => state.comment);
  const commentsCourse = comments.filter(
    (comment) => comment.id_Course === idCourse.id
  );

  // console.log(commentsCourse);

  return (
    <>
      {commentsCourse &&
        commentsCourse.length > 0 &&
        commentsCourse.map((comment) => (
          <div className="reviews-tab d-lg-flex" key={comment.id}>
            <div className="img-review">
              <img src={comment.comment_email.image} alt="avt-user-review" />
            </div>
            <div className="review-info">
              <h6 className="review-username">
                {comment.comment_email.fullname}
              </h6>
              <p>{comment.content_comment}</p>
            </div>
          </div>
        ))}
    </>
  );
};
