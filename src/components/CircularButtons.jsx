
import React from 'react'


const CircularButtons = ({title , isActive=false}) => {
  return (
    <button className={`block font-bold text-[3.46667vw] border leading-[9.06667vw] text-[#000000] ${title === "all" ?"rounded-full":"rounded-md"} rounded-full px-[2.4vw] py-[1.2vw] transition-all hover:text-[#09437f] hover:cursor-pointer focus:outline-none ${isActive ? "bg-gradient-to-b from-[#A4DC60] to-[#4F9F21] text-[#000000]":"bg-gradient-to-b from-[#2E4B5E] to-[#243A48]  border-[#000000]"}`}>
        {title}
    </button>
  )
}

export default CircularButtons