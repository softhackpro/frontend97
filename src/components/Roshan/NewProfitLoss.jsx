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
    const fetchprofitlossevent = async() => {
        
        try {
            const response = await axios.post(`https://admin.titan97.live/Apicall/allbetsdetails`,
                requestData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              
              setValue(response.data.bet_details)
              console.log(response);
              
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        fetchprofitlossevent()
    },[])
  // Sample data including the commission and remarks columns
  
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="bg-gray-700 text-white p-3 font-bold">
        Profit/Loss Events
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
        <div className="flex items-center mb-2 sm:mb-0">
          <span className="mr-2">Show</span>
          <select 
            className="border rounded px-2 py-1"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">Search:</span>
          <input 
            type="text" 
            className="border rounded p-1 w-48"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left font-bold">
                Sport Name
                <span className="ml-1">▲</span>
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
                Event Name
                <span className="ml-1 text-gray-400">↕</span>
              </th>
              <th className="border border-gray-300 p-2 text-center font-bold">
                Market Name
              </th>
              <th className="border border-gray-300 p-2 text-center font-bold">
                Result
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
               Profit/Loss
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
               Commision
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold">
               Settle Time
              </th>
            </tr>
          </thead>
          <tbody>
            {value?.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border border-gray-300 p-2">{gtype}</td>
                <td className="border border-gray-300 p-2">
                  <Link to={`/profitlossmarkets/${item.game_name}`} className="text-blue-500 hover:underline">{item.game_name}</Link>
                </td>
                
                <td className="border border-gray-300 p-2 text-right">
                  {item.round_id }
                </td>
                <td className="border border-gray-300 p-2">
                  {item.result ? item.result : 0}
                </td>
                <td className={`border border-gray-300 p-2 text-right ${parseFloat(item.net_profit_loss) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {item.profit_loss ? item.profit_loss: item.net_profit_loss}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {item.commision ? item.commision : 0}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {item.time ? item.time : "Date"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewProfitLoss;