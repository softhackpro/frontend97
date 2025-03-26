import React from "react";
import search from "/search.png";

const SearchBarIcon = ({ setSearchBar }) => (
  <div
    className="h-full bg-gradient-to-b from-[#610b0c] to-[#801011] absolute right-0 flex items-center justify-center p-4 cursor-pointer w-[60px]"
    onClick={() => setSearchBar(true)}
  >
    <img src={search} className="h-5" alt="Search" />
  </div>
);

export default SearchBarIcon;
