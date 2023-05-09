$(document).ready(function () {
  // Tạo hiển thị đăng nhập
  const userLogin = JSON.parse(sessionStorage.getItem("user-Login"));
  if (userLogin) {
    $(".btn-login").css("display", "none");
    $(".btn-logout").css("display", "inline-block");
    $(".btn-logout").html(
      userLogin.username + " " + '<i class="fa-solid fa-right-to-bracket"></i>'
    );
    $(".btn-logout").css({ color: "red", "font-weight": "bold" });
  } else {
    $(".btn-login").css("display", "inline-block");
    $(".btn-logout").css("display", "none");
  }
  const adminLogin = JSON.parse(sessionStorage.getItem("admin-Login"));
  if (adminLogin) {
    $(".btn-login").css("display", "none");
    $(".btn-logout").css("display", "inline-block");
    $(".btn-logout").html(
      adminLogin.username + " " + '<i class="fa-solid fa-right-to-bracket"></i>'
    );
    $(".btn-logout").css({ color: "red", "font-weight": "bold" });
  }

  //   Tạo chức năng đăng xuất
  $(".btn-logout").click((e) => {
    sessionStorage.removeItem("user-Login");
    sessionStorage.removeItem("admin-Login");
    $(".btn-login").css("display", "inline-block");
    $(".btn-logout").css("display", "none");
    window.location = "login-form/login.html";
  });
});

//CHỨC NĂNG KHI SEARCH SẢN PHẨM
// Chức năng tìm kiếm sản phẩm
let btn_searchs = document.querySelectorAll(".btn-search");
btn_searchs.forEach((btn_search) => {
  btn_search.addEventListener("click", (element) => {
    const search_input = element.target.previousElementSibling.value
      .trim()
      .toLowerCase();
    window.location = `product.html?search=${search_input}`;
  });
});
