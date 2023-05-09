//BẤM VÀO VIEW ORDER SẼ HIỆN RS LIST ORDER
function handleViewOrder(element, id) {
  let orders = JSON.parse(localStorage.getItem("list-order"));
  document.querySelector(
    ".right-main section.view-order-content"
  ).style.display = "block";
  const chooseOrder = orders.find((order) => order.id == id);
  console.log(chooseOrder);
  renderOrderInfo(chooseOrder);
  renderDetailOrder(chooseOrder);
}

function renderOrderInfo(order) {
  const OrderInfo = document.querySelector(
    "section.view-order-content >.p-3 .order-info"
  );
  let content = ` <p class="fw-medium text-body-tertiary">
                      Số đơn hàng:
                      <span class="text-danger fw-bold">${order.id}</span>
                    </p>
                    <p class="fw-medium text-body-tertiary">
                      Email khách hàng:
                      <span class="fw-bold text-danger"
                        >${order.email}</span
                      >
                    </p>
                    <p class="fw-medium text-body-tertiary">
                      Ngày đặt hàng:
                      <span class="fw-bold text-danger">${order.date}</span>
                    </p>`;
  OrderInfo.innerHTML = content;
  const paymentInfo = document.querySelector(".payment-info");
  const total_money = order.cart.reduce((total, value) => {
    let sub_total = Number(value.current_price) * Number(value.quantity);
    return (total += sub_total);
  }, 0);
  const paymentInfoContent = `<h6 class="fw-bold">Tổng Giá trị đơn hàng</h6>
                    <p>
                      Tổng tiền hàng:
                      <span class="total-money text-danger fw-medium">${total_money.toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}</span>
                    </p>
                    <p>
                      Phí vận chuyển:
                      <span class="total-money text-danger fw-medium">0đ</span>
                    </p>
                    <p>
                      Tổng tiền thanh toán:
                      <span class="total-money text-danger fw-bold"
                        >${total_money.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</span
                      >
                    </p>`;
  paymentInfo.innerHTML = paymentInfoContent;
}

//Function chi tiết order
function renderDetailOrder(order) {
  const tableViewOrderTbody = document.querySelector("#table-view-order tbody");
  let tbodyContent = "";
  order.cart.forEach((product, index) => {
    tbodyContent += ` <tr>
                          <td>${index}+1</td>
                          <td>${product.code}</td>
                          <td>
                            <img
                              src="${product.image}"
                              alt=""
                            />
                          </td>
                          <td>${product.name}</td>
                          <td>${product.color}</td>
                          <td>${product.size}</td>
                          <td>${Number(product.current_price).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}</td>
                          <td>${product.quantity}</td>
                          <td>${(
                            Number(product.current_price) *
                            Number(product.quantity)
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}</td>
                        </tr>`;
  });
  tableViewOrderTbody.innerHTML = tbodyContent;
}

//FUNCTION duyệt sản phẩm (Khi duyệt SP sẽ thêm trường status cho order
// và chuyển vào list invoice, nếu bỏ duyệt thì loại order ra list vinvoie)

//Tạo mảng list invoice để khi duyệt đơn hàng sẽ push vào mảng hoá đơn
const list_invoice = JSON.parse(localStorage.getItem("list-invoice")) ?? [];
if (!localStorage.getItem("list-invoice")) {
  localStorage.setItem("list-invoice", JSON.stringify(list_invoice));
}
function handleApproveOrder(element, id) {
  let orders = JSON.parse(localStorage.getItem("list-order"));
  let input_status = document.querySelector(`#status_${id.replace("#", "")}`);
  const chooseOrder = orders.find((order) => order.id == id);
  if (orders.length == 0) {
    chooseOrder.id_invoice = 1;
  } else {
    chooseOrder.id_invoice = orders[length - 1].id_invoice + 1;
  }
  if (!chooseOrder.status) {
    chooseOrder.status = true;
    orders.forEach((order, index) => {
      if (order.id == id) {
        orders[index].status = true;
      }
    });
    chooseOrder.approve_date = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;
    list_invoice.push(chooseOrder);
  } else {
    chooseOrder.status = false;
    orders.forEach((order, index) => {
      if (order.id == id) {
        orders[index].status = false;
      }
    });
    list_invoice.forEach((invoice, index) => {
      if (invoice.id == chooseOrder.id) {
        list_invoice.splice(index, 1);
      }
    });
  }
  //LƯU LOCALSTORAGE VÀ CSS CHO SẢN PHẨM
  localStorage.setItem("list-order", JSON.stringify(orders));
  localStorage.setItem("list-invoice", JSON.stringify(list_invoice));
  orders.forEach((order, index) => {
    if (order.id == id) {
      if (order.status) {
        input_status.style.backgroundColor = "green";
        input_status.style.color = "white";
        input_status.value = "Đã duyệt";
        element.innerHTML = "Bỏ duyệt";
        console.log(order.status);
      } else {
        input_status.style.backgroundColor = "#FFC107";
        input_status.style.color = "black";
        input_status.value = "Đang chờ duyệt";
        element.innerHTML = "Duyệt";
      }
    }
  });
}
//
