import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentAPI } from "../../api/Comment";

//Post comment lên DB

export const postComment = createAsyncThunk(
  "postComment/fetchAPI",
  async (payload) => {
    const res = await CommentAPI.postComment(payload);
    console.log(res);
    return res;
  }
);

//Lấy dữ liệu comment
export const getComment = createAsyncThunk("getComment/fetchAPI", async () => {
  const res = await CommentAPI.getAllComment();
  //     console.log(res);
  return res;
});

const CommentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {},
  extraReducers: {
    [postComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
      return state;
    },

    [getComment.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = CommentSlice;

export default reducer;
