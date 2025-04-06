import React, { useState } from 'react';
import Popup from './Popup/Popup';
import BettingPage from './Popup/BettingPage';
import LiveCsno from '../LiveStreaming/LiveCsno';

const AndarBahar = ({game, gmid}) => {
  console.log(game, "andar bahar");
  
  const [ModalOpen, setModalOpen] = useState(false)
    const topRowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const bottomRowNumbers = [9, 10, 11, 12, 13];

  // Recent results
  const recentResults = ['B', 'B', 'B', 'B', 'A'];
  return (
    <>
    <LiveCsno game={game} gmid={gmid} />
    {/* <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe> */}
    <div className=" max-w-md mx-auto bg-gray-200 p-4 rounded-lg shadow-md">


    <div className=" p-6 flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2 w-full max-w-lg">
        {/* Header Row A */}
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold">A</span>
        </div>
        <div className="flex items-center justify-center">
          {/* Empty center cell */}
        </div>
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold">A</span>
        </div>

        {/* First betting row */}
        <div onClick={()=>setModalOpen(true)} className="rounded-md border-2 border-yellow-400 bg-gray-200 p-2 flex flex-col items-center">
          <div className="font-semibold text-sm">SIDE BET A</div>
          <div className="font-bold text-lg">12</div>
          <div className="mt-2">0</div>
        </div>
        <div onClick={()=>setModalOpen(true)} className="rounded-md border-2 border-yellow-400 bg-blue-600 p-2 flex flex-col items-center text-white">
          <div className="font-semibold text-sm">1st BET A</div>
          <div className="font-bold text-lg">2</div>
          <div className="mt-2">0</div>
        </div>
        <div onClick={()=>setModalOpen(true)} className="rounded-md border-2 border-yellow-400 bg-gray-800 p-2 flex flex-col items-center text-white relative">
          <div className="font-semibold text-sm">2st BET A</div>
          <div className="font-bold text-lg">2</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-600 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">0</div>
        </div>

        {/* Header Row B */}
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold">B</span>
        </div>
        <div className="flex items-center justify-center">
          {/* Empty center cell */}
        </div>
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold">B</span>
        </div>

        {/* Second betting row */}
        <div onClick={()=>setModalOpen(true)} className="rounded-md border-2 border-yellow-400 bg-gray-200 p-2 flex flex-col items-center">
          <div className="font-semibold text-sm">SIDE BET B</div>
          <div className="font-bold text-lg">12</div>
          <div className="mt-2">0</div>
        </div>
        <div onClick={()=>setModalOpen(true)} className="rounded-md border-2 border-yellow-400 bg-blue-600 p-2 flex flex-col items-center text-white">
          <div className="font-semibold text-sm">1st BET B</div>
          <div className="font-bold text-lg">2</div>
          <div className="mt-2">0</div>
        </div>
        <div className="rounded-md border-2 border-yellow-400 bg-gray-800 p-2 flex flex-col items-center text-white relative">
          <div className="font-semibold text-sm">2st BET B</div>
          <div className="font-bold text-lg">2</div>
          <div onClick={()=>setModalOpen(true)} className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-600 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">0</div>
        </div>
      </div>
    </div>



      
      {/* ODD/EVEN section */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 text-center font-bold">
          <div className="bg-white p-2 text-black">ODD</div>
          <div className="bg-white p-2 text-black">EVEN</div>
          <div onClick={()=>setModalOpen(true)} className="bg-sky-300 p-2">1.83</div>
          <div onClick={()=>setModalOpen(true)} className="bg-sky-300 p-2">2.12</div>
          <div onClick={()=>setModalOpen(true)} style={{color: "black"}} className="bg-white p-2 text-xs">8</div>
          <div onClick={()=>setModalOpen(true)} style={{color: "black"}} className="bg-white p-2 text-xs">0</div>
        </div>
      </div>
      
      {/* Card suit buttons */}
      {/* <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col items-center">
          <div className="mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <div className="bg-blue-900 w-full p-2 flex justify-center rounded">
            <div className="bg-white p-1 rounded-full w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 8.25v-3a3.75 3.75 0 117.5 0v3h-7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-center">0</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <div className="bg-blue-900 w-full p-2 flex justify-center rounded">
            <div className="bg-white p-1 rounded-full w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 8.25v-3a3.75 3.75 0 117.5 0v3h-7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-center">0</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="bg-blue-900 w-full p-2 flex justify-center rounded">
            <div className="bg-white p-1 rounded-full w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 8.25v-3a3.75 3.75 0 117.5 0v3h-7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-center">0</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="bg-blue-900 w-full p-2 flex justify-center rounded">
            <div className="bg-white p-1 rounded-full w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 8.25v-3a3.75 3.75 0 117.5 0v3h-7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-center">0</div>
        </div>
      </div> */}
    </div>
    <div className="max-w-md mx-auto">
    {/* Main container with gray background */}
    {/* <div className="bg-gray-300 p-4 rounded-md">
    
      <div className="text-center font-bold text-xl mb-2">12</div>
      
    
     <div className="flex justify-center mb-2">
        {topRowNumbers.map((num) => (
          <div key={num} className="relative mx-0.5">
            <div className="w-10 h-10 bg-gray-700 border-2 border-yellow-500 flex items-center justify-center">
              <div className="bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center text-sm">0</div>
          </div>
        ))}
      </div>
    
      {/* <div className="flex mb-25 justify-center">
        {bottomRowNumbers.map((num) => (
          <div key={num} className="relative mx-0.5">
            <div className="w-10 h-10 bg-gray-700 border-2 border-yellow-500 flex items-center justify-center">
              <div className="bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center text-sm">0</div>
          </div>
        ))}
      </div> 
    </div> */}
    
    {/* Recent Results Section */}
    <div className="bg-black text-white mt-1 flex items-center p-2 rounded-md">
      <div className="font-bold mr-2">Recent Result</div>
      <div className="flex">
        {recentResults.map((result, index) => (
          <div 
            key={index} 
            className={`rounded-full w-8 h-8 flex items-center justify-center mx-1 
              ${result === 'A' ? 'bg-blue-400' : 'bg-pink-400'}`}
          >
            {result}
          </div>
        ))}
      </div>
    </div>
  </div>

  {
    ModalOpen ? (<BettingPage setisModalopen={setModalOpen} game={game}/>) : null
  }
  </>
  );
};

export default AndarBahar;