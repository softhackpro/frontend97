import React, { useState } from 'react';
import RecentResult from '../DownSlider/RecentResult';
import BettingPage from './Popup/BettingPage';

const Kbc = ({game, gmid}) => {
  const [ModalOpen, setModalOpen] = useState(false)
  return (
    <>
    <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe>
    <div style={{maxWidth: "100vw"}} className=" mx-auto bg-gray-200 p-4 rounded">
      {/* [Q1] RED-BLACK Section */}
      <div className="mb-4">
        <div className="text-gray-800 font-bold mb-2">[Q1] RED-BLACK</div>
        <div className="flex justify-between gap-4">
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-full py-3 px-6 w-full flex justify-center items-center">
            <span className="text-gray-800 font-bold mr-2">RED</span>
            <span className="text-red-100 text-xl">♥♦</span>
          </div>
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-full py-3 px-6 w-full flex justify-center items-center">
            <span className="text-gray-800 font-bold mr-2">BLACK</span>
            <span className="text-black text-xl">♠♣</span>
          </div>
        </div>
      </div>

      {/* [Q2] ODD-EVEN and [Q3] UP-DOWN Sections */}
      <div className="flex gap-4 mb-4">
        {/* ODD-EVEN */}
        <div className="w-1/2">
          <div className="text-gray-800 font-bold mb-2">[Q2] ODD-EVEN</div>
          <div className="flex gap-4">
            <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-full py-3 w-full flex justify-center items-center">
              <span className="text-gray-800 font-bold">ODD</span>
            </div>
            <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-full py-3 w-full flex justify-center items-center">
              <span className="text-gray-800 font-bold">EVEN</span>
            </div>
          </div>
        </div>

        {/* UP-DOWN */}
        <div className="w-1/2">
          <div className="text-gray-800 font-bold mb-2">[Q3] 7 UP-7 DOWN</div>
          <div className="flex gap-4">
            <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-full py-3 w-full flex justify-center items-center">
              <span className="text-gray-800 font-bold">DOWN</span>
            </div>
            <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-full py-3 w-full flex justify-center items-center">
              <span className="text-gray-800 font-bold">UP</span>
            </div>
          </div>
        </div>
      </div>

      {/* [Q4] 3 CARD JUDGEMENT Section */}
      <div>
        <div className="text-gray-800 font-bold mb-2">[Q4] 3 CARD JUDGEMENT</div>
        <div className="grid grid-cols-4 gap-4">
          {/* Card Option 1 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
            <div  className="grid grid-cols-2 gap-1 mb-1">
              <div className="bg-white p-1 rounded text-center font-bold text-xl">A</div>
              <div className="bg-white p-1 rounded text-center font-bold text-xl">A</div>
            </div>
            <div className="bg-white p-1 rounded w-full text-center font-bold text-xl">
              3
            </div>
          </div>

          {/* Card Option 2 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-1 mb-1">
              <div className="bg-white p-1 rounded text-center font-bold text-xl">6</div>
              <div className="bg-white p-1 rounded text-center font-bold text-xl">6</div>
            </div>
            <div className="bg-white p-1 rounded w-full text-center font-bold text-xl">
              6
            </div>
          </div>

          {/* Card Option 3 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-1 mb-1">
              <div className="bg-white p-1 rounded text-center font-bold text-xl">Q</div>
              <div className="bg-white p-1 rounded text-center font-bold text-xl">Q</div>
            </div>
            <div className="bg-white p-1 rounded w-full text-center font-bold text-xl">
              10
            </div>
          </div>

          {/* Card Option 4 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-1 mb-1">
              <div className="bg-white p-1 rounded text-center font-bold text-xl">7</div>
              <div className="bg-white p-1 rounded text-center font-bold text-xl">8</div>
            </div>
            <div className="bg-white p-1 rounded w-full text-center font-bold text-xl">
              K
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-gray-800 font-bold mb-2">[Q5] SUITS</div>
        <div className="grid grid-cols-4 gap-4">
          {/* Card Option 1 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
  <p className="flex justify-center items-center text-center w-full h-10 text-5xl">♥</p>
</div>


          {/* Card Option 2 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
  <p className="flex justify-center items-center text-center w-full h-10 text-5xl">♥</p>
</div>

          {/* Card Option 3 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
  <p className="flex justify-center items-center text-center w-full h-10 text-5xl">♥</p>
</div>

          {/* Card Option 4 */}
          <div onClick={()=>setModalOpen(true)} className="bg-gradient-to-b from-red-600 to-red-800 rounded-2xl py-3 px-4 flex flex-col items-center">
  <p className="flex justify-center items-center text-center w-full h-10 text-5xl">♥</p>
</div>
        </div>
      </div>
      <br />
      <RecentResult />
      
      
    </div>
    {
    ModalOpen ? (<BettingPage setisModalopen={setModalOpen}/>) : null
  }
    </>
  );
};

export default Kbc;