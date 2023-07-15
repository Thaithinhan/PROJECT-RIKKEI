import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from "../../axiosClient/userAPI";
export const login = createAsyncThunk("login/fetch", async (payload) => {
  const res = await UserAPI.login(payload);
  //   console.log(res);
  localStorage.setItem("login-user", JSON.stringify(res.data.user));
  localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));

  return res;
});

//GET ME PROFILE
export const getMeProfile = createAsyncThunk("getMeProfile", async (id) => {
  const response = await UserAPI.getProfile(id);
  // console.log(response);

  return response;
});

//SUGGEST FOLLOWERS
export const suggestFollower = createAsyncThunk("suggestFollower", async () => {
  const response = await UserAPI.suggestFollow();
  // console.log(response.data);

  return response.data;
});

//GET USER BY ID
export const getUserById = createAsyncThunk("getUserbyId", async (id) => {
  const response = await UserAPI.getUserbyID(id);
  // console.log(response.data);

  return response.data;
});

const UserSlice = createSlice({
  name: "users",
  initialState: JSON.parse(localStorage.getItem("login-user")) || {},
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return (state = action.payload);
    },

    [getMeProfile.fulfilled]: (state, action) => {
      // console.log(2222222, action.payload);
      return (state = action.payload.data);
    },

    [suggestFollower.fulfilled]: (state, action) => {
      return state;
    },

    [getUserById.fulfilled]: (state, action) => {
      return state; //Không cần trả về state => vẫn lưu state cũ
    },
  },
});

const { actions, reducer } = UserSlice;

export default reducer;
