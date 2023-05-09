$(document).ready(function () {
  // Hiển thị avatar khi đăng nhập
  let LoginAdmin = JSON.parse(sessionStorage.getItem("admin-Login"));
  if (LoginAdmin) {
    $(".btn-avatar img").attr("src", LoginAdmin.image);
    $(".btn-avatar .admin-username").text(LoginAdmin.username);
  }

  //Click hiện menu sidebar phụ
  $(".list-main-menu> li").click((e) => {
    e.preventDefault();
    $(e.currentTarget.children[1]).slideToggle();
  });
  //   Hiển thị RENDER phần list Admin
  function renderAdmin(list_admins) {
    let tableAdminElement = document.querySelector("#table-admin");
    let tableAdminContent = ` <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Avatar</th>
                          <th scope="col">Username</th>
                          <th scope="col">Họ tên</th>
                          <th scope="col">Email</th>
                          <th scope="col">Vai trò</th>
                          <th scope="col">Cấp độ</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>`;
    list_admins.forEach((element) => {
      tableAdminContent += ` <tr>
                          <td scope="row">${element.id}</td>
                          <td>
                            <img src="${element.image}" alt="" />
                          </td>
                          <td>${element.username}</td>
                          <td>${element.fullname}</td>
                          <td>${element.email}</td>
                          <td>${element.role}</td>
                          <td>${element.level}</td>
                          <td>
                            <button
                              class="btn btn-success rounded-pill p-0 px-2"
                            >
                              ${element.status}
                            </button>
                          </td>
                          <td>
                            <a href="#" class="me-2"
                              ><i class="far fa-edit"></i
                            ></a>
                            <a href="#"><i class="fas fa-trash"></i></a>
                          </td>
                        </tr>`;
    });
    tableAdminContent += `</tbody>`;
    tableAdminElement.innerHTML = tableAdminContent;
  }
  $("#list-admins").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.admin-content").css("display", "block");
    admins = JSON.parse(localStorage.getItem("list-admin"));
    renderAdmin(admins);
  });

  // CHỨC NĂNG CHO FORM ADD NEW ADMIN
  //1. Chức năng sổ chọn cấp độ phân quyền
  $("#add-admin-form div span").click(() => {
    $("#add-admin-form div ul").slideToggle();
    $("#add-admin-form div span  i").css("transform", "rotate(180deg)");
  });
  //Chức năng ẩn hiện xem password
  $("#show-pass-admin").click(() => {
    $("#password-admin").attr("type", "password");
    $("#show-pass-admin").css("display", "none");
    $("#hide-pass-admin").css("display", "block");
  });
  $("#hide-pass-admin").click(() => {
    $("#password-admin").attr("type", "text");
    $("#show-pass-admin").css("display", "block");
    $("#hide-pass-admin").css("display", "none");
  });

  //2. Chức năng chọn phân quyền
  $("#add-admin-form > div > ul > li").click((e) => {
    $("#add-admin-form div ul").slideUp();
    $("#add-admin-form div span").html(
      $(e.target).text() + "<i class='fa-solid fa-chevron-down'></i>"
    );
  });

  //3.Chức năng hiện form khi click vào menu sidebar
  $("#add-new-admin").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.add-admin").css("display", "block");
  });
  if (!JSON.parse(localStorage.getItem("list-admin"))) {
    localStorage.setItem("list-admin", JSON.stringify(admins));
  }
  //4. submit form tạo admin mới
  $("#add-admin-form").submit((e) => {
    e.preventDefault();
    //4.1 Lấy dữ liệu trên form về new admin
    admins = JSON.parse(localStorage.getItem("list-admin"));
    const new_admin = {
      id: admins[admins.length - 1].id + 1,
      username: $("#add-admin-form #username-admin").val(),
      fullname: $("#add-admin-form #fullname-admin").val(),
      email: $("#add-admin-form #email-admin").val(),
      password: $("#add-admin-form #password-admin").val(),
      role: $("#add-admin-form #role-admin").val(),
      level: $("#add-admin-form span").text(),
      status: $("#add-admin-form #status-admin").val(),
      image: "",
    };
    if ($("#add-admin-form #avatar-admin")[0].files[0]) {
      new_admin.image =
        "images/" + $("#add-admin-form #avatar-admin")[0].files[0].name;
    }
    //4.2 Validate new admin có đủ điều kiện không
    const new_adminValidate = validateNewAdmin(new_admin);
    showErrorAdmin(new_admin);
    if (new_adminValidate.isError) {
      return;
    }
    let isDublicateEmail = false;
    admins.forEach((admin) => {
      if (admin.email == new_admin.email) {
        isDublicateEmail = true;
      }
    });
    if (isDublicateEmail) {
      $("#error-email-admin").text("Email có tồn tại. Vui lòng thử lại");
      return;
    }
    //4.3 Đẩy new admin vào list admin nếu đủ điều kiện
    admins.push(new_admin);
    $("#add-admin-form #username-admin").val(""),
      $("#add-admin-form #fullname-admin").val(""),
      $("#add-admin-form #email-admin").val(""),
      $("#add-admin-form #password-admin").val(""),
      $("#add-admin-form span").innerHTML(
        "Cấp độ phân quyền" + "<i class='fa-solid fa-chevron-down'></i>"
      ),
      $("#add-admin-form #avatar-admin").text("");
    localStorage.setItem("list-admin", JSON.stringify(admins));
  });

  //FUNCTION VALIDATE KHI THÊM ADMIN
  const regEmail =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const regUsername = /^[a-zA-Z0-9]{5,35}$/;
  const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
  function validateNewAdmin(admin) {
    const error = {
      isError: false,
      username: "",
      fullname: "",
      email: "",
      password: "",
      level: "",
    };
    if (!admin.username) {
      error.isError = true;
      error.username = "Không được để trống Username";
    }
    if (!admin.username.match(regUsername)) {
      error.isError = true;
      error.username =
        "Username có ít nhất 5 ký tự tối đa 35 ký tự. Không có khoảng cách và ký tự đặc biệt";
    }
    if (!admin.fullname) {
      error.isError = true;
      error.fullname = "Không được để trống Họ tên";
    }
    if (admin.fullname.length < 5) {
      error.isError = true;
      error.fullname = "Họ tên có ít nhất 5 ký tự";
    }
    if (!admin.email) {
      error.isError = true;
      error.email = "Không được để trống Email";
    }
    if (!admin.email.match(regEmail)) {
      error.isError = true;
      error.email = "Email không đúng định dạng";
    }
    if (!admin.password) {
      error.isError = true;
      error.password = "Không được để trống Password";
    }
    if (!admin.password.match(regPassword)) {
      error.isError = true;
      error.password =
        "Password có ít nhất 8 ký tự tối đa 25 ký tự. Ít nhất 1 chữ hoa 1 chữ thương, 1 ký tụ số và 1 ký tự đặc biệt";
    }
    if (admin.level != "1" && admin.level != "2" && admin.level != "3") {
      error.isError = true;
      error.level = "Vui lòng chọn level phân quyền cho Admin";
    }
    return error;
  }
  //FUNTION RENDER LỖI KHI THÊM NEW ADMIN
  function showErrorAdmin(admin) {
    const showErrorAdmin = validateNewAdmin(admin);
    $("#error-username-admin").text(showErrorAdmin.username);
    $("#error-fullname-admin").text(showErrorAdmin.fullname);
    $("#error-email-admin").text(showErrorAdmin.email);
    $("#error-password-admin").text(showErrorAdmin.password);
    $("#error-level-admin").text(showErrorAdmin.level);
  }

  //PHẦN USER
  //   Hiển thị RENDER phần list USER
  function renderUser(list_user) {
    let tableUserElement = document.querySelector("#table-user");
    let tableUserContent = ` <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Avatar</th>
                          <th scope="col">Username</th>
                          <th scope="col">Họ và tên</th>
                          <th scope="col">Email</th>
                          <th scope="col">Vai trò</th>
                          <th scope="col">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>`;
    if (list_user) {
      list_user.forEach((element) => {
        tableUserContent += ` <tr>
                          <td scope="row">${element.id}</td>
                          <td>
                            <img src="${element.image}" alt="" />
                          </td>
                          <td>${element.username}</td>
                          <td>${element.fullname}</td>
                          <td>${element.email}</td>
                          <td>${element.role}</td>
                          <td>
                            <button
                              class="btn status-active btn-success rounded-pill p-0 px-2" onclick="handleInactive(this,${element.id})"
                            >
                              ${element.status}
                            </button>
                             <button
                              class="btn status-inactive btn btn-danger rounded-pill p-0 px-2" onclick="handleActive(this,${element.id})"
                            >
                              ${element.status}
                            </button>
                          </td>
                        </tr>`;
      });
    }
    tableUserContent += `</tbody>`;
    tableUserElement.innerHTML = tableUserContent;
  }

  $("#list-users").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.user-content").css("display", "block");
    let users = JSON.parse(localStorage.getItem("list-user"));
    renderUser(users);
    let activeElement = document.querySelectorAll(".status-active");
    let inActiveElement = document.querySelectorAll(".status-inactive");
    users.forEach((user, index) => {
      if (user.status.toLowerCase() == "active") {
        activeElement[index].style.display = "inline-block";
        inActiveElement[index].style.display = "none";
      } else {
        activeElement[index].style.display = "none";
        inActiveElement[index].style.display = "inline-block";
      }
    });
  });
  //Chuyển hướng tới trang register khi click nút Add New User
  $("#add-new-user").click(() => {
    window.location = "register/register.html";
  });

  //Mở form add-product
  $("#open-add-product-form").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.add-product").css("display", "block");
  });
  $("#add-new-product").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.add-product").css("display", "block");
  });

  // PHẦN RENDER LIST ORDER
  //   Hiển thị RENDER phần list ORDER
  let orders = JSON.parse(localStorage.getItem("list-order"));
  function renderOrder(list_order) {
    let tableOrderElement = document.querySelector("#table-order");
    let tableOrderContent = ` <thead>
                        <tr>
                           <th>STT</th>
                          <th>ID đơn hàng</th>
                          <th>Ngày đặt hàng</th>
                          <th>Email User</th>
                          <th>Khách hàng đặt hàng</th>
                          <th>Số lượng hàng</th>
                          <th>Tổng giá trị đơn hàng</th>
                          <th>Trạng thái đơn hàng</th>
                          <th>Duyệt đơn hàng</th>
                          <th>Chi tiết đơn hàng</th>
                        </tr>
                      </thead>
                      <tbody>`;
    if (list_order) {
      list_order.forEach((element, index) => {
        let number_buy = element.cart.reduce((total, value) => {
          let sub_total = Number(value.quantity);
          return (total += sub_total);
        }, 0);
        tableOrderContent += ` <tr>
                            <td>${index + 1}</td>
                          <td>${element.id}</td>
                          <td>${element.date}</td>
                          <td>${element.email_user}</td>
                          <td>${element.fullname}</td>
                          <td>${number_buy}</td>
                          <td>${element.totalOrderMoney.toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}</td>
                          <td>
                            <input
                              type="button"
                              class="btn btn-warning py-0 input-status"
                              id="status_${element.id.replace("#", "")}"
                              disabled
                              value="Đang chờ duyệt"
                            />
                          </td>
                          <td>
                            <button
                              class="btn btn-outline-primary btn-approve"
                              onclick="handleApproveOrder(this, '${
                                element.id
                              }')"
                            >
                              Duyệt
                            </button>
                          </td>
                          <td>
                            <button class="btn btn-danger"  onclick="handleViewOrder(this, '${
                              element.id
                            }')">
                              Xem đơn hàng <i class="fa-solid fa-eye"></i>
                            </button>
                          </td>
                        </tr>`;
      });
    }
    tableOrderContent += `</tbody>`;
    tableOrderElement.innerHTML = tableOrderContent;
  }
  $("#list-order").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.order-content").css("display", "block");
    let orders = JSON.parse(localStorage.getItem("list-order"));
    renderOrder(orders);
    //HIỂN THỊ VÀ RENDER KHI ĐÃ DUYỆT
    const inputs_status = document.querySelectorAll(".input-status");
    const btn_approve = document.querySelectorAll(".btn-approve");
    orders.forEach((order, index) => {
      if (order.status) {
        inputs_status[index].style.backgroundColor = "green";
        inputs_status[index].style.color = "white";
        inputs_status[index].value = "Đã duyệt";
        btn_approve[index].innerHTML = "Bỏ duyệt";
      }
    });
  });

  //Hiển thị detail order khi click vào orderdetail
  $("#order-detail").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.view-order-content").css("display", "block");
    let orders = JSON.parse(localStorage.getItem("list-order"));
    renderOrder(orders);
  });

  //Hiển thị list invoice khi click vào List Invoice
  $("#list-invoice").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.invoice-content").css("display", "block");
    let invoice = JSON.parse(localStorage.getItem("list-invoice"));
    renderInvoice(invoice);
  });
  // PHẦN RENDER LIST INVOICE
  //   Hiển thị RENDER phần list INVOCIE
  function renderInvoice(list_invocie) {
    let tableInvoiceElement = document.querySelector("#table-invoice");
    let tableInvocieContent = `<thead>
                        <tr>
                          <th>STT</th>
                          <th>ID Hoá đơn</th>
                          <th>Ngày Hoá đơn</th>
                          <th>Mã đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th>Email Khách hàng</th>
                          <th>Số lượng hàng</th>
                          <th>Tổng giá trị Hoá đơn</th>
                        </tr>
                      </thead>
                      <tbody>`;
    if (list_invocie) {
      list_invocie.forEach((element, index) => {
        let number_buy = element.cart.reduce((total, value) => {
          let sub_total = Number(value.quantity);
          return (total += sub_total);
        }, 0);
        tableInvocieContent += ` <tr>
                          <td>${index + 1}</td>
                          <td>#INV000${element.id_invoice}</td>
                          <td>${element.approve_date}</td>
                          <td>${element.id}</td>
                          <td>${element.fullname}</td>
                          <td>${element.email}</td>
                          <td>${number_buy}</td>
                          <td>${element.totalOrderMoney.toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}</td>
                        </tr>`;
      });
    }
    tableInvocieContent += `</tbody>`;
    tableInvoiceElement.innerHTML = tableInvocieContent;
    let total_revenue = list_invocie.reduce((total, value) => {
      let sub_total = value.totalOrderMoney;
      return (total += sub_total);
    }, 0);
    console.log(total_revenue);
    const infoInvoice = document.querySelector(".info-revenue");
    const infoInvoiceContent = ` <div class="revenue-info float-end">
                      <h6 class="fw-bold">Tổng Doanh Thu</h6>
                      <p>
                        Tổng tiền bán hàng:
                        <span class="total-revenue text-danger fw-bold"
                          >${total_revenue.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}</span
                        >
                      </p>
                    </div>
                    <div class="clearfix"></div>`;
    infoInvoice.innerHTML = infoInvoiceContent;
  }
});
//Kiểm soát chuyển hướng trang
if (!JSON.parse(sessionStorage.getItem("admin-Login"))) {
  window.location = "/";
}

//KHI LOGOUT ADMIN
function logOutAdmin() {
  sessionStorage.removeItem("admin-Login");
  window.location.href = "../login-form/login.html";
}
