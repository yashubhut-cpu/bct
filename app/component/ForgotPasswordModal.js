"use client";

import { useState } from "react";
import { post } from "../api/base";
import Popup from "./Popup";
import { X } from "lucide-react";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    try {
      // Call your API to handle forgot password logic
      const response = await post("/user_management/forgot_password/", {
        email,
      });
      if (response.status === 200) {
        setPopup({
          show: true,
          message: "Password reset instructions sent to your email.",
          type: "success",
        });
      } else {
        setPopup({
          show: true,
          message: "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#1E1E2F",
          padding: "20px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ marginBottom: "20px" }}>Forgot Password</h2>
          <X
            size={24}
            onClick={() => {
              onClose();
              setEmail("");
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="forgot-email"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Email*
            </label>
            <input
              type="email"
              id="forgot-email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #999999",
                backgroundColor: "#00000000",
                color: "#ffffff",
              }}
            />
          </div>
          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px", marginBottom: "20px" }}>
              {errorMessage}
            </p>
          )}
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#4E71F3",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                onClose(); // Close the modal
                setEmail(""); // Clear the email input field
              }}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#4E71F3",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        {popup.show && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => {
              setPopup({ ...popup, show: false });
              if (popup.type === "success") {
                onClose();
                setEmail("");
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
