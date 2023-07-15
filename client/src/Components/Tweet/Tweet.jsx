import React, { useState } from "react";
import "./Tweet.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DropdownComponent from "../Dropdown/DropdownComponent";
import { useDispatch } from "react-redux";
import moment from "moment"; // Import thư viện moment

const Tweet = ({ tweet }) => {
  const location = useLocation();
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hàm hỗ trợ để định dạng thời gian đăng bài post
  const formatTimestamp = (timestamp) => {
    // console.log(timestamp);
    const date = moment(timestamp); // Tạo đối tượng moment từ timestamp
    const now = moment(); // Đối tượng moment hiện tại

    if (now.diff(date, "days") < 1) {
      // Nếu chưa đủ 1 ngày
      return date.fromNow(); // Hiển thị dưới dạng "x phút trước", "vài giây trước",...
    } else {
      return date.format("DD/MM/YYYY"); // Hiển thị dưới dạng "ngày/tháng"
    }
  };

  //Hiển thị khi like
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  // console.log(showDropdown);

  //Chuyển trang detail  khi click vào bài tweet
  const handleNavigate = (id) => {
    navigate(`/post-detail/${id}`);
  };

  //Ngăn chặn sự kiện click truyền vào div tweet khi click vào thẻ Link
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="tweet nav-link" onClick={() => handleNavigate(tweet._id)}>
      <div className="tweet-header">
        <div className="tweet-info nav-link">
          <Link
            to={`/profile/${tweet?.userId_tweet?._id}`}
            onClick={handleLinkClick}
          >
            {" "}
            <img
              src={tweet?.userId_tweet?.avatar}
              alt="Avatar"
              className="avatar"
            />
          </Link>

          <span className="fullname">{tweet?.userId_tweet?.fullname}</span>
          <span className="username mx-2">
            @{tweet?.userId_tweet?.username}
          </span>
          <span className="timestamp">{formatTimestamp(tweet?.createdAt)}</span>
        </div>
        <DropdownComponent />
      </div>
      <div className="tweet-content">{tweet?.content}</div>

      <div className="imgs-tweets">
        {tweet?.medias?.length > 0 &&
          tweet?.medias.map((media, index) => (
            <img className="tweet-image" src={media} key={index} />
          ))}
      </div>

      <div className="tweet-footer">
        <span className="likes" onClick={handleLike}>
          155k {!like && <FavoriteBorderIcon className="icon-tweet" />}
          {like && <FavoriteOutlinedIcon className="text-danger" />}
        </span>
        <span className="retweets">
          50k <RepeatIcon className="icon-tweet" />
        </span>
        <span className="comment">
          50k <MapsUgcOutlinedIcon className="icon-tweet" />
        </span>
      </div>
    </div>
  );
};

export default Tweet;
