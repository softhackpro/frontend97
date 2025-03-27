import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import ToggleArrowButton from './ToggleArrowButton';

const ListItem = ({ item, classname, isToggle, isIcon, onClick, isExpanded , preIcon, action }) => {
  
  
  return (
    <div 
      className={`flex justify-between ${preIcon && "ml-[10px]"} items-center px-4 py-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100`}
      onClick={action} 
    >
      <div className='flex justify-items-start items-center'>
      {
        preIcon && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className='w-[20px] h-[20px]'>
        <path d="M12 8l-6 6v-4H2V6h4V2z" fill="#2196F3" stroke="#2196F3" stroke-width="0.5"  />
      </svg>
      }
      <span className={`${classname} `}>{item}</span>
      </div>
      {!isToggle && !isIcon && 
        <FaChevronRight className="text-gray-600 border border-gray" />
      }
      
      {isToggle && 
        <ToggleArrowButton isDown={isExpanded} /> 
      }
    </div>
  );
};

export default ListItem;