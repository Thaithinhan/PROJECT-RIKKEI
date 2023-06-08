import React from "react";
import { Container } from "react-bootstrap";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import "./CourseDetail.css";

export const CourseDetail = () => {
  return (
    <div className="course my-5">
      <div className="top-course bg-dark text-white p-2">
        <Container className="d-lg-flex justify-content-between">
          <div className="left-side-course">
            <h3 className="fw-bold course-name">
              The Complete Python Bootcamp From Zero to Hero in Python
            </h3>
            <p className="course-short-desc">
              Learn Python like a Professional Start from the basics and go all
              the way to creating your own applications and games
            </p>
            <div className="rating-number-student">
              <p className="text-warning fw-bold rating">
                <span className="me-1">4.6</span>
                <span className="star-rate">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarHalf />
                </span>
                <span className="students-view text-white ms-3">
                  1.750.000 students
                </span>
              </p>
            </div>
            <p className="created-by">Created by Jose Portilla</p>
            <p className="last-update">Last update 3/2023</p>
          </div>
          <div className="right-course">
            <iframe
              width="300"
              height="250"
              src="https://www.youtube.com/embed/bMknfKXIFA8"
              title="React Course - Beginner&#39;s Tutorial for React JavaScript Library [2022]"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <h6 className="fw-bold ms-2">Preview this course</h6>
            <h4 className="fw-bold ms-2 course-price">đ390,000</h4>
            <button className="btn btn-none rounded-0 add-to-cart">
              ADD TO CART
            </button>
          </div>
        </Container>
      </div>
      <div className="bottom-course my-5">
        <Container>
          <h3>What you'll learn in this course</h3>
          <ul>
            <li>
              <TiTick /> Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Iure libero quo aliquid minus, similique iusto.
            </li>
            <li>
              <TiTick /> Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Iure libero quo aliquid minus, similique iusto.
            </li>
            <li>
              <TiTick /> Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Iure libero quo aliquid minus, similique iusto.
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
};

export default CourseDetail;
