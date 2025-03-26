import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";

const TitleBar = ({title , background="bg-gradient-to-t from-[#14213D] to-[#315195]" , fontSize="" , lineHieght=""  , stream=false, onClick}) => {
 
  
  return (
    <div className={`${background } flex `} onClick={onClick}>
        <h3 className={` ${!fontSize ? "text-[14px]":fontSize} ${lineHieght} text-[#fff]  w-[80%] leading-[30px] font-bold pl-[10px]  m-0 text-center cursor-pointer`}>{title}</h3>
        {stream && (
        <span className={`${fontSize} w-[10%]`}>
          <FontAwesomeIcon icon={faTv} className="text-white ml-[5px]" />
        </span>
      )}
        
    </div>
  )
}

export default TitleBar