import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsSearch, BsCart3, BsChevronRight } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import DropdownCatgory from "../DropdownCategory/DropdownCatgory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducer/UsersSlice";

function HeaderCpmponent() {
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state.users);
  const [userLogin, setUserLogin] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const carts = useSelector((state) => state.carts);
  const loginUser = JSON.parse(localStorage.getItem("login-user"));
  const findIndex = carts.findIndex(
    (cart) => cart?.currentUser?.email === loginUser?.email
  );

  const myCard = carts[findIndex]?.courseUser
    ? carts[findIndex].courseUser
    : null;

  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("login-user"));
    setUserLogin(user);
  }, [userRedux]);

  // const [isLogin, setIsLogin] = useState(false);

  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const action = dispatch(logout());
    action && navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" className="" />
        <div className="d-flex wrapper-nav justify-content-between align-items-center pe-sm-2">
          <Navbar.Brand>
            <Link to="/">
              <img
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                width={90}
                alt="logo"
              />
            </Link>
          </Navbar.Brand>
          <div>
            <button
              className="btn btn-none d-none d-lg-inline-block"
              onClick={handleToggleDropdown}
            >
              Category
            </button>

            <DropdownCatgory toggleDropdown={toggleDropdown} />
          </div>

          <Form className="position-relative form-search">
            <Form.Control
              type="search"
              placeholder="Search any thing..."
              className="me-2 search-field rounded-pill px-5"
              aria-label="Search"
            />
            <Button
              variant="none"
              className=" btn btn-none position-absolute btn-search-lg"
            >
              <BsSearch />
            </Button>
            <Button variant="none" className=" btn btn-none btn-search-sm">
              <BsSearch />
            </Button>
            <div className="right-info">
              <Link to="/business" className="nav-link business">
                Udemy Business
              </Link>
              <Link to="/my-teach" className="nav-link teach-on-udemy">
                Instructor
              </Link>
              <Link to="/my-learn" className="nav-link teach-on-udemy">
                My Learning
              </Link>
              <Link
                to="/cart"
                className="nav-link fw-bold fs-5 position-relative"
              >
                <BsCart3 />
                <span className="number-buy">{myCard ? myCard.length : 0}</span>
              </Link>

              {/* Hiển thị thông tin khi có user-login hoặc không */}
              {userLogin !== null ? (
                <>
                  <Link
                    to="/list-wish"
                    className="nav-link fw-bold fs-5 list-wish"
                  >
                    <AiOutlineHeart />
                  </Link>
                  <Link to="/user" className="nav-link user">
                    <img src={userRedux.image} alt="avt-user" />
                  </Link>
                  <Link
                    // to="/"
                    className="btn btn-outline-dark rounded-0 fw-bold logout-btn"
                    onClick={handleLogout}
                  >
                    Log out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn border border-dark rounded-0 fw-bold login-btn"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-dark rounded-0 fw-bold signup-btn"
                  >
                    Sign up
                  </Link>
                </>
              )}

              {/*
               */}
            </div>
          </Form>
        </div>
        <Navbar.Collapse id="navbarScroll" className="d-lg-none">
          <div className="sigin-info py-2 border-bottom">
            <div className="user-info bg-secondary-subtle p-2">
              <Link to="/user" className="nav-link user d-flex">
                <img
                  src="https://img-c.udemycdn.com/user/75x75/192723648_b7c2.jpg"
                  alt="avt-user"
                />
                <div className="welcome-user">
                  <h6 className="fw-bold m-0">Hi, Thai Thi Nhan</h6>
                  <p className="text-secondary m-0">Welcome back!</p>
                </div>
                <p className="m-0 fw-bold">
                  <BsChevronRight />
                </p>
              </Link>
            </div>
            <div className="login-signup p-2">
              <Link to="/login" className="d-block nav-link py-2">
                Log in
              </Link>
              <Link to="/signup" className="d-block nav-link py-2">
                Sign up
              </Link>
            </div>
          </div>
          <button className="btn btn-none px-2" onClick={handleToggleDropdown}>
            Category
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderCpmponent;
