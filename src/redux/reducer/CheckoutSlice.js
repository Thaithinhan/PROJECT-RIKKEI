import { createSlice } from "@reduxjs/toolkit";

const CheckoutSlice = createSlice({
  name: "checkout",
  initialState: JSON.parse(localStorage.getItem("checkout")) || [],
  // xử lý cái thằng người dùng dispatch addToCart
  reducers: {
    addToCheckout: (state, action) => {
      // console.log("action khi addToCart =====>", action);

      //bước 1: tìm index của cart xem có hay không
      const findUser = state.findIndex(
        (cart) => cart.currentUser.email === action.payload.currentUser.email
      );

      // console.log("index User", findUser);

      // check xem user có chưa có rồi thì trả về index của nó hay chưa
      if (findUser === -1) {
        state.push({
          currentUser: action.payload.currentUser,
          courseUser: [...action.payload.course],
        });
      } else {
        state[findUser].courseUser = [
          ...state[findUser].courseUser,
          ...action.payload.course,
        ];
      }
      // console.log(action);
      localStorage.setItem("checkout", JSON.stringify(state));
      return state;
    },
  },
});

const { actions, reducer } = CheckoutSlice;
export const { addToCheckout } = actions;

export default reducer;
