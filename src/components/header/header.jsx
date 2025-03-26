import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../search/SearchBar";
import AgeVerificationModal from "../modals/AgeVerificationModal";
import logo from "../../assets/logo.png";
import LoginModal from "../modals/LoginModal";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchbar, setSearchBar] = useState(false);
  const [showAgeVerificationModal, setShowAgeVerificationModal] =
    useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="w-full font-sans">
      {/* Desktop Navigation */}
      <div className=" flex items-center justify-between bg-gradient-to-b from-[#315195] to-[#14213D] p-4">
        <div className="flex items-center">
          <img src={logo} className="h-10 w-auto cursor-pointer" />
        </div>

        <div className=" items-center space-x-4 hidden md:flex">
          <FaSearch
            className="h-5 w-5 text-lg  text-white"
            onClick={() => {
              setSearchBar(true);
            }}
          />
          {searchbar && <SearchBar setSearchBar={setSearchBar} />}

          <input
            type="text"
            className="px-3 py-1 text-sm bg-white rounded-full outline-none w-28"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="px-3 py-1 text-sm bg-white rounded-full outline-none w-28"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setShowAgeVerificationModal(true);
          }}
          className="bg-gradient-to-b from-[#f72424] to-[#bb1c00] text-white px-4 py-2 rounded-sm hover:opacity-90 transition duration-300"
        >
          Login →
        </button>
      </div>

      <AgeVerificationModal
        isOpen={showAgeVerificationModal}
        onClose={() => {
          setShowAgeVerificationModal(false);
        }}
        onConfirm={() => setShowLoginModal(true)}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
      />
    </div>
  );
};

export default Header;
