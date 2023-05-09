let isEdit = false;

$(document).ready(function () {
  //FUNCTION CHO THÊM MỚI SẢN PHẨM
  //Đẩy sản phẩm lên Localsorage và lấy về
  const products = JSON.parse(localStorage.getItem("products")) ?? [];
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  //1. Tạo Function validate sản phẩm
  function ValidateNewProduct(product) {
    let products = JSON.parse(localStorage.getItem("products"));
    let error = {
      isError: false,
      code: "",
      //  title: "",
      name: "",
      group: "",
      type: "",
      color: "",
      code_color: "",
      size: "",
      current_price: "",
      number_instock: "",
      describe: "",
    };
    if (!product.code) {
      error.isError = true;
      error.code = "Không được để trống mã sản phẩm";
    }
    //     if (products) {
    //       products.forEach((item) => {
    //         if (item.code == product.code) {
    //           error.isError = true;
    //           error.code = "Mã sản Phẩm đã tồn tại";
    //         }
    //       });
    //     }
    //     if (!product.title) {
    //       error.isError = true;
    //       error.title = "Không được để trống Title sản phẩm";
    //     }
    if (!product.name) {
      error.isError = true;
      error.name = "Không được để trống tên sản phẩm";
    }
    if (products) {
      products.forEach((item) => {
        if (
          item.name.trim().toLowerCase() == product.name.trim().toLowerCase()
        ) {
          error.isError = true;
          error.code = "Tên Phẩm đã tồn tại. Vui lòng nhập tên khác";
        }
      });
    }
    if (!product.group) {
      error.isError = true;
      error.group = "Không được để trống nhóm sản phẩm";
    }
    if (!product.type) {
      error.isError = true;
      error.type = "Không được để trống loại sản phẩm";
    }
    if (!product.color) {
      error.isError = true;
      error.color = "Hãy chọn màu sản phẩm";
    }
    if (!product.code_color) {
      error.isError = true;
      error.code_color = "Không được để trống mã màu sản phẩm";
    }
    if (!product.size) {
      error.isError = true;
      error.size = "Không được để trống Size sản phẩm";
    }
    if (!product.current_price) {
      error.isError = true;
      error.current_price = "Không được để trống Giá hiện tại";
    }
    if (!product.number_instock) {
      error.isError = true;
      error.number_instock = "Không được để trống Số lượng nhập kho";
    }
    if (!product.describe) {
      error.isError = true;
      error.describe = "Không được để trống Mô tả";
    }
    return error;
  }
  //2.Tạo Function render lỗi
  function renderProductError(product) {
    const renderError = ValidateNewProduct(product);
    $("#error-code-product").text(renderError.code);
    //     $("#error-title-product").text(renderError.title);
    $("#error-name-product").text(renderError.name);
    $("#error-group-product").text(renderError.group);
    $("#error-type-product").text(renderError.type);
    $("#error-color").text(renderError.color);
    $("#error-code-color-product").text(renderError.code_color);
    $("#error-current-price").text(renderError.current_price);
    $("#error-size").text(renderError.size);
    $("#error-number-stock").text(renderError.number_instock);
    $("#error-product-desc").text(renderError.describe);
  }
  //3.Function Submit thêm sản phẩm

  $("#add-product-form").submit((e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("products"));
    if (!isEdit) {
      let id;
      if (products.length > 0) {
        id = products[products.length - 1].id + 1;
      } else {
        id = 1;
      }
      let image = "";
      if ($("#add-product-form #image-product")[0].files[0]) {
        image =
          "images/" + $("#add-product-form #image-product")[0].files[0].name;
      }
      const new_product = {
        id: id,
        code: $("#code-product").val().trim(),
        //  title: $("#title-product").val().trim(),
        name: $("#name-product").val().trim(),
        group: $("#group-product").val().trim(),
        type: $("#type-product").val().trim(),
        color: $("#color").val().trim(),
        code_color: $("#code-color-product").val().trim(),
        current_price: $("#current-price").val().trim(),
        old_price: $("#old-price").val().trim(),
        size: $("#size").val().trim(),
        number_instock: $("#number-in-stock").val().trim(),
        describe: $("#product-desc").val().trim(),
        image: image,
        sold: 0,
      };
      //3.1Check Validate sản phẩm mới
      let checkNewProduct = ValidateNewProduct(new_product);
      renderProductError(new_product);
      if (checkNewProduct.isError) {
        return;
      }
      products.push(new_product);
      alert("Đã thêm Sản phẩm thành công");
    } else {
      let choseProduct = products.find(
        (item) => item.id == Number($("#id-product").val())
      );
      let image = choseProduct.image;
      if ($("#add-product-form #image-product")[0].files[0]) {
        image =
          "images/" + $("#add-product-form #image-product")[0].files[0].name;
      }
      const edit_product = {
        id: Number($("#id-product").val()),
        code: $("#code-product").val().trim(),
        name: $("#name-product").val().trim(),
        group: $("#group-product").val().trim(),
        type: $("#type-product").val().trim(),
        color: $("#color").val().trim(),
        code_color: $("#code-color-product").val().trim(),
        current_price: $("#current-price").val().trim(),
        old_price: $("#old-price").val().trim(),
        size: $("#size").val().trim(),
        number_instock: $("#number-in-stock").val().trim(),
        describe: $("#product-desc").val().trim(),
        image: image,
      };
      products.forEach((item, index) => {
        if (item.id == edit_product.id) {
          products[index] = { ...item, ...edit_product };
        }
      });
      // console.log(products);
      isEdit = false;
      alert("Đã Edit Sản phẩm thành công");
    }
    //SAU khi Edit hoặc thêm thành công
    // console.log(new_product);
    $("#id-product").val(""),
      $("#code-product").val(""),
      $("#name-product").val(""),
      $("#group-product").val(""),
      $("#type-product").val(""),
      $("#color").val(""),
      $("#code-color-product").val(""),
      $("#current-price").val(""),
      $("#old-price").val(""),
      $("#size").val(""),
      $("#number-in-stock").val(""),
      $("#product-desc").val(""),
      localStorage.setItem("products", JSON.stringify(products));
    renderProduct(products);
    $(".right-main section").css("display", "none");
    $(".right-main section.product-content").css("display", "block");
  });

  //Hiển thị phần quản lý sản phẩm

  $("#list-product").click(() => {
    $(".right-main section").css("display", "none");
    $(".right-main section.product-content").css("display", "block");
    let products = JSON.parse(localStorage.getItem("products"));
    renderProduct(products);
  });
});

