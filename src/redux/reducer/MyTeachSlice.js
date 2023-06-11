import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const MyTeachSlice = createSlice({
  name: "myTeach",
  initialState: JSON.parse(localStorage.getItem("myTeach")) || [],
  reducers: {
    addMyTeach: (state, action) => {
      //  console.log("action khi addToCart =====>", action);

      //  bước 1: tìm index của cart xem có hay không
      const findUser = state.findIndex(
        (teach) => teach.buyerUser === action.payload.email
      );
      const createdAt = new Date().toLocaleDateString();
      const id = v4();
      //  console.log("index User", findUser);

      // check xem user có chưa có rồi thì trả về index của nó hay chưa
      if (findUser === -1) {
        state.push({
          buyerUser: action.payload.email,
          courseUser: [
            { ...action.payload.inputValue, createdAt: createdAt, id: id },
          ],
        });
      } else {
        state[findUser].courseUser.push({
          ...action.payload.inputValue,
          createdAt: createdAt,
          id: id,
        });
      }
      //  console.log(state);
      localStorage.setItem("myTeach", JSON.stringify(state));
      return state;
    },

    removeCourse: (state, action) => {
      //  console.log(action);
      const index = state.findIndex(
        (teach) => teach.buyerUser === action.payload.email
      );
      //  console.log(index);
      const myTeach = state[index].courseUser;
      const newData = myTeach.filter((teach) => teach.id !== action.payload.id);
      state[index].courseUser = [...newData];
      localStorage.setItem("myTeach", JSON.stringify(state));
      return state;
    },

    editCourse: (state, action) => {
      //  console.log(action);
      const index = state.findIndex(
        (teach) => teach.buyerUser === action.payload.email
      );
      //  console.log(index);
      const myTeach = state[index].courseUser;
      const newData = myTeach.map((teach) => {
        if (teach.id === action.payload.id) {
          teach.name = action.payload.name;
          teach.desc = action.payload.desc;
        }
        return teach;
      });
      state[index].courseUser = [...newData];
      localStorage.setItem("myTeach", JSON.stringify(state));
      return state;
    },

    editCourseByAdmin: (state, action) => {
      console.log(action.payload);
      const myTeach = state[action.payload.indexCourse].courseUser;
      const newData = myTeach.map((teach) => {
        if (teach.id === action.payload.id) {
          teach.name = action.payload.inputValue.name;
          teach.desc = action.payload.inputValue.desc;
        }
        return teach;
      });
      state[action.payload.indexCourse].courseUser = [...newData];
      localStorage.setItem("myTeach", JSON.stringify(state));
      return state;
    },

    removeCourseByAdmin: (state, action) => {
      const { index, id } = action.payload;
      // console.log(index);
      const myTeach = state[index].courseUser;
      const newData = myTeach.filter((teach) => teach.id !== id);
      state[index].courseUser = [...newData];
      localStorage.setItem("myTeach", JSON.stringify(state));
      return state;
    },
  },
});

const { actions, reducer } = MyTeachSlice;
export const {
  addMyTeach,
  removeCourse,
  editCourse,
  editCourseByAdmin,
  removeCourseByAdmin,
} = actions;

export default reducer;
