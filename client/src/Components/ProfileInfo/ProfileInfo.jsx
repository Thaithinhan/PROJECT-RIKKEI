import React, { useEffect, useState } from "react";
import "./ProfileInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../../redux/reducer/userSlice";
import {
  checkFollow,
  makeFollowing,
  unFollow,
} from "../../redux/reducer/followSlice";

const ProfileInfo = ({ setIsUpdateFollower }) => {
  const location = useLocation();
  const params = useParams();
  const id = params?.id;
  // console.log(params.id);
  const userStore = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));

  const fetchUserbyId = async () => {
    const data = await dispatch(getUserById(id)).unwrap();
    setUser(data);
  };

  const checkFollowing = async () => {
    const data = await dispatch(checkFollow(user)).unwrap();
    setIsFollow(data.isFollowing);
  };

  useEffect(() => {
    if (id) {
      fetchUserbyId();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      checkFollowing();
    }
  }, [user]);

  // console.log(user?._id);

  //XỬ LÝ FOLLOW
  const handleFollowing = async (user) => {
    const data = await dispatch(makeFollowing(user)).unwrap();
    checkFollowing();
    setIsUpdateFollower();
  };

  //Xử lý Unfollow
  const handleUnFollowing = async (user) => {
    await dispatch(unFollow(user)).unwrap();
    checkFollowing();
    setIsUpdateFollower();
  };

  return (
    <div className="profile-info">
      <div className="user-imgs-info">
        <h4 className="fw-bold p-2">
          {id ? user?.fullname : userStore?.fullname}
        </h4>
        <div className="cover-img">
          <img
            src={id ? user?.cover_photo : userStore?.cover_photo}
            alt="cover-page"
          />
        </div>
        <div className="avt-img">
          <img src={id ? user?.avatar : userStore?.avatar} alt="avt-page" />
        </div>
        {location.pathname === "/my-profile" || userLogin?._id === id ? (
          <button className="btn btn-outline-primary btn-edit-profile">
            Edit Profile
          </button>
        ) : isFollow ? (
          <button
            className="btn btn-outline-dark btn-follow btn-unfollow"
            onClick={() => handleUnFollowing(user)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="btn btn-outline-dark btn-follow"
            onClick={() => handleFollowing(user)}
          >
            Follow
          </button>
        )}
      </div>
      <div className="user-profile-info px-4">
        <h5 className="fullname mt-2">
          <b>{id ? user?.fullname : userStore?.fullname}</b>
        </h5>
        <p className="username text-secondary">
          @{id ? user?.username : userStore.username}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
