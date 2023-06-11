import React, { useEffect, useState } from "react";
import "./TabCourseList.css";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  editCourseByAdmin,
  removeCourseByAdmin,
} from "../../redux/reducer/MyTeachSlice";
import { ToastContainer, toast } from "react-toastify";

const TabCourseList = ({ handleOpenEditCourse, handleGetIndex }) => {
  const courses = useSelector((state) => state.myTeach);
  const getCourse = courses.map((course) => course.courseUser).flat();
  const dispatch = useDispatch();

  const handleEditCourse = (course) => {
    console.log(course);
    const index = courses.findIndex((item) =>
      item.courseUser.some((c) => c.id === course.id)
    );
    // console.log(index);
    handleOpenEditCourse(course);
    handleGetIndex(index);
  };

  //Handle DELETE Course
  const handleDeleteCourse = (course) => {
    const id = course.id;
    const index = courses.findIndex((item) =>
      item.courseUser.some((c) => c.id === course.id)
    );
    // console.log(index);
    dispatch(removeCourseByAdmin({ index, id }));
  };

  return (
    <div className="tabCourse">
      <div className="top-tabListOrderAdmin d-flex justify-content-between align-items-center p-3">
        <h5 className="fw-bold">List Course</h5>
        <div className="position-relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-0 p-2 "
          />
          <button className="btn btn-none btn-search">
            <BsSearch />
          </button>
        </div>
      </div>
      <ul className="list-course p-3">
        {getCourse.length &&
          getCourse.map((course, index) => (
            <li
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="course-info d-flex align-items-center">
                <div className="course-img">
                  <img src={course.image} alt="" />
                </div>
                <div className="course-detail">
                  <h6 className="fw-bold m-0">{course.name}</h6>
                  <p className="m-0">{course.desc}</p>
                  <p className="m-0">
                    đ {Number(course.price).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="action">
                <button
                  className="btn btn-outline-info btn-view mx-2"
                  onClick={() => handleEditCourse(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-edit"
                  onClick={() => handleDeleteCourse(course)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TabCourseList;

// ModalEdit
export function ModalEditCourse({
  handleCloseEditCOurse,
  openEditCourse,
  chooseCourse,
  indexCourse,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleCloseEditCOurse();
  };

  const [inputValue, setInputValue] = useState({
    name: "",
    desc: "",
  });

  useEffect(() => {
    setShow(openEditCourse);
  }, [openEditCourse]);

  const dispatch = useDispatch();

  // console.log(indexCourse);

  useEffect(() => {
    setInputValue({
      name: chooseCourse?.name,
      desc: chooseCourse?.desc,
    });
  }, [chooseCourse]);

  const handleEditChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editCourseByAdmin({ inputValue, indexCourse, id: chooseCourse.id })
    );
    handleClose();
    toast.success("Edited Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name Course</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Name Course"
                autoFocus
                onChange={handleEditChange}
                name="name"
                value={inputValue.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Describe Course</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleEditChange}
                name="desc"
                value={inputValue.desc}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
