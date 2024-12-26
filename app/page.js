"use client";
// Import the useRouter hook for navigation
import { useRouter } from 'next/navigation';
import { useState } from "react";
export default function Home() {
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Navigate to the dashboard page
    router.push('/dashboard');
  };
  const [showPassword, setShowPassword] = useState(false);

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
          top: "-150px",
          left: "-150px",
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
          bottom: "-150px",
          right: "-150px",
          filter: "blur(100px)",
          opacity: "0.60",
          zIndex: "1",
        }}
      ></div>

      {/* Background image illustration */}
      <div
        style={{
          position: "absolute",
          top: "255px",
          left: "1296px",
          width: "542px",
          height: "542px",
          opacity: 1,
        }}
      >
        <img
          src="/images/Illustration.svg"
          alt="Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Sign-in Form Design */}
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Align elements vertically (logo above, form below)
          justifyContent: "flex-start",
          alignItems: "flex-start", // Align left
          height: "100vh",
          backgroundColor: "#1E1E2F",
          padding: "20px", // Adjust padding as needed
        }}
      >
        {/* Sign-in Box */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px", // Max width of the form box
            padding: "40px",
            color: "#ffffff",
            textAlign: "left",
            lineHeight: "0.2",
            position: "absolute", // Fixed position for the sign-in box
            top: "350px", // Adjust the top position as needed, make it below the logo
            left: "300px", // Align the box to the left side of the screen
          }}
        >
          {/* Sign-in header */}
          <h4
            style={{ color: "ffffff", marginBottom: "30px", fontSize: "40px" }}
          >
            Sign In
          </h4>
          <p
            style={{
              color: "#A4A6B3",
              lineHeight: "0.3",
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
          </form>

          {/* Submit button */}
          <div style={{ marginBottom: "20px" }}>
            <button
              type="submit" // Submit button triggers the form submission
              onClick={handleSubmit}
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
        </div>
      </div>

      {/* Background image logo */}
      <div
        style={{
          position: "absolute",
          top: "280px",
          left: "342px",
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
    </div>
  );
}
