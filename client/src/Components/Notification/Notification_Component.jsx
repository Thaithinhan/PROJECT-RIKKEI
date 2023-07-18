import React, { useEffect, useState } from "react";
import "./Notification.css";
import { Link } from "react-router-dom";
import io from "socket.io-client";

// Khởi tạo kết nối đến server
const socket = io("http://localhost:4000");

const Notification_Component = () => {
  const [activeTab, setActiveTab] = useState("All");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    socket.on("like", ({ userId, tweetId }) => {
      console.log(`User ${userId} liked tweet ${tweetId}`);

      // Cập nhật UI để phản ánh sự thay đổi. Điều này phụ thuộc vào thư viện/framework bạn đang sử dụng
      // Ví dụ, nếu bạn đang sử dụng React, bạn có thể cập nhật trạng thái của một component để phản ánh sự thay đổi này
    });
  }, [socket]);

  return (
    <div className="notifications-container">
      <h4 className="p-2">Notifications</h4>
      <div className="notification-menu">
        <div
          className={`menu-item ${activeTab === "All" ? "active" : ""}`}
          onClick={() => handleTabClick("All")}
        >
          All
        </div>
        <div
          className={`menu-item ${activeTab === "Verified" ? "active" : ""}`}
          onClick={() => handleTabClick("Verified")}
        >
          Verified
        </div>
        <div
          className={`menu-item ${activeTab === "Mention" ? "active" : ""}`}
          onClick={() => handleTabClick("Mention")}
        >
          Mention
        </div>
      </div>
      <div className="notification">
        <Link to={"/profile-user"} className="avatar">
          <img
            src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/325974944_1890980747908840_7410515548073747029_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PQou7DxaYS4AX_69UV8&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAkdjCUkiTJ1Ud8FU4ZgQOm7n1DPy0zA_em9ig5VJnzog&oe=64ACFE11"
            alt="Avatar"
          />
        </Link>
        <div className="notification-content">
          <Link to={"/profile-user"} className="header nav-link">
            <span className="fullname">Thái Thị Nhàn</span>{" "}
            <span className="username">@Nhanthai</span>
            <span className="date">2023/07/07</span>
          </Link>
          <div className="content">
            Replying to <Link to={"/profile-user"}>@Nhana9093 </Link> <br />
            <Link to={"/to-tweet"} className="nav-link">
              for what tweet???
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification_Component;