//FUNCTION XOÁ SẢN PHẨM
function handleRemoveProduct(element, id) {
  let products = JSON.parse(localStorage.getItem("products"));
  products.forEach((item, index) => {
    if (item.id == id) {
      products.splice(index, 1);
    }
  });
  renderProduct(products);
  localStorage.setItem("products", JSON.stringify(products));
}

//FUNCTION EDIT SẢN PHẨM
function handleEditProduct(e, id) {
  event.preventDefault();
  let products = JSON.parse(localStorage.getItem("products"));
  isEdit = true;
  document.querySelectorAll(".right-main section").forEach((section) => {
    section.style.display = "none";
  });
  document.querySelector(".right-main section.add-product").style.display =
    "block";
  const choseProduct = products.find((item) => item.id == id);
  document.querySelector("#id-product").value = choseProduct.id;
  document.querySelector("#code-product").value = choseProduct.code;
  document.querySelector("#name-product").value = choseProduct.name;
  document.querySelector("#group-product").value = choseProduct.group;
  document.querySelector("#type-product").value = choseProduct.type;
  document.querySelector("#color").value = choseProduct.color;
  document.querySelector("#code-color-product").value = choseProduct.code_color;
  document.querySelector("#current-price").value = choseProduct.current_price;
  document.querySelector("#old-price").value = choseProduct.old_price;
  document.querySelector("#size").value = choseProduct.size;
  document.querySelector("#number-in-stock").value =
    choseProduct.number_instock;
  document.querySelector("#product-desc").value = choseProduct.describe;
}

