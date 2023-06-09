import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CourseAPI } from "../../api/Courses";
import { v4 } from "uuid";

const userLogin = JSON.parse(localStorage.getItem("login-user"));

export const getAll = createAsyncThunk("getAll/fetchCourse", async () => {
  //call API để lấy dữ liệu các khoá học
  // console.log(payload);
  const res = await CourseAPI.getAllcourse();
  // console.log(res);
  return res;
});

//Post khoá học
export const postCourse = createAsyncThunk(
  "postCourse/fetchCourse",
  async (courseData) => {
    try {
      let id = v4();
      let createdAt = new Date().toLocaleDateString();
      const lesson = {
        // Tạo đối tượng lesson
        id: id,
        title: courseData.lessonName,
        videos: courseData.listVideo,
      };
      const postData = {
        ...courseData,
        lesson: lesson,
        createdAt: createdAt,
      };

      const res = await CourseAPI.postCourse(postData);

      return res;
    } catch (err) {
      console.log(1111111111, err);
    }
  }
);

//Xoá khoá học trên DB

// export const removeCourse = createAsyncThunk(
//   "removeCourse/fetchCourse",
//   async (payload) => {
//     console.log("testId", payload);
//     return await CourseAPI.removeCourse(payload);
//   }
// );

const CourseSlice = createSlice({
  name: "courses",
  initialState: JSON.parse(localStorage.getItem("coursesLocal")) || [],
  reducers: {},
  extraReducers: {
    [getAll.fulfilled]: (state, action) => {
      return action.payload;
    },

    [postCourse.fulfilled]: (state, action) => {
      state.push({
        ...action.payload,
      });
      localStorage.setItem("coursesLocal", JSON.stringify(state));
      return state;
    },

    // [removeCourse.fulfilled]: (state, action) => {
    //   const newCourses = state.filter((course) => course.id !== action.payload);
    //   localStorage.setItem("coursesLocal", JSON.stringify(newCourses));
    //   return newCourses;
    // },
  },
});

const { actions, reducer } = CourseSlice;

export default reducer;

//  {
//     email: "",
//     category: "",
//     topic: "",
//     name: "",
//     author: "",
//     desc: "",
//     price: "",
//     image: "",
//     preVideo: "",
//     lesson: [],
//     createdAt: "",
//   },
