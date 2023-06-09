import reducerCart from "./CartsSlice";
import reducerCheckout from "./CheckoutSlice";
import reducerComment from "./CommentSlice";
import reducerCourse from "./CoursesSlice";
import reducerMyTeach from "./MyTeachSlice";
import reducerUsers from "./UsersSlice";

const rootReducer = {
  users: reducerUsers,
  courses: reducerCourse,
  carts: reducerCart,
  checkout: reducerCheckout,
  myTeach: reducerMyTeach,
  comment: reducerComment,
};

export default rootReducer;
