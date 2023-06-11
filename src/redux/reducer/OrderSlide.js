import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const OrderSlice = createSlice({
  name: "orders",
  initialState: JSON.parse(localStorage.getItem("orders")) || [],
  reducers: {
    addOrder: (state, action) => {
      // console.log(action.payload);
      const orderDate = new Date().toLocaleDateString();
      const idOrder = v4();
      action.payload.OrderDate = orderDate;
      action.payload.id = idOrder;
      state.push(action.payload);

      localStorage.setItem("orders", JSON.stringify(state));
      return state;
    },

    // viewOrder: (state, action) => {
    //   // console.log(action.payload);
    //   return state;
    // },
  },
});

const { actions, reducer } = OrderSlice;

export const { addOrder, viewOrder } = actions;
export default reducer;
