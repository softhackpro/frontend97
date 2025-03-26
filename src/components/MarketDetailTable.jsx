import React from 'react';

const MarketDetailTable = ({ data, matchAmount }) => {
  return (
    <div className="w-full shadow-md bg-gradient-to-b from-white via-white via-[42%] to-white border border-[#c8ced3] text-[12px] p-4 flex flex-col">
      
      {/* Header Section */}
      <div className="w-full bg-white text-black p-0 text-[13px] border-b border-[#7e97a7] md:flex md:items-center md:justify-between block">
        
        {/* Winner Section */}
        <strong className="h-[30px] leading-[30px] bg-gradient-to-t from-[#2E4B5E] to-[#243A48] font-bold pr-[30px] pl-[10px] relative text-white rounded-tr-[15px] text-[12px] float-left">
          Winner
          <span data-bs-toggle="modal" data-bs-target="#exampleModal1" className="ml-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" className="w-[15px] h-[15px] absolute right-[8px] top-[8px] text-white bg-no-repeat bg-contain inline-block">
              <path fill="currentColor" fillRule="evenodd" d="M6.76 5.246V3.732h1.48v1.514H6.76zm.74 8.276a5.86 5.86 0 0 0 3.029-.83 5.839 5.839 0 0 0 2.163-2.163 5.86 5.86 0 0 0 .83-3.029 5.86 5.86 0 0 0-.83-3.029 5.839 5.839 0 0 0-2.163-2.163 5.86 5.86 0 0 0-3.029-.83 5.86 5.86 0 0 0-3.029.83A5.839 5.839 0 0 0 2.308 4.47a5.86 5.86 0 0 0-.83 3.029 5.86 5.86 0 0 0 .83 3.029 5.839 5.839 0 0 0 2.163 2.163 5.86 5.86 0 0 0 3.029.83zM7.5 0c1.37 0 2.638.343 3.804 1.028a7.108 7.108 0 0 1 2.668 2.668A7.376 7.376 0 0 1 15 7.5c0 1.37-.343 2.638-1.028 3.804a7.108 7.108 0 0 1-2.668 2.668A7.376 7.376 0 0 1 7.5 15a7.376 7.376 0 0 1-3.804-1.028 7.243 7.243 0 0 1-2.668-2.686A7.343 7.343 0 0 1 0 7.5c0-1.358.343-2.62 1.028-3.786a7.381 7.381 0 0 1 2.686-2.686A7.343 7.343 0 0 1 7.5 0zm-.74 11.268V6.761h1.48v4.507H6.76z"></path>
            </svg>
          </span>
        </strong>

        {/* Matched Count */}
        <span className="float-right px-[10px] py-[5px] text-[13px] bg-transparent md:w-[230px] md:text-right md:absolute md:right-0">
          Matched <strong className="text-black mr-3">€ {matchAmount}</strong>
        </span>
      </div>

      {/* Data Table */}
      <table className="w-full mb-4 text-white border-collapse border border-[#dee2e6] bg-transparent">
        <thead className="border border-inherit">
          <tr>
            <th className="border border-b-[#7e97a7] p-[5px] text-center">
              <dl className="p-0 m-0 h-[20px] flex bg-[#bed5d8] text-[10px] leading-[7px] rounded-[3px] items-center justify-center">
                <dt className="inline-block mr-[8px] text-[#315195]">Min/Max</dt>
                <dd className="text-[10px] leading-[7px] inline-block m-0">1-0</dd>
              </dl>
            </th>

            {/* Empty Column for spacing */}
            <th colSpan="3" className="hidden md:table-cell"></th>

            {/* Back & Lay columns */}
            <th className="p-[5px] border-t-0 text-center bg-[#72bbef] border-l-[#7e97a7] md:rounded-tl-[10px]">Back</th>
            <th className="p-[5px] border-t-0 text-center bg-[#faa9ba] border-l-[#7e97a7] md:rounded-tr-[10px]">Lay</th>

            {/* Another Min/Max Column */}
            <th colSpan="2" className="hidden md:table-cell border border-b-[#7e97a7] p-[5px] text-center">
              <dl className="p-0 m-0 h-[20px] flex bg-[#bed5d8] text-[10px] leading-[7px] rounded-[5px] items-center justify-center">
                <dt className="inline-block mr-[8px] text-[#315195]">Min/Max</dt>
                <dd className="text-[10px] leading-[7px] inline-block m-0">1-0</dd>
              </dl>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default MarketDetailTable;
