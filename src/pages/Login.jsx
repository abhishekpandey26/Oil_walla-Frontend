import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // 1-minute timer
  const [message, setMessage] = useState(""); // State for messages
  const [messageType, setMessageType] = useState(""); // Error or success
  const navigate = useNavigate();

  // Function to handle OTP sending
  const handleSendOtp = async () => {
    if (email.includes("@")) {
      try {
        const response = await fetch("http://localhost:5000/api/otp/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessageType("success");
          setMessage(data.message || "We’ve sent an OTP to your email.");
          setOtpSent(true);
          setTimer(60); // Reset timer
        } else {
          setMessageType("error");
          setMessage(data.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setMessageType("error");
        setMessage("Error sending OTP. Please try again.");
      }
    } else {
      setMessageType("error");
      setMessage("Enter a valid email address.");
    }
  };

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/otp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageType("success");
        setMessage(data.message || "OTP verified successfully!");
        setIsLoggedIn(true);
        navigate("/address");
      } else {
        setMessageType("error");
        setMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage("Error verifying OTP. Please try again.");
    }
  };

  // Countdown Timer
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 px-4 sm:px-8">
      <div className="w-full max-w-md sm:max-w-lg p-6 sm:p-10 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Login or Signup
        </h2>
        {message && (
          <p
            className={`mb-4  text-center text-sm px-4 py-3 rounded-md bg-[#D1E7DD] ${
              messageType === "error" ? "text-red-500" : "text-black"
            }`}
          >
            {message}
          </p>
        )}
        {!otpSent ? (
          <>
            <div className="mb-6 sm:mb-8">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="w-full bg-[#1058B7] text-white py-2 rounded-lg hover:bg-[#0E4A92] transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-600">
              OTP has been sent to your email. Valid for 2 minutes.
            </p>
            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-[#0E4A92] transition"
            >
              Verify OTP
            </button>
            {timer > 0 ? (
              <p className="mt-4 text-sm text-gray-600">
                Time remaining:{" "}
                <span className="font-bold text-red-500">
                  {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                  {timer % 60}
                </span>
              </p>
            ) : (
              <button
                onClick={handleSendOtp}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-[#0E4A92] transition"
              >
                Resend OTP
              </button>
            )}
          </>
        )}
        <p className="text-sm text-gray-600 mt-4 text-center">
          By continuing, I agree to the{" "}
          <a href="#" className="text-blue-500 underline">
            Terms of Use
          </a>{" "}
          &{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
