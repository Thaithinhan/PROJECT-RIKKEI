//RENDER CHO PHẦN TẤT CẢ SẢN PHẨM
function renderAllProduct(data) {
  const ulElement = document.querySelector(".show-product ul");
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
                      <span class="new-price">${Number(
                        item.current_price
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}</span>
                    </p>
                    <a href="#" class="view-product" onclick="handleView(this,${
                      item.id
                    },'${item.code}')"
                      ><i class="fa-solid fa-eye"></i> View</a
                    >
                  </div>
                  <button class="btn btn-danger btn-add-cart"  onclick="handleAddCart(this,${
                    item.id
                  })">
                    Thêm vào giỏ hàng <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </li>`;
  });
  ulElement.innerHTML = content;
}
renderAllProduct(products);

//CHUYỂN TRANG KHI TẠO RENDER SẢN PHẨM
function typeProduct(value) {
  window.location = `product.html?type=${value}`;
}
//Lấy type sản phẩm trên url trang product
let params = new URLSearchParams(document.location.search);
let type = params.get("type");
let type_products = JSON.parse(localStorage.getItem("products"));
if (type == "all") {
  document.querySelector(".top-title").innerHTML = "Tất cả sản phẩm";
  renderAllProduct(type_products);
}
if (type == "woman") {
  document.querySelector(".top-title").innerHTML = "Sản phẩm cho nữ";
  const type_woman = type_products.filter(
    (item) => item.type.toLowerCase() == "nữ"
  );
  renderAllProduct(type_woman);
}
if (type == "man") {
  document.querySelector(".top-title").innerHTML = "Sản phẩm cho nam";
  const type_man = type_products.filter(
    (item) => item.type.toLowerCase() == "nam"
  );
  renderAllProduct(type_man);
}
let find_products = JSON.parse(localStorage.getItem("products"));
let params_search = new URLSearchParams(document.location.search);
let search_value = params_search.get("search");
if (search_value) {
  let search = find_products.filter((item) =>
    item.name.toLowerCase().includes(search_value)
  );
  document.querySelector(".top-title").innerHTML = "Tìm Kiếm";
  renderAllProduct(search);
}
