const url = new URL(document.URL);
const id = url.searchParams.get("id");
const code = url.searchParams.get("code");
let list_products = products.filter((item) => item.code == code);
let choose_product = list_products.find((item) => item.id == id);
//RENDER PHẦN HÌNH ẢNH LỚN SẢN PHẨM
const previewBigImg = document.querySelector(
  ".view-product-section .preview-pic"
);
let previewBigImgContent = "";

previewBigImgContent += `<div class="tab-pane active" id="pic-${choose_product.id}">
                      <img src="${choose_product.image}" />
                    </div>
                   `;

previewBigImg.innerHTML = previewBigImgContent;
// console.log(choose_products);
//Render phần list hình ảnh chi tiết
const listSmallImg = document.querySelector(
  ".view-product-section ul.preview-thumbnail"
);
let listSmallImgContent = "";
let list_img = [];
list_products.forEach((product) => {
  list_img.push(product.image);
});
list_img = Array.from(new Set(list_img));
list_img.forEach((image, index) => {
  let image_product = list_products.find((item) => item.image == image);
  listSmallImgContent += `<li class="active">
                      <a href="#" data-target="#pic-${
                        index + 1
                      }" data-toggle="tab" onclick="slider( ${index})"
                        ><img src="${image}"/></a>
                    </li>
                   `;
});
listSmallImg.innerHTML = listSmallImgContent;
//Render PHẦN BÊN PHẢI
//tên
document.querySelector(
  ".view-product-section .details .product-title"
).innerHTML = choose_product.name;
let list_name = [];
list_products.forEach((product) => {
  list_name.push(product.name);
});
list_name = Array.from(new Set(list_name));
//mô tả
document.querySelector(
  ".view-product-section .details .product-description"
).innerHTML = choose_product.describe;
let list_desc = [];
list_products.forEach((product) => {
  list_desc.push(product.describe);
});
list_desc = Array.from(new Set(list_desc));
//giá
document.querySelector(".view-product-section .details .price span").innerHTML =
  Number(choose_product.current_price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
//size
let sizes = document.querySelector(".view-product-section .details .sizes");
let list_size = [];
list_products.forEach((product) => {
  list_size.push(product.size);
});
list_size = Array.from(new Set(list_size));
let sizesContent = "Kích thước:";
list_size.forEach((size) => {
  sizesContent += `  <button
                      class="size btn btn-none"
                      data-toggle="tooltip"
                      title="${size}"
                      onclick="chooseSize(this,'${size}')"
                    >
                      ${size}
                    </button>`;
});
sizes.innerHTML = sizesContent;
//Màu
let colors = document.querySelector(".view-product-section .details .colors");
let colorsContent = "Màu sắc:";
let list_color = [];
list_products.forEach((product) => {
  list_color.push(product.code_color);
});
list_color = Array.from(new Set(list_color));

list_color.forEach((color, index) => {
  colorsContent += `<a href="#" onclick="choose_color(this, ${index}, '${color}')" >
  <span class="color" style="background-color:${color}"></span>
  </a>`;
});
colors.innerHTML = colorsContent;

//TẠO FUNCTION SLIDER KHI CLICK SẼ CHUYỂN ẢNH
function slider(index) {
  event.preventDefault();
  previewBigImgContent = `<div class="tab-pane active" id="pic-${index}">
                      <img src="${list_img[index]}" />
                    </div>
                   `;
  previewBigImg.innerHTML = previewBigImgContent;
  //   click hiển thị tên
  document.querySelector(
    ".view-product-section .details .product-title"
  ).innerHTML = list_name[index];
  //   click hiển thị mổ tả
  document.querySelector(
    ".view-product-section .details .product-description"
  ).innerHTML = list_desc[index];
}

//FUNCTION HIỂN THỊ KHI CLICK CHỌN MÀU SẮC
let color_product;
function choose_color(element, index, color) {
  event.preventDefault();
  previewBigImgContent = `<div class="tab-pane active" id="pic-${index}">
                      <img src="${list_img[index]}" />
                    </div>
                   `;
  previewBigImg.innerHTML = previewBigImgContent;
  //   click hiển thị tên
  document.querySelector(
    ".view-product-section .details .product-title"
  ).innerHTML = list_name[index];
  //   click hiển thị mổ tả
  document.querySelector(
    ".view-product-section .details .product-description"
  ).innerHTML = list_desc[index];
  let colorBtn = document.querySelectorAll(".colors>a");
  colorBtn.forEach((btn) => {
    btn.classList.remove("active-color");
  });
  element.classList.add("active-color");
  color_product = color;
}
//FUNCTION HIỂN THỊ KHI CLICK CHỌN SIZE
let size_product;
function chooseSize(element, size) {
  let sizeBtn = document.querySelectorAll(".size");
  sizeBtn.forEach((btn) => {
    btn.classList.remove("active-size");
  });
  element.classList.add("active-size");
  size_product = size;
}

//FUNCTION THANH TOÁN TRAN DETAIL

function direct_checkout() {
  let userLogin = JSON.parse(sessionStorage.getItem("user-Login"));
  let adminLogin = JSON.parse(sessionStorage.getItem("admin-Login"));
  if (!userLogin && !adminLogin) {
    alert("Vui lòng đăng nhập để đi đến giỏ hàng");
  } else {
    window.location.href = "cart.html";
  }
}
