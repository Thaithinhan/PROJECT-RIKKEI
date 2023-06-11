import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/reducer/UsersSlice";
import { AvatarGenerator } from "random-avatar-generator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generator = new AvatarGenerator();
const randomAvt = generator.generateRandomAvatar();

const Signup = () => {
  const [inputValue, setInputValue] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle input change

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      inputValue.image = randomAvt;
      const result = await dispatch(register(inputValue)).unwrap();
      result &&
        toast.success("Register Successfull", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      setInputValue({
        fullname: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        return <Navigate to="/login" replace />;
      }, 4000);
    } catch (err) {
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
    <>
      <ToastContainer />
      <div className="signup-component">
        <h5 className="fw-bold">Sign up and start learning</h5>
        <form action="#" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            className="btn btn-none border border-dark rounded-0 p-3"
            name="fullname"
            onChange={handleInputChange}
            value={inputValue.fullname}
          />
          <input
            type="email"
            placeholder="Email"
            className="btn btn-none border border-dark rounded-0 p-3"
            name="email"
            onChange={handleInputChange}
            value={inputValue.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="btn btn-none border border-dark rounded-0 p-3"
            name="password"
            onChange={handleInputChange}
            value={inputValue.password}
          />

          <input type="submit" id="btn-submit" value="Sign Up" />
          <div className="clear"></div>
        </form>
        <p>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
