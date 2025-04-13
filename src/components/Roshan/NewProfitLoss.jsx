import React, { useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../services/auth/auth.context";
import { Link } from "react-router";
import { useLocation } from 'react-router';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
const NewProfitLoss = () => {
    const query = useQuery();
    const id = useMemo(() => query.get("id"), [query]);
    const gtype = useMemo(() => query.get("gtype"), [query]);
    const match_id = useMemo(() => query.get("match_id"), [query]);
        const { user } = useContext(AuthContext);
        const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
        const today = moment().format("YYYY-MM-DD");
      const [startDate, setStartDate] = useState(yesterday);
      const [endDate, setEndDate] = useState(today);
    const [value, setValue] = useState();
    
    const requestData = {
        userId: user?.user_id,
        identifier: id,
        match_id: match_id, 
        gtype: gtype
      };
      const requestCData = {
        userId: user?.user_id,
        identifier: `${id}_${match_id}`,
        match_id: id, 
        gtype: gtype
      };
    const fetchprofitlossevent = async() => {
        let updatedData = ""
        if (gtype === "casino" ){
          updatedData = requestCData
        }else if (gtype === "cricket"){
          updatedData = requestData
        }

        try {
            const response = await axios.post(`https://admin.titan97.live/Apicall/allbetsdetails`,
              updatedData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              //(response, "ye new pl se hai");
              
              setValue(response.data.bet_details)
              //(response);
              
        } catch (error) {
            //(error);
            //(error);
            
        }
    }
    useEffect(()=>{
        fetchprofitlossevent()
    },[])
  // Sample data including the commission and remarks columns
  
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  

  return (
<div className="max-w-4xl mx-auto">
  <div className="bg-gray-700 text-white p-3 font-bold">
    Bet History
  </div>

  <div className="flex justify-end my-2">
    <button className="bg-blue-300 px-4 py-1 mr-1">Back</button>
    <button className="bg-pink-300 px-4 py-1 mr-1">Lay</button>
    <button className="bg-white border px-4 py-1">Void</button>
  </div>

  {/* Horizontal scroll wrapper */}
  <div className="w-full overflow-x-auto">
    <div className="min-w-[800px]">
      <div className="flex bg-gray-200">
        <div className="w-1/6 p-3 font-bold border-r border-gray-300">
          Sport Name
        </div>
        <div className="w-1/4 p-3 font-bold border-r border-gray-300">
          Event Name
        </div>
        <div className="w-1/6 p-3 font-bold border-r border-gray-300">
          Market
        </div>
        <div className="w-1/6 p-3 font-bold border-r border-gray-300">
          Date
        </div>
        <div className="w-1/12 p-3 font-bold border-r border-gray-300">
          Time
        </div>
        <div className="w-1/12 p-3 font-bold">
          Win
        </div>
      </div>

      {value?.map((bet, index) => (
        <div
          key={index}
          className={`flex ${bet.back === "back" ? 'bg-red-200' : 'bg-blue-100'}`}
        >
          <div className="w-1/6 p-3 border-r border-gray-300">
            {gtype}
          </div>
          <div className="w-1/4 p-3 border-r border-gray-300">
            {bet.bet_type}
          </div>
          <div className="w-1/6 p-3 border-r border-gray-300">
            {bet.betvalue}
          </div>
          <div className="w-1/6 p-3 border-r border-gray-300">
            {bet.bet_rate}
          </div>
          <div className="w-1/12 p-3 border-r border-gray-300">
            {bet.bet_id}
          </div>
          <div className="w-1/12 p-3">
            {bet.created_at}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default NewProfitLoss;