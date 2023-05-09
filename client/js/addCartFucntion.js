//FUNCTION ADD VÀO CART CỦA TRANG PRODUCT VÀ INDEX
// const userLogin = JSON.parse(sessionStorage.getItem("user-Login"));
// const list_users = JSON.parse(localStorage.getItem("list-user"));
// const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
//Lấy số lượng sản phẩm
let number_buy1 = 0;
const find_user = list_users.find((user) => user.email == userLogin.email);
find_user.cart.forEach((product) => {
  number_buy1 += product.quantity;
});

function handleAddCart(element, id) {
  //Thêm vào giỏ hàng khi chưa có sản phẩm và chưa login
  const buy_product = products.find((item) => item.id == id);
  let isDublicateProduct = false;
  if (!userLogin) {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    cart.forEach((item) => {
      if (item.id == buy_product.id) {
        isDublicateProduct = true;
      }
    });
    if (!isDublicateProduct) {
      buy_product.quantity = 1;
      cart.push(buy_product);
    } else {
      cart.forEach((item, index) => {
        if (item.id == buy_product.id) {
          cart[index].quantity += 1;
        }
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  if (userLogin) {
    const find_user = list_users.find((item) => item.email == userLogin.email);
    find_user.cart.forEach((itemCart, index) => {
      if (itemCart.id == buy_product.id) {
        isDublicateProduct = true;
      }
    });
    if (!isDublicateProduct) {
      buy_product.quantity = 1;
      find_user.cart.push(buy_product);
    } else {
      find_user.cart.forEach((itemCart, index) => {
        if (itemCart.id == buy_product.id) {
          find_user.cart[index].quantity += 1;
        }
      });
    }
    //Đẩy Find-user vào list user và lưu lại trên local
    list_users.forEach((user, index) => {
      if (user.email == find_user.email) {
        list_users[index] = find_user;
      }
    });
    localStorage.setItem("list-user", JSON.stringify(list_users));
  }
  number_buy1 += 1;
  document.querySelectorAll(".number-buy").forEach((element) => {
    element.innerHTML = number_buy1;
  });
}
