//TẠO HÀM VALIDATE EMAIL
const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const regUsername = /^[a-zA-Z0-9]{5,35}$/;
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
function validateNewUser(user) {
  const error = {
    isError: false,
    username: "",
    fullname: "",
    email: "",
    password: "",
    rePassword: "",
  };
  if (!user.username) {
    error.isError = true;
    error.username = "Không được để trống Username";
  }
  if (!user.username.match(regUsername)) {
    error.isError = true;
    error.username =
      "Username có ít nhất 5 ký tự tối đa 35 ký tự. Không có khoảng cách và ký tự đặc biệt";
  }
  if (!user.fullname) {
    error.isError = true;
    error.fullname = "Không được để trống Họ tên";
  }
  if (user.fullname.length < 5) {
    error.isError = true;
    error.fullname = "Họ tên có ít nhất 5 ký tự";
  }
  if (!user.email) {
    error.isError = true;
    error.email = "Không được để trống Email";
  }
  if (!user.email.match(regEmail)) {
    error.isError = true;
    error.email = "Email không đúng định dạng";
  }
  if (!user.password) {
    error.isError = true;
    error.password = "Không được để trống Password";
  }
  if (!user.password.match(regPassword)) {
    error.isError = true;
    error.password =
      "Password có ít nhất 8 ký tự tối đa 25 ký tự. Ít nhất 1 chữ hoa 1 chữ thương, 1 ký tụ số và 1 ký tự đặc biệt";
  }
  if (user.password !== user.rePassword) {
    error.isError = true;
    error.rePassword = "Retype Password chưa đúng. Vui lòng nhập lại";
  }
  return error;
}
function showErrorUser(user) {
  const showErrorUser = validateNewUser(user);
  document.querySelector("#error-username").innerHTML = showErrorUser.username;
  document.querySelector("#error-email").innerHTML = showErrorUser.email;
  document.querySelector("#error-fullname").innerHTML = showErrorUser.fullname;
  document.querySelector("#error-password").innerHTML = showErrorUser.password;
  document.querySelector("#error-repassword").innerHTML =
    showErrorUser.rePassword;
}
//Sự kiệm submit
let users = JSON.parse(localStorage.getItem("list-user")) ?? [];
let admins = JSON.parse(localStorage.getItem("list-admin"));
const login_box = document.querySelector("#login-box");
login_box.addEventListener("submit", (e) => {
  e.preventDefault();
  let id;
  if (users.length > 0) {
    id = users[users.length - 1].id + 1;
  } else {
    id = 1;
  }
  const new_user = {
    id: id,
    username: document.querySelector("#login-box #username").value,
    email: document.querySelector("#login-box #email").value,
    fullname: document.querySelector("#login-box #fullname").value,
    password: document.querySelector("#login-box #password").value,
    rePassword: document.querySelector("#login-box #repassword").value,
    image: "",
    role: "Customer",
    status: "Active",
    cart: [],
    order: {},
  };
  if (document.querySelector("#avatar").files[0]) {
    new_user.image = `../images/${
      document.querySelector("#avatar").files[0].name
    }`;
  }
  //b1: Check validate user mới
  const checkUser = validateNewUser(new_user);
  showErrorUser(new_user);
  if (checkUser.isError) {
    return;
  }
  let isDublicateEmail = false;
  users.forEach((user) => {
    if (user.email == new_user.email) {
      isDublicateEmail = true;
    }
  });
  admins.forEach((user) => {
    if (user.email == new_user.email) {
      isDublicateEmail = true;
    }
  });
  if (isDublicateEmail) {
    document.querySelector("#error-email").innerHTML =
      "Email đã tồn tại. Xin vui lòng thử lại";
    return;
  }
  users.push(new_user);
  (document.querySelector("#login-box #username").value = ""),
    (document.querySelector("#login-box #email").value = ""),
    (document.querySelector("#login-box #fullname").value = ""),
    (document.querySelector("#login-box #password").value = ""),
    (document.querySelector("#login-box #repassword").value = ""),
    localStorage.setItem("list-user", JSON.stringify(users));
  window.location = "../login-form/login.html";
});
