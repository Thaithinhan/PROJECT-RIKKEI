import React, { useEffect, useState } from "react";
import "./TabListUser.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getUser } from "../../redux/reducer/UsersSlice";

const TabListUser = ({ handleOpenViewUser }) => {
  const [user, setUser] = useState([]);
  const checkout = useSelector((state) => state.checkout);
  // console.log(checkout);

  //Lấy dữ liệu User từ API
  const fecthUser = async () => {
    const res = await axios.get("http://localhost:5000/users");
    // console.log(res);
    setUser(res.data);
    return res.data;
  };

  useEffect(() => {
    fecthUser();
  }, []);

  // Tạo một mảng mới chứa thông tin người mua và số lượng khoá học đã mua
  const buyerWithCourseCount = user.map((buyer) => {
    const purchasedCourses = checkout.filter(
      (purchase) => purchase.currentUser.email === buyer.email
    );

    return {
      buyer: buyer,
      courseCount: purchasedCourses[0]?.courseUser?.length,
    };
  });

  // FUNCTION VIEW USER
  const dispatch = useDispatch();
  const handleViewUser = async (idUser) => {
    // console.log(idUser);
    handleOpenViewUser();
    await dispatch(getUser(idUser));
  };

  return (
    <div className="p-2">
      <div className="top-tabListUserAdmin d-flex justify-content-between align-items-center p-3">
        <h5 className="fw-bold">List Users</h5>
        <div className="position-relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-0 p-2 "
          />
          <button className="btn btn-none btn-search">
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="show-user">
        <ul>
          {buyerWithCourseCount?.map((item, index) => (
            <li key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="avt-img me-3">
                  <img src={item.buyer.image} alt="avt" />
                </div>
                <div className="user-info">
                  <h6 className="fw-bold m-0">{item.buyer.fullname}</h6>
                  <p className="m-0">
                    Total Course:{" "}
                    <span className="fw-bold text-danger">
                      {item.courseCount ? item.courseCount : 0}
                    </span>
                  </p>
                </div>
              </div>

              <button
                className="btn btn-outline-danger"
                onClick={() => handleViewUser(item.buyer.id)}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabListUser;

// FORM HIỂN THỊ VIEW

export function MoDalViewUser({ handleCloseViewUser, openViewUser }) {
  const chooseUser = useSelector((state) => state.users);

  // console.log(chooseUser);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleCloseViewUser();
  };

  useEffect(() => {
    setShow(openViewUser);
  }, [openViewUser]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">View User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="user-info-modal">
          <div className="text-center mb-2">
            <img src={chooseUser.image} alt="" />
          </div>
          <h6 className="">
            Fullname: <b>{chooseUser.fullname}</b>{" "}
          </h6>
          <p>
            Email: <b>{chooseUser.email}</b>{" "}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
