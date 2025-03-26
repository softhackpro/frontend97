import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ setSearchBar }) => {
  //("here");

  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchBar(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setSearchBar]);

  return (
    <div className="fixed  inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        ref={searchRef}
        className="w-full max-w-md bg-white rounded-md shadow-lg p-2 flex items-center border border-gray-300"
      >
        {/* Search Icon */}
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-500 text-lg mx-2"
        />

        {/* Search Input */}
        <input
          type="text"
          className="w-full h-8 px-2 text-sm border-none outline-none"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Clear (X) Button */}
        {searchQuery && (
          <button
            className="text-gray-500 hover:text-red-500 p-1"
            onClick={() => setSearchQuery("")}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
