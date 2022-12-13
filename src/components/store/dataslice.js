import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCoupons,
  getAllMenuItems,
  getDiscountForJumbo,
} from "./Menu.actions";

const initialState = {
  menu_details: [
    {
      Menu_name: "",
      Menu_Description: "",
      Menu_price: 0,
    },
  ],
  loading: true,
  topping_price: [],
  selectedToppingsList: [{ name: "", price: "", menuId: "" }],
  selectedMenuItems: [{}],
  cart_count: 0,
  currentSelectedMenuId: 0,
  coupons: [{}],
  finalTotalPrice: 0,
};

const menuSlice = createSlice({
  name: "menuList",
  initialState,
  reducers: {
    setToppingsPrice: (state, actions) => {
      state.topping_price = actions.payload;
    },
    setCartValue: (state, actions) => {
      state.cart_count = actions.payload;
    },
    setCurrentSelectedMenuId: (state, actions) => {
      state.currentSelectedMenuId = actions.payload;
    },
    setSelectedToppingsList: (state, actions) => {
      state.selectedToppingsList = actions.payload;
    },
    setSelectedMenuItemsID: (state, actions) => {
      state.selectedMenuItems = actions.payload;
      let allItemsPrice = [];
      state.selectedMenuItems.map((item) =>
        allItemsPrice.push(parseFloat(item.price * item.quantity))
      );
      let totalPrice = allItemsPrice.reduce((a, b) => a + b, 0);
      totalPrice = parseFloat(totalPrice).toFixed(2);
      state.finalTotalPrice = totalPrice;
    },
    setFinalTotalPrice: (state, actions) => {
        console.log(state.finalTotalPrice,actions.payload,"ooo")
      state.finalTotalPrice = actions.payload;
    },
  },
  extraReducers: {
    [getAllMenuItems.pending]: (state) => {
      state.loading = true;
    },
    [getAllMenuItems.fulfilled]: (state, actions) => {
      state.menu_details = actions.payload;
      state.loading = false;
    },
    [getAllCoupons.pending]: (state) => {
      state.loading = true;
    },
    [getAllCoupons.fulfilled]: (state, actions) => {
      state.coupons = actions.payload;
      state.loading = false;
    },
    [getDiscountForJumbo.pending]: (state) => {
      state.loading = true;
    },
    [getDiscountForJumbo.fulfilled]: (state, actions) => {
      state.loading = false;
    },
  },
});
export const {
  setToppingsPrice,
  setCartValue,
  setCurrentSelectedMenuId,
  setSelectedToppingsList,
  setSelectedMenuItemsID,
  setFinalTotalPrice,
} = menuSlice.actions;
export default menuSlice.reducer;
