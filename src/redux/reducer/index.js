import reducerCourse from "./CoursesSlice";
import reducerUsers from "./UsersSlice";

const rootReducer = {
  users: reducerUsers,
  courses: reducerCourse,
};

export default rootReducer;
