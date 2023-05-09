const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const regUsername = /^[a-zA-Z0-9]{5,35}$/;
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
function validateLoginUser(user) {
  const error = {
    isError: false,
    email: "",
    password: "",
  };

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
  return error;
}
function showErrorUser(user) {
  const showErrorUser = validateLoginUser(user);
  document.querySelector(".error-email").innerHTML = showErrorUser.email;
  document.querySelector(".error-password").innerHTML = showErrorUser.password;
}
//Sự kiệm submit
// let adminLogin = JSON.parse(localStorage.getItem())
const signinFormElement = document.querySelector(".signin-form");
signinFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document
    .querySelector(".signin-form #email-login")
    .value.trim()
    .toLowerCase();
  let password = document.querySelector(".signin-form #password-login").value;
  const LoginUser = {
    email: email,
    password: password,
  };
  const checkLogin = validateLoginUser(LoginUser);
  const admins = JSON.parse(localStorage.getItem("list-admin"));
  const users = JSON.parse(localStorage.getItem("list-user"));
  //Check validate login user
  showErrorUser(LoginUser);
  if (checkLogin.isError) {
    return;
  }
  if (admins.find((admin) => admin.email === email)) {
    if (admins.find((admin) => admin.password === password)) {
      const loginAdmin = admins.find((admin) => admin.email == email);
      console.log(loginAdmin);
      sessionStorage.setItem("admin-Login", JSON.stringify(loginAdmin));
      window.location = "/admin/index.html";
      document.querySelector(".signin-form #email-login").value = "";
      document.querySelector(".signin-form #password-login").value = "";
      window.location = "../admin.html";
    } else {
      document.querySelector(".error-password").innerHTML =
        "Mật khẩu hoặc Email không đúng. vui lòng thử lại";
    }
  }
  if (users.find((user) => user.email === email)) {
    if (users.find((user) => user.password === password)) {
      const loginUser = users.find((user) => user.email == email);
      if (loginUser.status.toLowerCase() == "active") {
        loginUser.password = "";
        loginUser.rePassword = "";
        sessionStorage.setItem("user-Login", JSON.stringify(loginUser));
        window.location = "/index.html";
        document.querySelector(".signin-form #email-login").value = "";
        document.querySelector(".signin-form #password-login").value = "";
        window.location = "../index.html";
      }
      if (loginUser.status.toLowerCase() == "inactive") {
        alert("Tài khoản của bạn đã bị khoá. Vui lòng thử lại");
      }
    } else {
      document.querySelector(".error-password").innerHTML =
        "Mật khẩu hoặc Email không đúng. vui lòng thử lại";
    }
  }
});
