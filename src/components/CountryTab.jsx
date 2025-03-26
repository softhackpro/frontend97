import React from 'react';

// Mapping of country codes to their FontAwesome icons
// Note: You may need to adjust these based on available FontAwesome icons
const getCountryFlagUrl = (countryCode) => {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`; 



}

const CountryTab = ({ country, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        px-4 py-2 flex items-center flex-col justify-center gap-2 cursor-pointer max-h-[40px] transition-colors
        ${isActive 
          ? 'bg-white font-medium ' 
          : 'bg-gray-100 hover:bg-gray-200'
        }
      `}
    >
        {
            country.title !== "ALL" &&  <img src={getCountryFlagUrl(country.title)} alt="" className='h-[20px] w-[20px]' />
        }
     
      <span className='text-xs'>{country.title}</span>
    </div>
  );
};

export default CountryTab;