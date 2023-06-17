import React, { useEffect, useRef, useState } from "react";
import "./TabMyTeach.css";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { postCourse } from "../../redux/reducer/CoursesSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  addMyTeach,
  editCourse,
  removeCourse,
} from "../../redux/reducer/MyTeachSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const TabAddNewACourse = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    category: "",
    topic: "",
    name: "",
    author: "",
    desc: "",
    price: "",
    lessonName: "",
  });
  const [imgUrl, setimgUrl] = useState();
  const [video, setVideo] = useState();
  const [listVideo, setVideoList] = useState([]);
  const loginUser = JSON.parse(localStorage.getItem("login-user"));
  const formRef = useRef(null);
  //Sự kiện inPUT

  const handleInputChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  //Sự kiện upload ảnh và lấy ảnh

  const handleImageChange = async (event) => {
    const imgFile = event.target.files[0];
    if (!imgFile) return;

    const storageRef = ref(storage, `images/${imgFile.name}`);
    await uploadBytes(storageRef, imgFile);
    const downloadURL = await getDownloadURL(storageRef);
    // console.log(downloadURL);
    setInputValue({ ...inputValue, image: downloadURL });
  };

  //Sự kiện upload preview video

  const handlePrevVideoChange = async (event) => {
    const videoFile = event.target.files[0];
    if (!videoFile) return;

    const storageRef = ref(storage, `video/${videoFile.name}`);
    await uploadBytes(storageRef, videoFile);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    setInputValue({ ...inputValue, preVideo: downloadURL });
  };

  //Sự kiện upload nhiều video

  const handleVideoLessonChange = async (event) => {
    const videos = event.target.files;

    const videoList = []; // Khởi tạo mảng videoList bên ngoài vòng lặp

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const storageRef = ref(storage, `videos/${video.name}`);
      await uploadBytes(storageRef, video);
      const downloadURL = await getDownloadURL(storageRef);
      videoList.push(downloadURL); // Thêm URL vào mảng videoList
    }
    console.log(videoList);
    setVideoList((prevVideoList) => [...prevVideoList, ...videoList]); // Sử dụng spread operator để nối danh sách video cũ và mới
  };

  useEffect(() => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      listVideo: listVideo,
    }));
  }, [listVideo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Validate form

      // Kiểm tra các ô input không được bỏ trống
      if (
        inputValue.category === "" ||
        inputValue.topic === "" ||
        inputValue.name === "" ||
        inputValue.author === "" ||
        inputValue.desc === "" ||
        inputValue.price === "" ||
        inputValue.lessonName === ""
      ) {
        return toast.error("Please input all the fields");
      }

      // Kiểm tra các ô input type text có đủ 6 ký tự hay không
      if (
        inputValue.topic.length < 6 ||
        inputValue.name.length < 6 ||
        inputValue.author.length < 6 ||
        inputValue.desc.length < 6 ||
        inputValue.price.length < 6 ||
        inputValue.lessonName.length < 6
      ) {
        return toast.error("Please input all fields at least 5 characters");
      }

      // Kiểm tra ô input type file đã được điền hay chưa
      if (!inputValue.image || !inputValue.preVideo || !inputValue.listVideo) {
        return toast.error("Please Input File");
      }

      // Check to wait upload video
      if (inputValue.listVideo.length == 0) {
        return toast.warn("vui lòng chờ upload video", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      await dispatch(
        postCourse({ ...inputValue, email: loginUser.email })
      ).unwrap();

      dispatch(addMyTeach({ inputValue, email: loginUser.email }));

      toast.success("Add Course Successfull", {
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
        category: "",
        topic: "",
        name: "",
        author: "",
        desc: "",
        price: "",
        lessonName: "",
      });

      formRef.current.reset();
    } catch (e) {
      toast.error("Please fulfill the form", {
        position: "top-right",
        autoClose: 2000,
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
    <div className="add-course">
      <ToastContainer />
      <form action="#" onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="category" className="fw-bold text-danger">
          Category*
        </label>
        <select
          name="category"
          className="form-group"
          id="category"
          onChange={handleInputChange}
          value={inputValue.category}
        >
          <option value="">--Choose Category Course</option>
          <option value="webdevelopment">Web Development</option>
          <option value="accounting">Accounting & Financial</option>
        </select>
        <label htmlFor="topic-course" className="fw-bold text-danger">
          Topic Course*
        </label>
        <input
          type="text"
          className="form-group"
          placeholder="Topic Course"
          id="topic-course"
          name="topic"
          onChange={handleInputChange}
          value={inputValue.topic}
        />
        <label htmlFor="name-course" className="fw-bold text-danger">
          Name Course*
        </label>
        <input
          type="text"
          className="form-group"
          placeholder="Name Course"
          id="name-course"
          name="name"
          onChange={handleInputChange}
          value={inputValue.name}
        />
        <label htmlFor="author-course" className="fw-bold text-danger">
          Author Course*
        </label>
        <input
          type="text"
          className="form-group"
          placeholder="Author Course"
          id="author-course"
          name="author"
          onChange={handleInputChange}
          value={inputValue.author}
        />
        <label htmlFor="describe-course" className="fw-bold text-danger">
          Describe Course*
        </label>
        <input
          type="text"
          className="form-group"
          placeholder="Describe"
          id="describe-course"
          name="desc"
          onChange={handleInputChange}
          value={inputValue.desc}
        />
        <label htmlFor="price-course" className="fw-bold text-danger">
          Price Course*
        </label>
        <input
          type="text"
          className="form-group"
          placeholder="Price"
          id="price-course"
          name="price"
          onChange={handleInputChange}
          value={inputValue.price}
        />
        <label htmlFor="img-course" className="fw-bold text-danger">
          Image Course*
        </label>
        <input
          type="file"
          className="form-group"
          id="img-course"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="video-course" className="fw-bold text-danger">
          Preview Video*
        </label>
        <input
          type="file"
          className="form-group"
          id="video-course"
          accept="video/*"
          onChange={handlePrevVideoChange}
        />
        <label htmlFor="name-lesson" className="fw-bold text-danger">
          Name Lesson*
        </label>
        <input
          type="text"
          className="form-group"
          placeholder="NameLesson"
          id="name-lesson"
          name="lessonName"
          onChange={handleInputChange}
          value={inputValue.lessonName}
        />
        <label htmlFor="video-lesson" className="fw-bold text-danger">
          Video Lesson*
        </label>
        <input
          type="file"
          className="form-group"
          id="video-lesson"
          multiple
          name="video_lesson[]"
          accept="video/*"
          onChange={handleVideoLessonChange}
        />
        <input
          type="submit"
          value="Create New Course"
          className="bg-info fw-bold border-0"
        />
      </form>
    </div>
  );
};

export const MyTeachCourse = (props) => {
  //Xử lý render và  edit xoá khoá học
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const listCourse = useSelector((state) => state.myTeach);
  const findIndex = listCourse.findIndex(
    (course) => course?.buyerUser === userLogin?.email
  );
  const myTraingCourse = listCourse[findIndex]?.courseUser;
  // console.log(myTraingCourse);

  const dispatch = useDispatch();
  //Handle remove Course
  const handleremoveCourse = (id) => {
    dispatch(removeCourse({ email: userLogin.email, id: id }));
  };

  //handle Edit
  const handleEditCourse = (id, name, desc) => {
    console.log(id);
    props.handleOpenEditForm(id, name, desc);
  };

  return (
    <div className="myteachcourses">
      <ul>
        {myTraingCourse?.length > 0 &&
          myTraingCourse?.map((course, index) => (
            <li className="item-course" key={course.id}>
              <div className="show-course d-lg-flex">
                <div className="img-course">
                  <img src={course.image} alt="img-course" />
                </div>
                <div className="course-info">
                  <h5 className="fw-bold">{course.name}</h5>
                  <h6>Author: {course.author}</h6>
                  <h6>Created At: {course.createdAt}</h6>
                  <h6>đ{Number(course.price).toLocaleString()}</h6>
                </div>
              </div>
              <div className="actions">
                <button
                  className="edit-btn btn btn-outline-primary rounded-0"
                  onClick={() =>
                    handleEditCourse(course.id, course.name, course.desc)
                  }
                >
                  Edit
                </button>
                <button
                  className="remove-btn btn btn-outline-danger rounded-0"
                  onClick={() => handleremoveCourse(course.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export const MyCustomer = () => {
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const checkoutCourse = useSelector((state) => state.checkout);
  const listMyCourse = checkoutCourse.filter((course, index) => {
    const course1 = course.courseUser.filter(
      (data) => data.email === userLogin.email
    );
  });
  console.log(listMyCourse);
  return (
    <div className="mycustomer">
      <ul>
        {listMyCourse.map((course) => (
          <li className="item-customer">
            <div className="show-customer d-lg-flex">
              <div className="img-user">
                <img src={course} alt="img-course" />
              </div>
              <div className="customer-info">
                <h5>{course}</h5>
                <h6>Khoá học đã mua</h6>
                <h6>Tổng tiền các khoá: đ300.000</h6>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Modal Edit
export function ModalEdit(props) {
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  // const [show, setShow] = useState(props.statusEditForm);
  // console.log(props.input);
  const [inputValue, setInputValue] = useState({
    name: "",
    desc: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue({
      name: props.input.name,
      desc: props.input.desc,
    });
  }, [props.input]);

  const handleClose = () => {
    props.handleCloseEditForm();
  };

  const handleEditChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editCourse({ ...inputValue, email: userLogin.email, id: props.input.id })
    );
    handleClose();
  };

  return (
    <Modal show={props.statusEditForm} onHide={handleClose}>
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
  );
}
