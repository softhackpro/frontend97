import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import RollingCommisionPopup from "./rollingCommisionPopup";
import ChnagePasswordPopup from "./ChnagePasswordPopup";
import axios from "axios";

const AccountDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    commission: "",
    rollingCommission: "0",
    exposureLimit: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("user"));
      const user_id = data.user_id;
      // console.log(user_id)
      try {
        const result = await axios.post(
          "https://admin.titan97.live/Apicall/myprofile",
          {
            user_id: user_id,
          }
        );
        console.log(result);
        setUserData((prev) => ({
          ...prev,
          name: result.data.profile_info.user_id,
          commission: result.data.profile_info.match_commission,
          exposureLimit: result.data.profile_info.min_sports_exp,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="bg-gray-800 text-white text-lg font-semibold p-3">
          Account Details
        </div>
        <div className="p-4">
          <div className="mb-3 border-b pb-2">
            <p className="text-sm font-semibold">Name</p>
            <p className="text-gray-700">{userData.name}</p>
          </div>
          <div className="mb-3 border-b pb-2">
            <p className="text-sm font-semibold">Commission</p>
            <p className="text-gray-700">{userData.commission}</p>
          </div>
          <div className="mb-3 border-b pb-2">
            <p className="text-sm font-semibold">Rolling Commission</p>
            <AiFillEye
              className="text-xl text-gray-700"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div className="mb-3 border-b pb-2">
            <p className="text-sm font-semibold">Exposure Limit</p>
            <p className="text-gray-700">{userData.exposureLimit}</p>
          </div>
          <div className="mb-3 border-b pb-2 flex items-center">
            <p className="text-sm font-semibold">Password</p>
          </div>
          <div className="mb-3 border-b pb-2 flex items-center gap-2">
            <p className="text-gray-700">********</p>
            <button className="flex items-center">
              Edit{" "}
              <FiEdit className="ml-1" onClick={() => setModalOpen(true)} />
            </button>
          </div>
        </div>
      </div>

      <RollingCommisionPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {modalOpen && <ChnagePasswordPopup onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default AccountDetails;
