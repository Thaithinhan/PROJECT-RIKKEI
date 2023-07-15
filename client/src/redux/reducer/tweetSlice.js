import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TweetAPI } from "../../axiosClient/tweetAPI";

//Lấy các bài đăng của User dăng nhập
export const getTweetForMe = createAsyncThunk("getTweet/fetch", async () => {
  const res = await TweetAPI.getTweetForCurrentUser();
  //   console.log(res.data);
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
  },
});

const { actions, reducer } = TweetSlice;

export default reducer;
