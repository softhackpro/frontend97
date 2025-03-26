import React from "react";
import { NavLink } from "react-router";
import HomeIcon from "./svg/Home";

import SportsIcon from "./svg/Sports";
import AccountIcon from "./svg/Account";
import InPlayIcon from "./svg/InPlay";
import ChipRotate from "../assets/ChipRotate.gif";

const BottomNavigationBar = () => {
  const Menus = [
    { name: "Home", route: "/", icon: <HomeIcon /> },
    { name: "In-play", route: "/in-play", icon: <InPlayIcon /> },
    { name: "Sports", route: "/sports", icon: <SportsIcon /> }, // Default Active (Middle One)
    { name: "Casino", route: "/casino", icon: "img" },
    { name: "Account", route: "/account", icon: <AccountIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-b from-[#243a48] via-[#243a48] to-[#172732] text-white z-10 md:hidden">
      <ul className="flex p-0 mb-0 list-none text-white box-border">
        {Menus.map((menu, index) => (
          <li key={index} className="flex-1 text-center py-2">
            {" "}
            {/* Adjusted padding */}
            <NavLink
              to={`${menu.route}`}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center w-[20vw] h-[14vw] 
              box-border text-ellipsis whitespace-nowrap text-[3.2vw] text-center 
              leading-[1.1] py-[1vw] no-underline transition-all duration-300 ease-in-out 
              ${
                isActive
                  ? "bg-gradient-to-t from-[#1f4258] via-[#2c546e] to-[#32617f]"
                  : ""
              } 
              ${
                menu.name === "Sports"
                  ? "before:content-[''] before:absolute before:top-[-4.26667vw] before:left-0 before:w-full before:h-[17.53333vw] before:bg-gradient-to-b before:from-[#243a48] before:via-[#243a48] before:to-[#172732] before:bg-no-repeat before:bg-[length:100%_100%] before:pointer-events-none before:block before:z-[-10] before:[clip-path:polygon(99.973%_24.242%,100%_24.242%,100%_100%,0%_100%,0%_24.242%,.027%_24.242%,.027%_24.242%,.885%_23.318%,2.866%_21.335%,5.893%_18.565%,9.891%_15.281%,14.783%_11.756%,20.494%_8.261%,26.947%_5.068%,34.066%_2.451%,41.776%_.681%,50%_.03%,50%_12.152%,50%_.03%,50%_.03%,58.224%_.681%,65.934%_2.451%,73.053%_5.068%,79.506%_8.261%,85.217%_11.756%,90.109%_15.281%,94.107%_18.565%,97.134%_21.335%,99.115%_23.318%,99.973%_24.242%)]"
                  : ""
              }`
              }
            >
              {/* Icon */}
              <div className="mb-[0.5vw]">
                {menu.icon === "img" ? (
                  <img
                    src={ChipRotate}
                    alt="casino chip"
                    className="w-[7.70333vw] h-[7.33333vw]"
                  />
                ) : (
                  menu.icon
                )}
              </div>
              {/* Text */}
              <span className="mt-[1vw] block">{menu.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigationBar;
