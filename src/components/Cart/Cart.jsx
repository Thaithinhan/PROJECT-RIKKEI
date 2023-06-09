import React, { useState } from "react";
import "./Cart.css";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeCartOrder } from "../../redux/reducer/CartsSlice";
import { addToCheckout } from "../../redux/reducer/CheckoutSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const findIndex = carts.findIndex(
    (cart) => cart?.currentUser.email === userLogin.email
  );

  // console.log(findIndex);

  const myCard = carts[findIndex]?.courseUser
    ? carts[findIndex].courseUser
    : null;

  //Remove Cart
  const handleRemoveCart = (id) => {
    dispatch(removeCartOrder({ id: id, currentUser: userLogin }));
  };

  //Tính tổng tiền
  let totalMoney = 0;
  //Tạo biến lưu các sản phẩm đã chọn
  const [selectedProducts, setSelectedProducts] = useState([]);

  //Handle Choose Product to Checkout
  const handleChooseProducts = (e, cart) => {
    // console.log(e.target);
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, cart]); // Thêm sản phẩm vào mảng selectedProducts
    } else {
      const updatedSelectedProducts = selectedProducts.filter(
        (product) => product.id !== cart.id
      );
      setSelectedProducts(updatedSelectedProducts); // Cập nhật mảng selectedProducts sau khi xóa sản phẩm
    }
  };
  // console.log(selectedProducts);
  //CHECK OUT
  const handleCheckout = () => {
    dispatch(
      addToCheckout({ course: selectedProducts, currentUser: userLogin })
    );
    selectedProducts.forEach((course) => {
      dispatch(removeCartOrder({ id: course.id, currentUser: userLogin }));
    });
  };

  return (
    <div className="cart">
      <Container>
        <h2 className="fw-bold">Shopping Cart</h2>
        <div className="main-content d-lg-flex">
          <div className="left-content">
            <h6 className="fw-bold">{myCard?.length} courses in Cart</h6>
            <ul className="list-cart">
              {myCard?.map((cart) => {
                totalMoney += Number(cart?.price);
                return (
                  <li className="d-lg-flex" key={cart?.id}>
                    <div className="course-info d-flex">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChooseProducts(e, cart)}
                      />
                      <div className="img-course mx-3 border border-dark p-1">
                        <img src={cart?.image} alt="img" />
                      </div>
                      <div className="course-detail-info">
                        <h6 className="fw-bold course-name">{cart?.name}</h6>
                        <p className="course-author m-0">By {cart?.author}</p>
                        <div className="detail-info d-lg-flex">
                          <p className="hours me-2 text-secondary fw-bold mb-0">
                            Tổng số: 42.5 giờ
                          </p>
                          <p className="lectures me-2 text-secondary fw-bold mb-0">
                            Bài học: {cart?.listVideo.length}
                          </p>
                          <p className="level me-2 text-secondary fw-bold mb-0">
                            Level : All Levels
                          </p>
                        </div>
                        <p className="price me-2 fw-bold mb-0">
                          đ{Number(cart?.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveCart(cart?.id)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="right-content">
            <h6 className="text-decoration">Total</h6>
            <h2 className="total-price fw-bold mb-5">
              đ{totalMoney.toLocaleString()}
            </h2>
            <button
              className="checkout-btn btn btn-none"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
        <Link to={"/courses/Web-Development"} className="btn btn-primary mt-3">
          Continue to Shopping
        </Link>
      </Container>
    </div>
  );
};

export default Cart;
