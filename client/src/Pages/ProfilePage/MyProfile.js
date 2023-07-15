import React from "react";
import ProfileComponent from "../../Components/Profile/ProfileComponent";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
import { Container } from "react-bootstrap";
import RightBar from "../../Components/RightBar/RightBar";

const MyProfilePage = () => {
  return (
    <div className="profile-page">
      <Container className="d-lg-flex">
        <SidebarComponent />
        <ProfileComponent />
        <RightBar />
      </Container>
    </div>
  );
};

export default MyProfilePage;
