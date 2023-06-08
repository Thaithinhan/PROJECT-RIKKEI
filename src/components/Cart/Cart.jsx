import React from "react";
import "./Cart.css";
import { Container } from "react-bootstrap";

const Cart = () => {
  return (
    <div>
      <Container>
        <h2 className="fw-bold">Shopping Cart</h2>
        <div className="main-content d-lg-flex">
          <div className="left-content">
            <h6 className="fw-bold">2 courses in Cart</h6>
            <ul className="list-cart">
              <li className="d-lg-flex">
                <div className="course-info d-flex">
                  <div className="img-course me-3">
                    <img
                      src="https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="course-detail-info">
                    <h6 className="fw-bold course-name">Machine Learning</h6>
                    <p className="course-author m-0">By Krill Ernemo</p>
                    <div className="detail-info d-lg-flex">
                      <p className="hours me-2 text-secondary fw-bold mb-0">
                        Tổng số: 42.5 giờ
                      </p>
                      <p className="lectures me-2 text-secondary fw-bold mb-0">
                        Bài học: 382 bài
                      </p>
                      <p className="level me-2 text-secondary fw-bold mb-0">
                        Level : All Levels
                      </p>
                    </div>
                    <p className="price me-2 fw-bold mb-0">đ350.000</p>
                  </div>
                </div>
                <button className="btn btn-danger">Remove</button>
              </li>
              <li className="d-lg-flex">
                <div className="course-info d-flex">
                  <div className="img-course me-3">
                    <img
                      src="https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="course-detail-info">
                    <h6 className="fw-bold course-name">Machine Learning</h6>
                    <p className="course-author m-0">By Krill Ernemo</p>
                    <div className="detail-info d-lg-flex">
                      <p className="hours me-2 text-secondary fw-bold mb-0">
                        Tổng số: 42.5 giờ
                      </p>
                      <p className="lectures me-2 text-secondary fw-bold mb-0">
                        Bài học: 382 bài
                      </p>
                      <p className="level me-2 text-secondary fw-bold mb-0">
                        Level : All Levels
                      </p>
                    </div>
                    <p className="price me-2 fw-bold mb-0">đ350.000</p>
                  </div>
                </div>
                <button className="btn btn-danger">Remove</button>
              </li>
            </ul>
          </div>
          <div className="right-content">
            <h6 className="text-decoration">Total</h6>
            <h2 className="total-price fw-bold mb-5">đ1.000.000</h2>
            <button className="checkout-btn btn btn-none">Checkout</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
