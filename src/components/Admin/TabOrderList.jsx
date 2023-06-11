import React, { useEffect, useState } from "react";
import "./TabOrderList.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const TabOrderList = ({ handleOpenViewOrder }) => {
  const [user, setUser] = useState([]);
  const checkout = useSelector((state) => state.checkout);
  const orders = useSelector((state) => state.order);
  // console.log(orders);

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

  let totalMoney = 0;

  // CHức năng view order
  const dispatch = useDispatch();
  const handleViewOrder = (id) => {
    const order = orders.find((order) => order.id === id);
    // console.log(order);
    handleOpenViewOrder(order);
    // dispatch(viewOrder(order));
  };

  return (
    <div className="p-2">
      <div className="top-tabListOrderAdmin d-flex justify-content-between align-items-center p-3">
        <h5 className="fw-bold">List Order</h5>
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
      <div className="show-order">
        <ul>
          {orders.length &&
            orders.map((order, index) => (
              <li key={index}>
                <div className=" justify-content-between align-items-center">
                  <p>
                    Order Code: <b>{order.id}</b>
                  </p>
                  <p>
                    Buying Date: <b>{order.OrderDate}</b>
                  </p>
                  <p>
                    Buyer: <b>{order.currentUser.fullname}</b>
                  </p>
                  <p>
                    Buying Course :{" "}
                    {order.courses.map((course) => {
                      totalMoney += Number(course.price);
                      return (
                        <>
                          <b key={course.id}>{course.name}</b>
                          <br />
                        </>
                      );
                    })}
                  </p>
                  <p>
                    Total order:{" "}
                    <b>
                      đ
                      {order.courses
                        .reduce(
                          (prev, course) => prev + Number(course.price),
                          0
                        )
                        .toLocaleString()}
                    </b>
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleViewOrder(order.id)}
                >
                  View
                </button>
              </li>
            ))}
        </ul>
      </div>
      <h5>
        Total Revenue:{" "}
        <b className="text-danger">{totalMoney.toLocaleString()}</b>
      </h5>
    </div>
  );
};

export default TabOrderList;

export function MoDalViewOrder({
  handleCloseViewOrder,
  openViewOrder,
  chooseOrder,
}) {
  // const chooseOrder = useSelector((state) => state.order);

  // console.log(chooseOrder);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleCloseViewOrder();
  };

  useEffect(() => {
    setShow(openViewOrder);
  }, [openViewOrder]);

  let totalMoney = 0;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">View Order</Modal.Title>
        </Modal.Header>
        <Modal.Body className="user-info-modal">
          {chooseOrder && (
            <>
              <h6 className="">
                Buyer: <b>{chooseOrder.currentUser.fullname}</b>
              </h6>
              <p>
                Email: <b>{chooseOrder.currentUser.email}</b>
              </p>
              <p>
                Buying date: <b>{chooseOrder.OrderDate}</b>
              </p>
              {chooseOrder.courses.map((order) => {
                totalMoney += Number(order.price);
                return (
                  <div className="order-course-info d-flex align-items-center ">
                    <div className="text-center order-course-img mb-2 ">
                      <img alt="" src={order.image} />
                    </div>
                    <h6>{order.name}</h6>
                  </div>
                );
              })}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <h5>
            Total Money:{" "}
            <b className="text-danger">đ{totalMoney.toLocaleString()}</b>
          </h5>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
