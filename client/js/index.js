//Tạo hiện thanh stickky navbar khi scroll ở màn hình lớn
window.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 200 && window.innerWidth > 992) {
    document.querySelector("nav.nav-fixed").classList.add("show_nav_fixed");
    document.querySelector("nav.nav-fixed").style.display = "block";
  } else {
    document.querySelector("nav.nav-fixed").style.display = "none";
  }
});
//Tạo chuyển trang login khi click vào biểu tượng login
const btnLogin = document.querySelectorAll(".btn-login");
// console.log(btnLogin);
btnLogin.forEach((item) => {
  item.addEventListener("click", (e) => {
    window.location = "/login-form/login.html";
  });
});

// RENDER PHẦN GIAO DIỆN CHÍNH INDEX
let products = JSON.parse(localStorage.getItem("products"));
//1. Render phần sản phẩm nổi bật
function renderFeatureProduct(data) {
  const ulElement = document.querySelector(".list-features");
  content = "";
  data.forEach((item) => {
    if (!item.sale_off) {
      item.sale_off = "0%";
    }
    content += ` <li class="col-md-6 col-lg-3">
                <div class="product-detail">
                  <div class="sale-off">${item.sale_off}</div>
                  <a href="#" class="img-name-product">
                    <img src="${item.image}" alt="" />
                    <p class="product-name py-3 fw-bold">${item.name}</p>
                  </a>
                  <div
                    class="price-view my-3 d-flex justify-content-between align-items-center"
                  >
                    <p class="price">
                      <span class="old-price me-3">${item.old_price}</span>
                      <span class="new-price">${item.current_price}</span>
                    </p>
                    <a href="#" class="view-product" onclick="handleView(this,${item.id},'${item.code}')"
                      ><i class="fa-solid fa-eye"></i> View</a
                    >
                  </div>
                  <button class="btn btn-danger btn-add-cart" onclick="handleAddCart(this,${item.id})">
                    Thêm vào giỏ hàng <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </li>`;
  });
  ulElement.innerHTML = content;
}
const featureProduct = products.filter(
  (item) => Number(item.current_price) >= 350000
);
renderFeatureProduct(featureProduct);

// Render Sản phẩm bán chạy
function renderBestSellProduct(data) {
  const ulElement = document.querySelector(".list-best-sell");
  content = "";
  data.forEach((item) => {
    if (!item.sale_off) {
      item.sale_off = "0%";
    }
    content += ` <li class="col-md-6 col-lg-3">
                <div class="product-detail">
                  <div class="sale-off">${item.sale_off}</div>
                  <a href="#" class="img-name-product">
                    <img src="${item.image}" alt="" />
                    <p class="product-name py-3 fw-bold">${item.name}</p>
                  </a>
                  <div
                    class="price-view my-3 d-flex justify-content-between align-items-center"
                  >
                    <p class="price">
                      <span class="old-price me-3">${item.old_price}</span>
                      <span class="new-price">${item.current_price}</span>
                    </p>
                    <a href="#" class="view-product" onclick="handleView(this,${item.id},'${item.code}')"
                      ><i class="fa-solid fa-eye"></i> View</a
                    >
                  </div>
                  <button class="btn btn-danger btn-add-cart"  onclick="handleAddCart(this,${item.id})">
                    Thêm vào giỏ hàng <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </li>`;
  });
  ulElement.innerHTML = content;
}
const bestSellProduct = products.filter(
  (item) =>
    item.group.toLowerCase() == "váy" || item.group.toLowerCase() == "quần"
);
renderBestSellProduct(bestSellProduct);
