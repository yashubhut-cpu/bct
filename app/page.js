"use client";
import { useRouter } from "next/navigation";
import { post } from "./api/base";
import { useState } from "react";
import "@fontsource/be-vietnam-pro";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/400-italic.css";
import Loading from "./component/loading";
import ForgotPasswordModal from "./component/ForgotPasswordModal";
export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setErrorMessage("");

    if (!email && !password) {
      setErrorMessage("Please enter email and password.");
      return;
    }

    if (!email) {
      setEmailError("Please enter email.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter password.");
      return;
    }
    setLoading(true);
    try {
      const response = await post("/user_management/login/", {
        email,
        password,
      });

      console.log(response);

      if (response.status === 200 && response.data?.tokens) {
        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        localStorage.setItem("accessToken", response.data.tokens.access);
        // Debugging log

        if (response.data?.is_first_login === true) {
          const logID = response?.data?.change_password_request_id;

          router.push(`/updatepassword?logID=${logID}`);
        } else if (response.data?.is_first_login === false) {
          router.push("/dashboard");
        }
      } else {
        setErrorMessage(response.data?.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Invalid credentials.");
    } finally {
      setLoading(false);
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const refreshResponse = await post(
          "/user_management/api/token/refresh/",
          { refresh: refreshToken }
        );
        if (refreshResponse.ok) {
          localStorage.setItem(
            "accessToken",
            refreshResponse.data.token.access
          );
          localStorage.setItem(
            "refreshToken",
            refreshResponse.data.token.refresh
          );
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        setErrorMessage("An error occurred while refreshing the session.");
      }
    }
  };
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
              fontSize: "40px",
              marginTop: "50px",
            }}
          >
            Sign In
          </h4>
          <p
            style={{
              color: "#A4A6B3",
              lineHeight: "16px",
              marginBottom: "30px",
            }}
          >
            Welcome back! Login to your account.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Username/Email field */}
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  marginRight: "10px",
                  lineHeight: "2.5",
                }}
              >
                Email*
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="mail@simmmple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    paddingRight: "40px",
                    fontSize: "15px",
                    border: "1px solid #999999 ",
                    backgroundColor: "#00000000",
                    color: "#fff",
                  }}
                />
                <img
                  src="/images/password_icon.svg"
                  alt="Email Icon"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              {emailError && (
                <p
                  style={{ color: "red", fontSize: "14px", marginTop: "10px" }}
                >
                  {emailError}
                </p>
              )}
            </div>

            {/* Password field */}
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  marginRight: "10px",
                  lineHeight: "2.8",
                }}
              >
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // This changes based on showPassword
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "15px",
                    border: "1px solid #999999 ",
                    paddingRight: "40px",
                    backgroundColor: "#00000000",
                    color: "#ffffff",
                    position: "relative",
                  }}
                />
                <div
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "3%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {/* Use img tag to display the correct icon */}
                  <img
                    src={
                      showPassword
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
              </div>
              {passwordError && (
                <p
                  style={{ color: "red", fontSize: "14px", marginTop: "20px" }}
                >
                  {passwordError}
                </p>
              )}
            </div>

            {/* Error message */}
            {errorMessage && (
              <p
                style={{ color: "red", fontSize: "14px", marginBottom: "20px" }}
              >
                {errorMessage}
              </p>
            )}

            {/* "Keep me logged in" checkbox and "Forgot password" */}
            <div
              className="flex-wrap"
              style={{
                marginBottom: "20px",
                display: "flex",
                fontSize: "14px",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              {/* Checkbox and label */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  style={{
                    width: "18px",
                    height: "18px",
                    marginRight: "8px",
                  }}
                />
                <label
                  htmlFor="keepLoggedIn"
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                >
                  Keep me logged in
                </label>
              </div>

              {/* Forgot password link */}
              <div>
                <a
                  href="#"
                  style={{ color: "#ffffff", fontSize: "14px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsForgotPasswordModalOpen(true);
                  }}
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <div style={{ marginBottom: "20px", marginTop: "10px" }}>
              {/* <button
                type="submit" // Submit button triggers the form submission
                style={{
                  width: "100%",
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "#4E71F3", // Blue button color
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                
              </button> */}
              <button
                type="submit"
                className="w-full h-[50px] p-[20px] bg-[#4E71F3] text-white font-bold rounded-lg hover:bg-[#3c5bb3] focus:outline-none flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loading color="white" />
                  </div>
                ) : (
                  "Sign In"
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
      </div>

      {/* Render the Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
    </div>
  );
}
