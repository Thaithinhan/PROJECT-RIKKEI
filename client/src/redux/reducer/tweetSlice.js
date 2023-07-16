import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TweetAPI } from "../../axiosClient/tweetAPI";

//Lấy các bài đăng của User dăng nhập
export const getTweetForMe = createAsyncThunk("getTweet/fetch", async () => {
  const res = await TweetAPI.getTweetForCurrentUser();
  //   console.log(res.data);
  return res.data;
});

//Xoá bài đăng của User đang đăng nhập
export const deleteTweet = createAsyncThunk("deleteTweet/fetch", async (id) => {
  const res = await TweetAPI.deleteTweet(id);
  console.log(res.data);
  return res.data;
});

//Xoá bài đăng của User đang đăng nhập
export const editTweet = createAsyncThunk("editTweet/fetch", async (param) => {
  const res = await TweetAPI.editTweet(param);
  // console.log(res.data);
  return res.data;
});

const TweetSlice = createSlice({
  name: "tweets",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getTweetForMe.fulfilled]: (state, action) => {
      return (state = action.payload);
    },

    [deleteTweet.fulfilled]: (state, action) => {
      return state;
    },

    [editTweet.fulfilled]: (state, action) => {
      return state;
    },
  },
});

const { actions, reducer } = TweetSlice;

export default reducer;
