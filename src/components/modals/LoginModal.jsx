import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../services/auth/auth.context";
import { useLocation, useNavigate } from "react-router";
import logo from "../../assets/logo.png";

const LoginModal = ({ isOpen, onClose }) => {
  const { onLogin, onLoginWithUsernameAndPassword, error, loading } =
    useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleLoginWithDemo = () => {
    onLogin();
    navigate(location.pathname, { replace: true });
    onClose();
  };
  const handleLoginWithCredentials = () => {
    onLoginWithUsernameAndPassword(username, password);
    if (error) {
      alert(error);
      navigate("/", { replace: true });
      return;
    }
    navigate(location.pathname, { replace: true });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-blue-600 to-green-800 flex flex-col items-center justify-center pt-16 animate-fadeIn">
        {/* Close button */}
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer hover:opacity-80"
        >
          <span className="text-white text-2xl font-bold">✕</span>
        </div>

        {/* Logo */}
        <div className="mb-8">
          <div className="flex h-10">
            <img src={logo} alt="" />
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md px-8 space-y-4">
          {/* Username Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 pl-4 pr-10 rounded-md border border-gray-300 bg-white"
            />
            <div className="absolute right-3 top-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pl-4 pr-10 rounded-md border border-gray-300 bg-white"
            />
            <div className="absolute right-3 top-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLoginWithCredentials}
            className="w-full bg-blue-700 text-white p-2 rounded-md font-medium shadow-md hover:bg-blue-800 transition"
          >
            Login
          </button>

          {/* Demo Login Button */}
          <button
            onClick={handleLoginWithDemo}
            className="w-full bg-blue-700 text-white p-2 rounded-md font-medium shadow-md hover:bg-blue-800 transition"
          >
            Login with Demo ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
