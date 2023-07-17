import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./VerifyComponent.css";

const VerifyAccount = () => {
  const [amount, setAmount] = useState(100000);
  const [verificationType, setVerificationType] = useState("monthly");

  useEffect(() => {
    if (verificationType === "monthly") {
      setAmount(100000);
    } else if (verificationType === "permanent") {
      setAmount(1000000);
    }
  }, [verificationType]);

  const handleSelectChange = (event) => {
    setVerificationType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = JSON.parse(localStorage.getItem("accessToken"));
    const userLogin = JSON.parse(localStorage.getItem("login-user"));

    // Send a POST request
    const response = await axios.post(
      "URL_TO_YOUR_API",
      {
        user_id: userLogin.id,
        amount: amount,
        verification_type: verificationType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle response here
  };

  return (
    <div className="verify-account">
      <h2>Verify your account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Amount to pay</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập số tiền muốn nạp"
            value={amount}
            readOnly // Prevent user from changing the amount manually
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type of verify</Form.Label>
          <Form.Select onChange={handleSelectChange} value={verificationType}>
            <option value="monthly">Monthly - 100.000VND</option>
            <option value="permanent">Forever - 1.000.000VND</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify Confirm
        </Button>
      </Form>
    </div>
  );
};

export default VerifyAccount;
