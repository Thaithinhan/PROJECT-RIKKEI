import React from "react";
import { Container } from "react-bootstrap";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
import RightBar from "../../Components/RightBar/RightBar";
import Notification_Component from "../../Components/Notification/Notification_Component";

const Notification = () => {
  return (
    <div className="wrapper-notification">
      <Container className="d-lg-flex">
        <SidebarComponent />
        <Notification_Component />
        <RightBar />
      </Container>
    </div>
  );
};

export default Notification;
