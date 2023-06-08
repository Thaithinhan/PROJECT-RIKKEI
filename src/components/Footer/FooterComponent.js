import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white px-5 py-4">
      <div className="top-footer">
        <div className="left-top-footer d-lg-flex">
          <ul>
            <li>
              <Link to="/business" className="nav-link">
                Udemy Business
              </Link>
              <Link to="/teach" className="nav-link">
                Teach on Undemy
              </Link>
              <Link to="/teach" className="nav-link">
                Get the App
              </Link>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/career" className="nav-link">
                Career
              </Link>
              <Link to="/blog" className="nav-link">
                Blogs
              </Link>
              <Link to="/help" className="nav-link">
                Help and Support
              </Link>
              <Link to="/affiliate" className="nav-link">
                Affiliate
              </Link>
              <Link to="/investor" className="nav-link">
                Investor
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/terms" className="nav-link">
                Terms
              </Link>
              <Link to="/privacy" className="nav-link">
                Privacy
              </Link>
              <Link to="/teach" className="nav-link">
                Cookie Settings
              </Link>
              <Link to="/map" className="nav-link">
                Sitemap
              </Link>
              <Link to="/contact" className="nav-link">
                Accessibility statement
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="right-top-footer"></div> */}
      </div>

      <div className="bot-footer mt-5">
        <div className="left-bot-footer">
          <Link to="/">
            <img
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg"
              alt="Udemy"
              width="91"
              height="34"
              loading="eager"
            ></img>
          </Link>
        </div>
        <div className="right-bot-footer">
          <p className="m-0">&copy; 2023 Thai Thi Nhan</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
