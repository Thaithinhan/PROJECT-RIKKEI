import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/HomePage/Homepage";
import Register from "./Pages/Register/Register";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MainPage from "./Pages/MainPage/MainPage";
import Notification from "./Pages/Notification/Notification";
import Message from "./Pages/Message/Message";
import ProfilePage from "./Pages/ProfilePage/MyProfile";
import PostDetail from "./Pages/PostDetail/PostDetail";
import MyProfilePage from "./Pages/ProfilePage/MyProfile";
import VerifyPage from "./Pages/VerifyPage/VerifyPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<MainPage />}></Route>
        <Route path="/notifications" element={<Notification />}></Route>
        <Route path="/messages" element={<Message />}></Route>
        <Route path="/my-profile" element={<MyProfilePage />}></Route>
        <Route path="/profile/:id" element={<MyProfilePage />}></Route>
        <Route path="/post-detail/:id" element={<PostDetail />}></Route>
        <Route path="/verify/:id" element={<VerifyPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
