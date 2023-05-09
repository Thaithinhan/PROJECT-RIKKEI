//TẠO MẢNG LIST ORDER CỦA NHIỀU KHÁCH HÀNG
// console.log(cart_user);

const orders = JSON.parse(localStorage.getItem("list-order")) ?? [];
if (!localStorage.getItem("list-order")) {
  localStorage.setItem("list-order", JSON.stringify(orders));
}
let id_order = 1;
if (orders.length > 0) {
  id_order =
    Number(
      orders[orders.length - 1].id.substring(
        orders[orders.length - 1].id.length - 1
      )
    ) + 1;
}
const totalPaidMoney = cart_user.cart.reduce((total, value) => {
  let sub_total = Number(value.current_price) * Number(value.quantity);

  return (total += sub_total);
}, 0);
const new_order = {
  id: `#00000${id_order}`,
  cart: cart_user.cart,
  fullname: cart_user.fullname,
  username: cart_user.username,
  totalOrderMoney: totalPaidMoney,
  date: `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`,
  email_user: cart_user.email,
};

function confirmCheckout() {
  const email_checkout = document.querySelector("#email-checkout").value;
  const address_checkout = document.querySelector("#address-checkout").value;
  new_order.address = address_checkout;
  new_order.email = email_checkout;
  list_users.forEach((user, index) => {
    if (user.email == cart_user.email) {
      list_users[index].order = new_order;
      list_users[index].cart = [];
    }
  });
  localStorage.setItem("list-user", JSON.stringify(list_users));
  orders.push(new_order);
  localStorage.setItem("list-order", JSON.stringify(orders));
  alert("Đã đặt hàng thành công");
  window.location.href = "index.html";
}
document.querySelector(".id-bill").innerHTML = new_order.id;
document.querySelector(".subtotal-bill").innerHTML =
  new_order.totalOrderMoney.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
document.querySelector(".total-bill-payment").innerHTML =
  new_order.totalOrderMoney.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
document.querySelector(".date_order").innerHTML = new_order.date;
