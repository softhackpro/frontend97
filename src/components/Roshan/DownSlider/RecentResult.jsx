import React, { useEffect, useState } from 'react';
import Popup from '../Casino/Popup/Popup';
import axios from 'axios';

const RecentResult = ({result}) => {
  //(result);
  
  const [ModalOpen, setModalOpen]  = useState()
  const [fetchedResult, setFetchedResult] = useState([])
  //(fetchedResult, "ye fetched result hai");
  
  const getlastResult = async() => {
    try {
      const res = await axios.get(`https://titan97.live/get-lastgamecasino/${result}`)
      //(res?.data?.data?.res, "recent result");
      setFetchedResult(res?.data?.data?.res)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
      getlastResult()
  },[result])
  // Sample data for the result circles
  // const results = ['R', 'R', 'R', 'R', 'R', 'R', "0", "9", "T", "B", "D", "P", "P", "P"];

  return (
    <>
    <div className="flex items-center bg-black text-white p-2">
      <h2 style={{ minWidth: "94px" }} className="font-bold mr-4 text-sm">
        Recent Result
      </h2>
      <div className="flex space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {fetchedResult.map((result, index) => (
          <div
            onClick={()=>setModalOpen(true)}
            key={index}
            className="w-8 h-8 min-w-8 rounded-full bg-blue-400 flex items-center justify-center text-black font-medium"
          >
            {result.win}
          </div>
        ))}
      </div>
    </div>
    {
      ModalOpen ? <Popup setModalOpen={setModalOpen}/> : null
    }
    </>
  );
};

export default RecentResult;
