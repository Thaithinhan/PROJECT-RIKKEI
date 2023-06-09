//Them vao gia hang

==>
bước 1: tạo CartSlice nó không phải là bất đồng bộ.

bước 2:khi user click them vao gio hang ==> lay data chuan bi push co dang

          {
               userCurrent: {
                    lấy từ local về
                    id: "",
                    email: "",
               },

               cousre: [
                    {

                    }
               ]
          }

khi có data có dạng object như trên => dispatch action đồng bộ lên CartSlice ở reudcer có dạng

     reducer: {
          addToCart: (state, action) => {
               state.push(action.payload)
               return state
          }
     }

//no la dong bo => reducer

//Xử lý trùng
trên component có nút add to cart, check xem cart trên localsorage đã có chưa khoá học đó chưa đã có chưa, nếu có rồi thì biến nút "ADD" thành nút "GO"

vào trang cart => gọi từ từ reducer của cartSlice

==> render ra thôi :)))))
