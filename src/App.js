import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FooterComponent from "./components/Footer/FooterComponent";
import HeaderCpmponent from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import SignUp from "./pages/Authen/SignUp";
import Login from "./pages/Authen/Login";
import CoursesPage from "./pages/Course/CoursesPage";
import CourseDetailPage from "./pages/Course/CourseDetailPage";
import CartPage from "./pages/Cart/Cart";
import LectureViewPage from "./pages/LectureView/LectureViewPage";
import MyteachPage from "./pages/MyTeach/MyteachPage";
import Admin from "./pages/Admin/Admin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UploadImage from "./components/uploadImage/UploadImage";

function App() {
  const userRedux = useSelector((state) => state.users);
  const [isCheck, setIsCheck] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("login-user"));
    setIsCheck(user);
  }, [userRedux]);

  return (
    <div className="App">
      <HeaderCpmponent />

      {/* Chuyển hướng */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin user={isCheck}>
              <Admin />
            </ProtectedAdmin>
          }
        />

        <Route path="/courses" element={<CoursesPage />} />

        <Route
          path="/cart"
          element={
            <ProtectedHome user={isCheck}>
              <CartPage />
            </ProtectedHome>
          }
        />

        <Route path="/course-detail" element={<CourseDetailPage />} />

        <Route
          path="/lecture"
          element={
            <ProtectedHome user={isCheck}>
              <LectureViewPage />
            </ProtectedHome>
          }
        />

        <Route
          path="/my-teach"
          element={
            <ProtectedHome user={isCheck}>
              <MyteachPage />
            </ProtectedHome>
          }
        />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/uploadImg" element={<UploadImage />}></Route>
      </Routes>
      <FooterComponent />
    </div>
  );
}

function ProtectedAdmin({ user, children }) {
  if (user?.email === "admin@gmail.com") {
    return children;
  }
  return <Navigate to="/" replace />;
}

function ProtectedHome({ user, children }) {
  if (user) {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default App;
