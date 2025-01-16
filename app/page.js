"use client";
// Import the useRouter hook for navigation
import { useRouter } from 'next/navigation';

import { useState,useEffect } from "react";
import "@fontsource/be-vietnam-pro"; // Defaults to weight 400
import "@fontsource/be-vietnam-pro/400.css"; // Specify weight
import "@fontsource/be-vietnam-pro/400-italic.css"; // Specify weight and style


export default function Home() {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Login";
    if(localStorage.getItem("accessToken")){
      router.push('/dashboard')
    }else{
      router.push('/')
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await fetch(
        "https://bct-trade-alert-backend-production.up.railway.app/user_management/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure JSON content type
          },
          body: JSON.stringify({ email, password }), // Dynamically include email and password
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle success
        console.log("Login successful:", data?.tokens?.access);
  
        // Store tokens in localStorage
        localStorage.setItem("accessToken", data?.tokens?.access);
        localStorage.setItem("refreshToken", data?.tokens?.refresh);
  
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Handle error response
        console.error("Validation errors:", data.error);
        const errorMessage =
          data.error?.email?.[0] ||
          data.error?.password?.[0] ||
          data.message ||
          "Login failed. Please Check Username/Password.";
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
  
      // Check if refresh token exists and is expired
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Try refreshing the token
          const refreshResponse = await fetch(
            "https://bct-trade-alert-backend-production.up.railway.app/user_management/api/token/refresh/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken }),
            }
          );
  
          const refreshData = await refreshResponse.json();
  
          if (refreshResponse.ok) {
            // Successfully got new tokens, store them
            console.log("Refresh token success:", refreshData);
  
            // Update tokens in localStorage
            localStorage.setItem("accessToken", refreshData.accessToken);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
  
            // Optionally, rerun the login logic or proceed to the dashboard
            router.push("/dashboard");
          } else {
            console.error("Refresh token failed:", refreshData);
            setErrorMessage("Session expired, please login again.");
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          setErrorMessage("An error occurred while refreshing the session.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
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
        overflow: "hidden",  // Prevent scrollbars
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
      <div className=''
        style={{
          display: "flex",
          justifyContent: "center", // Center vertically
          alignItems: "center", // Align left
          height: "100vh",
          backgroundColor: "#1E1E2F",
          padding: "20px 20px 20px 00px", // Adjust padding as needed
          gap: "100px",
        }}
      >

        {/* Sign-in Box */}
        <div
          style={{
            width: "100%",
            maxWidth: "450px", // Max width of the form box
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
            style={{ color: "ffffff", marginBottom: "30px", fontSize: "40px", marginTop: "50px" }}
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
          <form onSubmit={handleSubmit}> {/* Handle form submission */}
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
                Username/Email*
              </label>
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
                  top: "73%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                }}
              />
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
                }}
              />
              <div
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "73%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {/* Use img tag to display the correct icon */}
                <img
                  src={showPassword ? "/images/eye_icon.svg" : "/images/close_eye_icon.svg"} // Conditional image path
                  alt="Eye Icon"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "20px" }}>
                {errorMessage}
              </div>
            )}

            {/* "Keep me logged in" checkbox and "Forgot password" */}
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                fontSize: "14px",
                alignItems: "center",
                justifyContent: "space-between",
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
                <a href="#" style={{ color: "#ffffff", fontSize: "14px" }}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <div style={{ marginBottom: "20px" }}>
              <button
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
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Background image illustration */}
        <div className="background-illustration lg:block hidden"
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


    </div>
  );
}
