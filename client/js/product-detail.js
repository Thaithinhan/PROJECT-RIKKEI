//FUNCTION CLICK VÀO NÚT VIEW SẢN PHẨM
function handleView(element, id, code) {
  event.preventDefault();
  window.location.href = `product-detail.html?id=${id}&code=${code}`;
}

//FUNCTION ADD TO CART TỪ TRANG DETAIL

const userLogin = JSON.parse(sessionStorage.getItem("user-Login"));
const list_users = JSON.parse(localStorage.getItem("list-user"));
const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
let number_buy = 0;
function addCartProductDetail() {
  //Thêm vào giỏ hàng khi chưa có sản phẩm và chưa login
  if (color_product && size_product) {
    const buy_product = list_products.find(
      (item) =>
        item.code == code &&
        item.code_color.toLowerCase() == color_product.toLowerCase() &&
        item.size.toLowerCase() == size_product.toLowerCase()
    );
    let isDublicateProduct = false;
    if (!userLogin) {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      if (buy_product) {
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
      } else {
        alert("Sản phẩm được chọn không có trong danh mục");
        return;
      }
    }
    if (userLogin) {
      const find_user = list_users.find(
        (item) => item.email == userLogin.email
      );
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
    number_buy += 1;
    document.querySelectorAll(".number-buy").forEach((element) => {
      element.innerHTML = number_buy;
    });
    alert("Đã thêm vào giỏ hàng");
  } else {
    alert("Vui lòng chọn màu và size sản phẩm cần mua");
  }
}

//Đẩy cart vào user đăng nhập khi Login và xoá giỏ hàng bên ngoài local
if (userLogin) {
  const find_user = list_users.find((item) => item.email == userLogin.email);
  list_users.forEach((user) => {
    if (user.email != userLogin.email) {
      return;
    }
    if (find_user.cart.length == 0) {
      find_user.cart = [...cart];
      // console.log(cart);
    }
    user.cart.forEach((product) => {
      cart.forEach((cartProduct) => {
        if (cartProduct.id == product.id) {
          product.quantity += cartProduct.quantity;
          cartProduct.isAdd = true;
        }
      });
    });
  });
  const pushProduct = cart.filter((item) => !item.isAdd);
  find_user.cart = [...find_user.cart, ...pushProduct];
  console.log(find_user.cart);
  //Lấy số lượng hàng đã đặt
  find_user.cart.forEach((item) => {
    number_buy += item.quantity;
  });
  document.querySelectorAll(".number-buy").forEach((element) => {
    element.innerHTML = number_buy;
  });
  // Đẩy Find-user vào list user và lưu lại trên local
  list_users.forEach((user, index) => {
    if (user.email == find_user.email) {
      list_users[index] = find_user;
    }
  });
  console.log(list_users);
  localStorage.removeItem("cart");
  localStorage.setItem("list-user", JSON.stringify(list_users));
}
