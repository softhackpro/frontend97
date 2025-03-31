import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/auth/auth.context";

const ExposureDetailPopup = ({ isOpen, onClose, userId }) => {
  if (!isOpen) {
    return null;
  }

  const { user } = useContext(AuthContext);
  const [data, setData] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/openBetHistory",
        { user_id: user?.user_id }
      );
      setData(response.data.data);
    } catch (error) {
      // //(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [user]);

  return (
    <div className="fixed top-0 z-50 text-black text-sm left-0 w-screen h-full flex items-start justify-center bg-opacity-50 overflow-hidden">
      <div className="bg-white rounded shadow-lg w-screen md:w-full md:max-w-lg max-h-screen overflow-hidden flex flex-col">
        {/* Header - fixed at top */}
        <div className="bg-blue-800 text-white p-2 flex justify-between items-center sticky top-0">
          <h2 className="text-lg font-medium">Exposure Detail</h2>
          <button
            onClick={onClose}
            className="text-white text-3xl cursor-pointer font-bold"
          >
            &times;
          </button>
        </div>

        {/* Table Container with Scroll */}
        <div className="p-4 overflow-y-auto flex-grow max-h-[80vh]">
          <div className="w-full overflow-x-hidden">
            <table className="w-full border-collapse table-auto">
              <thead className="sticky top-0">
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">
                    Sport Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Event Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Market Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Trade
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((d, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 text-center break-words">
                        {d.gtype}
                      </td>
                      <td className="border border-gray-300 p-2 text-center break-words">
                        {d.bet_name}
                      </td>
                      <td className="border border-gray-300 p-2 text-center break-words whitespace-normal">
                        {d.selection_id}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {d.bet_type}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExposureDetailPopup;
