"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "../api/base";
import { useState, useEffect, Suspense } from "react";
import Popup from "../component/Popup";
import Loading from "../component/loading";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import { type } from "os";

function UpdatePasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [logID, setLogID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    document.title = "Update Password";
    const logIDParam = searchParams.get("logID");
    setLogID(logIDParam);

    if (!logIDParam) {
      setErrorMessage("Invalid request. Missing logID.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setErrorMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    if (!logID) {
      setErrorMessage("Invalid request. Missing logID.");
      return;
    }

    const payload = {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    setLoading(true);
    try {
      const response = await post(
        `/user_management/update_password/${logID}/`,
        payload
      );

      console.log("API Response:", response);

      if (response.status === 200) {
        setPopup({
          show: true,
          message: "Password updated successfully. Redirecting to dashboard...",
          type: "success",
        });
        router.push("/dashboard");
      } else {
        setPopup({
          show: true,
          message: "Password update failed.",
          type: "error",
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div
      style={{
        backgroundColor: "#13182C",
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient left corner */}
      <div
        style={{
          background:
            "radial-gradient(circle, #5177FF, rgba(81, 119, 255, 0.15))",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          position: "absolute",
          top: "0",
          right: "80%",
          filter: "blur(100px)",
          opacity: "0.60",
          zIndex: "1",
        }}
      ></div>

      {/* Background gradient right corner */}
      <div
        style={{
          background:
            "radial-gradient(circle, #5177FF, rgba(81, 119, 155, 0.1))",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          position: "absolute",
          bottom: "0",
          left: "80%",
          filter: "blur(100px)",
          opacity: "0.60",
          zIndex: "1",
        }}
      ></div>

      {/* Sign-in Form Design */}
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1E1E2F",
          padding: "20px 20px 20px 00px",
          gap: "100px",
        }}
      >
        {/* Sign-in Box */}
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            padding: "30px",
            color: "#ffffff",
            lineHeight: "0.2",
            zIndex: "2",
          }}
        >
          {/* Background image logo */}
          <div
            style={{
              width: "200px",
              height: "auto",
              opacity: 100,
            }}
          >
            <img
              src="/images/bct_small.svg"
              alt="bct_small"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {/* Sign-in header */}
          <h4
            style={{
              color: "ffffff",
              marginBottom: "30px",
              fontSize: "35px",
              marginTop: "50px",
            }}
          >
            Update Your Password
          </h4>

          <form onSubmit={handleSubmit}>
            {/* Old Password field */}
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <label
                htmlFor="oldPassword"
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  marginRight: "10px",
                  lineHeight: "2.8",
                }}
              >
                Old Password*
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  border: "1px solid #999999 ",
                  paddingRight: "40px",
                  backgroundColor: "#00000000",
                  color: "#ffffff",
                }}
              />
              <div
                onClick={toggleOldPasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "73%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    showOldPassword
                      ? "/images/eye_icon.svg"
                      : "/images/close_eye_icon.svg"
                  }
                  alt="Eye Icon"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              {passwordError && (
                <p
                  style={{ color: "red", fontSize: "14px", marginTop: "10px" }}
                >
                  {passwordError}
                </p>
              )}
            </div>

            {/* New Password field */}
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <label
                htmlFor="newPassword"
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  marginRight: "10px",
                  lineHeight: "2.8",
                }}
              >
                New Password*
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  border: "1px solid #999999 ",
                  paddingRight: "40px",
                  backgroundColor: "#00000000",
                  color: "#ffffff",
                }}
              />
              <div
                onClick={toggleNewPasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "73%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    showNewPassword
                      ? "/images/eye_icon.svg"
                      : "/images/close_eye_icon.svg"
                  }
                  alt="Eye Icon"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              {passwordError && (
                <p
                  style={{ color: "red", fontSize: "14px", marginTop: "10px" }}
                >
                  {passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password field */}
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <label
                htmlFor="confirmPassword"
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  marginRight: "10px",
                  lineHeight: "2.8",
                }}
              >
                Confirm New Password*
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  border: "1px solid #999999 ",
                  paddingRight: "40px",
                  backgroundColor: "#00000000",
                  color: "#ffffff",
                }}
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "73%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    showConfirmPassword
                      ? "/images/eye_icon.svg"
                      : "/images/close_eye_icon.svg"
                  }
                  alt="Eye Icon"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              {passwordError && (
                <p
                  style={{ color: "red", fontSize: "14px", marginTop: "10px" }}
                >
                  {passwordError}
                </p>
              )}
            </div>

            {errorMessage && (
              <p
                style={{ color: "red", fontSize: "14px", marginBottom: "20px" }}
              >
                {errorMessage}
              </p>
            )}

            {/* Submit button */}
            <div style={{ marginBottom: "20px", marginTop: "10px" }}>
              <button
                type="submit"
                className="w-full h-[50px] p-[20px] bg-[#4E71F3] text-white font-bold rounded-lg hover:bg-[#3c5bb3] focus:outline-none flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loading color="white" position="top" />
                  </div>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Background image illustration */} 
        <div
          className="background-illustration lg:block hidden"
          style={{
            width: "450px",
            height: "450px",
            opacity: 1,
          }}
        >
          <img
            src="/images/Illustration.svg"
            alt="Illustration"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* popup */}
        {popup.show && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => {
              setPopup({ ...popup, show: false });
              if (popup.type === "success") {
                onClose();
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function UpdatePassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePasswordContent />
    </Suspense>
  );
}
