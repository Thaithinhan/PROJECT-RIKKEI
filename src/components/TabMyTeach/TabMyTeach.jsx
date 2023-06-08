import React, { useEffect, useState } from "react";
import "./TabMyTeach.css";
import { useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { postCourse } from "../../redux/reducer/CoursesSlice";
import { ToastContainer, toast } from "react-toastify";

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

    await dispatch(
      postCourse({ ...inputValue, email: loginUser.email })
    ).unwrap();

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
  };

  return (
    <div className="add-course">
      <ToastContainer />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="category" className="fw-bold">
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
        <label htmlFor="topic-course" className="fw-bold">
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
        <label htmlFor="name-course" className="fw-bold">
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
        <label htmlFor="author-course" className="fw-bold">
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
        <label htmlFor="describe-course" className="fw-bold">
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
        <label htmlFor="price-course" className="fw-bold">
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
        <label htmlFor="img-course" className="fw-bold">
          Image Course*
        </label>
        <input
          type="file"
          className="form-group"
          id="img-course"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="video-course" className="fw-bold">
          Preview Video*
        </label>
        <input
          type="file"
          className="form-group"
          id="video-course"
          accept="video/*"
          onChange={handlePrevVideoChange}
        />
        <label htmlFor="name-lesson" className="fw-bold">
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
        <label htmlFor="video-lesson" className="fw-bold">
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

export const MyTeachCourse = () => {
  return (
    <div className="myteachcourses">
      <ul>
        <li className="item-course">
          <div className="show-course d-lg-flex">
            <div className="img-course">
              <img
                src="https://img-c.udemycdn.com/course/240x135/8324_fa84_13.jpg"
                alt="img-course"
              />
            </div>
            <div className="course-info">
              <h5>Tên khoá học</h5>
              <h6>Tên tác giả</h6>
              <h6>Thời gian cập nhật</h6>
              <h6>đ300.000</h6>
            </div>
          </div>
          <div className="actions">
            <button className="edit-btn btn btn-primary rounded-0">Edit</button>
            <button className="remove-btn btn btn-danger rounded-0">
              Remove
            </button>
          </div>
        </li>
        <li className="item-course">
          <div className="show-course d-lg-flex">
            <div className="img-course">
              <img
                src="https://img-c.udemycdn.com/course/240x135/8324_fa84_13.jpg"
                alt="img-course"
              />
            </div>
            <div className="course-info">
              <h5>Tên khoá học</h5>
              <h6>Tên tác giả</h6>
              <h6>Thời gian cập nhật</h6>
              <h6>đ300.000</h6>
            </div>
          </div>
          <div className="actions">
            <button className="edit-btn btn btn-primary rounded-0">Edit</button>
            <button className="remove-btn btn btn-danger rounded-0">
              Remove
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export const MyCustomer = () => {
  return (
    <div className="mycustomer">
      <ul>
        <li className="item-customer">
          <div className="show-customer d-lg-flex">
            <div className="img-user">
              <img
                src="https://img-c.udemycdn.com/course/240x135/8324_fa84_13.jpg"
                alt="img-course"
              />
            </div>
            <div className="customer-info">
              <h5>Tên User</h5>
              <h6>Khoá học đã mua</h6>
              <h6>Tổng tiền các khoá: đ300.000</h6>
            </div>
          </div>
          {/* <div className="actions">
            <button className="edit-btn btn btn-primary rounded-0">Edit</button>
            <button className="remove-btn btn btn-danger rounded-0">
              Remove
            </button>
          </div> */}
        </li>
      </ul>
    </div>
  );
};
