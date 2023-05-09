$(document).ready(() => {
  $(".filter-item").click((e) => {
    $(e.currentTarget.children[1]).slideToggle();
  });
  $(document).ready(() => {
    $(".filter-item-group").click((e) => {
      $(e.currentTarget.children[1]).slideToggle();
    });
    $(".filter-item-color").click((e) => {
      $(e.currentTarget.children[1]).slideToggle();
    });
  });
});
//LỌC LẤY NHÓM SẢN PHẨM
let input_group = document.querySelectorAll(".filter-item-group input");
// console.log(input_group);
let groups = [];
input_group.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      groups.push(input.value);
      groups = Array.from(new Set(groups));
    } else {
      groups.splice(groups.indexOf(input.value), 1);
    }
    console.log(groups);
  });
});