// RENDER phần list PRODUCT
function renderProduct(list_product) {
  let tableProductElement = document.querySelector("#table-product");
  let tableProductContent = ` <thead>
                        <tr>
                           <th scope="col">ID</th>
                          <th scope="col">Mã sản phẩm</th>
                          <th scope="col">Nhóm sản phẩm</th>
                          <th scope="col">Loại sản phẩm</th>
                          <th scope="col">Ảnh sản phẩm</th>
                          <th scope="col">Tên sản phẩm</th>
                          <th scope="col">Giá</th>
                          <th scope="col">Màu sản phẩm</th>
                          <th scope="col">Kích thước</th>
                          <th scope="col">Đã bán</th>
                          <th scope="col">Tồn kho</th>
                           <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>`;
  if (list_product) {
    list_product.forEach((element) => {
      if (!element.sold) {
        element.sold = 0;
      }
      tableProductContent += ` <tr>
                          <td scope="row">${element.id}</td>
                          <td>${element.code}</td>
                          <td>${element.group}</td>
                          <td>${element.type}</td>
                          <td>
                            <img
                              src="${element.image}"
                              alt=""
                            />
                          </td>
                          <td>${element.name}</td>
                          <td>${element.current_price}</td>
                          <td>${element.color}</td>
                          <td>${element.size}</td>
                          <td>${element.sold}</td>
                          <td>${element.number_instock}</td>
                          <td>
                            <a href="#" class="me-2 edit"
                              onclick="handleEditProduct(this, ${element.id})"><i class="far fa-edit"></i
                            >
                            </a>
                            <a href="#" onclick="handleRemoveProduct(this, ${element.id})" class="me-2 remove">
                            <i class="fas fa-trash"></i>
                            </a>
                            <a href="#" onclick="handleViewProduct(this, ${element.id})" class="view">
                            <i class="fa-solid fa-eye"></i>
                            </a>
                            </td>
                        </tr>`;
    });
  }
  tableProductContent += `</tbody>`;
  tableProductElement.innerHTML = tableProductContent;
}

//RENDER VIEW CHI TIẾT TỪNG SẢN PHẦM4
function handleViewProduct(element, id) {
  event.preventDefault();
  let products = JSON.parse(localStorage.getItem("products"));
  document.querySelectorAll(".right-main section").forEach((section) => {
    section.style.display = "none";
  });
  document.querySelector(".right-main section.detail-product").style.display =
    "block";
  const choseProduct = products.find((item) => item.id == id);
  document.querySelector("section.detail-product .product-image img").src =
    choseProduct.image;
  let detailMoreInfoElement = document.querySelector(".detail-more-info");
  let content = `<h6
                          class="text-decoration-underline fw-bold text-danger"
                        >
                          Thông tin chi tiết sản phẩm:
                        </h6>
                        <h3 class="detail-product-name">
                          ${choseProduct.name}
                        </h3>
                        <p class="fw-bold text-secondary detail-product-code">
                          Mã sản phẩm: ${choseProduct.code}
                        </p>
                        <p class="content-product-desc">
                         ${choseProduct.describe}
                        </p>
                        <div class="price py-2 d-flex align-items-center">
                          <h5
                            class="detail-new-price fw-bold text-danger m-0 me-2"
                          >
                            ${choseProduct.current_price} VNĐ
                          </h5>
                          <p
                            class="detail-old-price text-decoration-line-through text-secondary fw-bold"
                          >
                            ${choseProduct.old_price}
                          </p>
                        </div>
                        <p class="detail-sold-number">
                          Số lượng đã bán:
                          <span class="fw-bold text-danger">${choseProduct.sold}</span>
                        </p>
                        <p class="in-stock-number">
                          Số lượng tồn kho:
                          <span class="fw-bold text-danger">${choseProduct.number_instock}</span>
                        </p>
                        <p
                          class="color-product-detail d-flex align-items-center"
                        >
                          Màu sắc: <span style="background: ${choseProduct.code_color}"></span>
                        </p>`;
  detailMoreInfoElement.innerHTML = content;
}
