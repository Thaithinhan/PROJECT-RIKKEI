import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "carts",
  initialState: JSON.parse(localStorage.getItem("carts")) || [],
  // xử lý cái thằng người dùng dispatch addToCart
  reducers: {
    addToCart: (state, action) => {
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
          courseUser: [action.payload.couserDetail],
        });
      } else {
        state[findUser].courseUser.push(action.payload.couserDetail);
      }
      localStorage.setItem("carts", JSON.stringify(state));
      return state;
    },

    removeCartOrder: (state, action) => {
      const { id, currentUser } = action.payload;
      // console.log(action.payload);

      // Tìm người dùng hiện tại trong giỏ hàng
      const userCart = state.find(
        (cart) => cart.currentUser.email === currentUser.email
      );

      if (userCart) {
        // Tìm khoá học cần xóa dựa trên id trong mảng courseUser
        const courseIndex = userCart.courseUser.findIndex(
          (course) => course.id === id
        );

        if (courseIndex !== -1) {
          // Xóa khoá học khỏi mảng courseUser
          userCart.courseUser.splice(courseIndex, 1);

          // Nếu mảng courseUser trở thành rỗng sau khi xóa, xóa giỏ hàng của người dùng
          if (userCart.courseUser.length === 0) {
            const userIndex = state.findIndex(
              (cart) => cart.currentUser.email === currentUser.email
            );
            state.splice(userIndex, 1);
          }
        }
      }

      localStorage.setItem("carts", JSON.stringify(state));
      return state;
    },
  },
});

const { actions, reducer } = CartSlice;
export const { addToCart, removeCartOrder } = actions;

export default reducer;
