import React from 'react'

const ButtonGroup = ({ onClickItem, active }) => {
  const buttons = [
    { id: 'inPlay', label: 'In-Play' },
    { id: 'todayMatches', label: 'Today' },
    { id: 'tomorrowMatches', label: 'Tomorrow' }
  ]

  return (
    <div className="w-full md:w-fit p-4">
      <div className="flex w-full md:w-fit border border-[#3B5160] md:rounded-md overflow-hidden">
        {buttons.map((button, index) => (
          <button
            key={button.id}
            onClick={() => onClickItem(button.id)}
            className={`
              ${active === button.id ? 'bg-[#3B5160] text-white' : 'bg-[#fff] text-[#3B5160]'} 
              font-bold px-4 py-1 text-[13px] leading-[27px] 
              ${index !== buttons.length - 1 ? 'border-r border-[#3B5160]' : ''} 
              flex-1 md:flex-none
            `}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ButtonGroup