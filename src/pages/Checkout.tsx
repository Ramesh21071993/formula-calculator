import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductDetails from "../components/Product";

const Checkout: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getProduct } = useProduct();

  const productDetails = getProduct(productId);

  const [inputData, setInputData] = useState({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const validateInputs = () => {
    const newErrors: any = {};
    //Full Name validation
    const fullNameRegex = /[A-Za-z]/;
    if (!inputData.fullName || !fullNameRegex.test(inputData.fullName)) {
      newErrors.fullName =
        "Invalid name (should only contain letters A-Z and a-z)";
    }

    //Address validation
    if (!inputData.address) newErrors.address = "Address is required";

    //Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputData.email || !emailRegex.test(inputData.email)) {
      newErrors.email =
        "Valid email is required (should have a valid email syntax)";
    }

    //Phone Number Validation
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!inputData.phoneNumber || !phoneRegex.test(inputData.phoneNumber)) {
      newErrors.phoneNumber =
        "Invalid Phone number (should 10 digit long in a format xxx-xxx-xxxx)";
    }

    //Card number Validation
    const cardRegex = /^[0-9]{19}$/;
    if (!inputData.cardNumber || !cardRegex.test(inputData.cardNumber)) {
      newErrors.cardNumber = "Credit card number must be 19 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (validateInputs()) {
      moveToConfirmation();
    // }
  };

  const moveToConfirmation = () => {
    navigate(`/confirmation/${productId}`, {
      state: { from: location },
      replace: true,
    });
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <ProductDetails product={productDetails} showButton={false} />
      <h4>Please enter the billing information</h4>
      <div className="input-container">
        <label htmlFor="fullName" className="input-label">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={inputData.fullName}
          onChange={handleInputChange}
        />
        {errors.fullName && (
          <span className="input-error">{errors.fullName}</span>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="address" className="input-label">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={inputData.address}
          onChange={handleInputChange}
        />
        {errors.address && (
          <span className="input-error">{errors.address}</span>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="input-error">{errors.email}</span>}
      </div>

      <div className="input-container">
        <label htmlFor="phoneNumber" className="input-label">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={inputData.phoneNumber}
          onChange={handleInputChange}
        />
        {errors.phoneNumber && (
          <span className="input-error">{errors.phoneNumber}</span>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="cardNumber" className="input-label">
          Credit Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={inputData.cardNumber}
          onChange={handleInputChange}
        />
        {errors.cardNumber && (
          <span className="input-error">{errors.cardNumber}</span>
        )}
      </div>

      <button onClick={handleSubmit} className="submit-btn">
        Submit Order
      </button>
    </div>
  );
};

export default Checkout;
