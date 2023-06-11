import React from "react";
import Cart from "../../components/Cart/Cart";
import HeaderCpmponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";

const CartPage = () => {
  return (
    <>
      <HeaderCpmponent />
      <div>
        <Cart />
      </div>
      <FooterComponent />
    </>
  );
};

export default CartPage;
