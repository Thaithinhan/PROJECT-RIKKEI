import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/reducer/UsersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
  const [inputValue, setInputValue] = useState({});
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataUser = JSON.parse(localStorage.getItem("login-user"));
  const [userLogin, setUserLogin] = useState({});

  useEffect(() => {
    const loginUser = dataUser;
    setUserLogin(loginUser);
  }, [user]);

  // console.log(users);

  //Handle Onchange Input
  console.log(dataUser);
  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  //Handle SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(inputValue)).unwrap();
      user &&
        toast.success("Login Successfull", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      setTimeout(() => {
        if (inputValue?.email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="login-component">
      <ToastContainer />
      <h5 className="fw-bold">Log in to your Udemy account</h5>
      <div className="logout-user">
        <img src={user.image ? user.image : userLogin?.image} alt="avt" />
        <p className="text-secondary user-name-logout">
          Welcome back, {user.fullname}
        </p>
      </div>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="btn btn-none border border-dark rounded-0 p-3"
          name="email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="btn btn-none border border-dark rounded-0 p-3"
          name="password"
          onChange={handleInputChange}
        />

        <input type="submit" id="btn-login" value="Sign In" />

        {/* <button className="btn btn-none border border-dark rounded-0 signin-google">
          <FcGoogle />
          <span className="fw-bold">Continue with Google</span>
        </button> */}
        <div className="clear"></div>
      </form>
      <p>
        Don't have an account? <Link to={"/signup"}>Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginComponent;
