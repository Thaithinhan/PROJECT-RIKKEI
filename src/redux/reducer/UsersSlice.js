import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserAPI } from "../../api/Users";

export const register = createAsyncThunk(
  "register/fetchAuth",
  async (payload) => {
    //call API để đăng ký tài khoản
    // console.log(payload);
    const res = await UserAPI.register(payload);
    // console.log(res);
    return res;
  }
);

//Login User

export const login = createAsyncThunk("login/fetchAuth", async (payload) => {
  const res = await UserAPI.login(payload);
  localStorage.setItem("login-user", JSON.stringify(res.user));
  localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
  return res;
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    email: "",
    fullname: "",
    image: "",
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("login-user");
      state.email = "";
      state.fullname = "";
      state.image = "";

      return state;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.fullname = action.payload.user.fullname;
      state.image = action.payload.user.image;
      return state;
    },

    [login.fulfilled]: (state, action) => {
      // console.log(action.payload)
      return (state = action.payload.user);
    },
  },
});

const { actions, reducer } = UserSlice;
export const { logout } = actions;

export default reducer;
