//CHUYỂN HƯỚNG ĐẾN TRANG CART KHI ĐÃ LOGIN KHÔNG THÌ CHUYỂN HƯỚNG ĐẾN TRANG LOGIN
const btn_carts = document.querySelectorAll(".btn-cart");
const userlogin = JSON.parse(sessionStorage.getItem("user-Login"));

btn_carts.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (userlogin) {
      window.location.href = "cart.html";
    } else {
      alert("Vui lòng đăng nhập để đến giỏ hàng");
    }
  });
});

//RENDER TRANG GIỎ HÀNG
const cart_user = list_users.find((user) => user.email == userlogin.email);
const cartInfoElement = document.querySelector(".card-body .order-info");
function rendercartProduct(array) {
  if (array.cart.length == 0) {
    document.querySelector(
      ".section-cart-order .container .order-info"
    ).innerHTML = `<h5 class="no-product text-danger text-center">Bạn chưa có sản phẩm nào!!!<a href="index.html" class="text-primary"> Bấm vào đây để tiếp tục mua sắm</a></h5>`;
  } else {
    let cartInfoElementContent = "";
    array.cart.forEach((product, index) => {
      cartInfoElementContent += `<div class="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="${product.image}"
                        class="img-fluid rounded-3"
                        alt=""
                      />
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <p class="lead fw-normal mb-2">
                        ${product.name}
                      </p>
                      <p>
                        <span class="text-muted">Size: </span>${
                          product.size
                        } <br />
                        <span class="text-muted">Màu: </span>${
                          product.color
                        } <br />
                        <span class="text-danger">Giá: ${Number(
                          product.current_price
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</span>
                      </p>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button
                        class="btn btn-link px-2"
                        onclick="stepDown(${product.id})"
                      >
                        <i class="fas fa-minus"></i>
                      </button>

                      <input
                        id="input-${product.id}"
                        min="0"
                        name="quantity"
                        value="${product.quantity}"
                        type="number"
                        class="form-control form-control-sm"
                      />

                      <button
                        class="btn btn-link px-2"
                        onclick="stepUp(${product.id})"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 class="mb-0 sub-total-money">
                      ${(
                        Number(product.current_price) * Number(product.quantity)
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                      </h5>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" class="text-danger"
                      onclick="removeProduct(${product.id})"
                        ><i class="fas fa-trash fa-lg"></i
                      ></a>
                    </div>`;
    });
    cartInfoElement.innerHTML = cartInfoElementContent;
  }
}
rendercartProduct(cart_user);

//RENDER PHẦN TÍNH TỔNG TIỀN
function calculateMoney() {
  let total_money = cart_user.cart.reduce((total, value) => {
    let sub_total = Number(value.current_price) * Number(value.quantity);

    return (total += sub_total);
  }, 0);

  const cartPaymentInfoElement = (document.querySelector(
    ".card-body .total-order-money"
  ).innerHTML = total_money.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  }));
}
calculateMoney();

//NHẢY SỐ LƯỢNG GIỎ HÀNG
let number_buy2 = 0;
cart_user.cart.forEach((product) => {
  number_buy2 += product.quantity;
});

//FUNCTION KHI CLICK NÚT GIẢM SẢN PHẨM
function stepDown(id) {
  const input_number = document.querySelector(`.order-info #input-${id}`);
  const minus_product = cart_user.cart.find((product) => product.id == id);
  if (minus_product.quantity > 0) {
    cart_user.cart.forEach((product, index) => {
      if (product.id == id) {
        cart_user.cart[index].quantity -= 1;
        input_number.value = cart_user.cart[index].quantity;
      }
    });
  }
  list_users.forEach((user, index) => {
    if (user.email == userlogin.email) {
      list_users[index].cart = cart_user.cart;
    }
  });
  localStorage.setItem("list-user", JSON.stringify(list_users));
  cartInfoElement.innerHTML = "";
  rendercartProduct(cart_user);
  calculateMoney();
  number_buy2 -= 1;
  document.querySelectorAll(".number-buy").forEach((element) => {
    element.innerHTML = number_buy2;
  });
}
//FUNCTION KHI CLICK NÚT TĂNG SẢN PHẨM
function stepUp(id) {
  const input_number = document.querySelector(`.order-info #input-${id}`);
  cart_user.cart.forEach((product, index) => {
    if (product.id == id) {
      cart_user.cart[index].quantity += 1;
      input_number.value = cart_user.cart[index].quantity;
    }
  });
  list_users.forEach((user, index) => {
    if (user.email == userlogin.email) {
      list_users[index].cart = cart_user.cart;
    }
  });
  localStorage.setItem("list-user", JSON.stringify(list_users));
  cartInfoElement.innerHTML = "";
  rendercartProduct(cart_user);
  calculateMoney();
  number_buy2 += 1;
  document.querySelectorAll(".number-buy").forEach((element) => {
    element.innerHTML = number_buy2;
  });
}

//FUNCTION XOÁ GIỜ HÀNG
function removeProduct(id) {
  event.preventDefault();
  cart_user.cart.forEach((product, index) => {
    if (product.id == id) {
      cart_user.cart.splice(index, 1);
      number_buy2 -= product.quantity;
    }
  });
  list_users.forEach((user, index) => {
    if (user.email == userlogin.email) {
      list_users[index].cart = cart_user.cart;
    }
  });
  localStorage.setItem("list-user", JSON.stringify(list_users));
  cartInfoElement.innerHTML = "";
  rendercartProduct(cart_user);
  calculateMoney();

  document.querySelectorAll(".number-buy").forEach((element) => {
    element.innerHTML = number_buy2;
  });
}

//chuyển tới trang thanh toán
function checkoutPage() {
  window.location.href = `checkout.html`;
}

//HIỂN THỊ LỊCH SỬ MUA HÀNG
// console.log(list_users);
const UserOrder = list_users.find((user) => user.email == userlogin.email);
const orders = JSON.parse(localStorage.getItem("list-order")) ?? [];
const orderHistory = orders.filter(
  (order) => order.email_user == userlogin.email
);
// console.log(orderHistory);
renderHistoryOrder(orderHistory);
function renderHistoryOrder(data) {
  const tbodyHistory = document.querySelector(".history-order tbody");
  let content = ``;
  data.forEach((order, index) => {
    const total_buy = order.cart.reduce((total, value) => {
      let sub_total = Number(value.quantity);
      return (total += sub_total);
    }, 0);
    content += ` <tr>
                  <td>${index + 1}</td>
                  <td>${order.id}</td>
                  <td>${order.date}</td>
                  <td>${total_buy}</td>
                  <td>${order.totalOrderMoney.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}</td>
                </tr>`;
  });
  tbodyHistory.innerHTML = content;
}
