import React, { useEffect, useState } from "react";
import "./Admin.css";
import TabListUser, { MoDalViewUser } from "./TabListUser";
import TabOrderList, { MoDalViewOrder } from "./TabOrderList";
import TabCourseList, { ModalEditCourse } from "./TabCourseList";

const AdminComponent = ({ showContentTab }) => {
  const [openViewUser, setopenViewUser] = useState(false);
  const [openViewOrder, setopenViewOrder] = useState(false);
  const [openEditCourse, setopenEditCourse] = useState(false);
  const [chooseOrder, setChooseOrder] = useState(null);
  const [chooseCourse, setChooseCourse] = useState(null);
  const [indexCourse, setIndexCourse] = useState("");

  const handleOpenViewUser = () => {
    setopenViewUser(true);
  };
  const handleCloseViewUser = () => {
    setopenViewUser(false);
  };

  const handleOpenViewOrder = (order) => {
    setopenViewOrder(true);
    setChooseOrder(order);
  };
  const handleCloseViewOrder = () => {
    setopenViewOrder(false);
  };

  const handleOpenEditCourse = (course) => {
    setopenEditCourse(true);
    setChooseCourse(course);
  };
  const handleCloseEditCOurse = () => {
    setopenEditCourse(false);
  };

  const handleGetIndex = (index) => {
    setIndexCourse(index);
  };

  return (
    <div className="content-admin ">
      {showContentTab === "users" ? (
        <TabListUser handleOpenViewUser={handleOpenViewUser} />
      ) : showContentTab === "orders" ? (
        <TabOrderList handleOpenViewOrder={handleOpenViewOrder} />
      ) : (
        <TabCourseList
          handleOpenEditCourse={handleOpenEditCourse}
          handleGetIndex={handleGetIndex}
        />
      )}
      <MoDalViewUser
        openViewUser={openViewUser}
        handleCloseViewUser={handleCloseViewUser}
      />
      <MoDalViewOrder
        openViewOrder={openViewOrder}
        handleCloseViewOrder={handleCloseViewOrder}
        chooseOrder={chooseOrder}
      />
      <ModalEditCourse
        openEditCourse={openEditCourse}
        handleCloseEditCOurse={handleCloseEditCOurse}
        chooseCourse={chooseCourse}
        indexCourse={indexCourse}
      />
    </div>
  );
};

export default AdminComponent;
