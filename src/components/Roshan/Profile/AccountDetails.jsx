import { FaEye, FaEdit } from "react-icons/fa";

export default function AccountDetails() {
  return (
    <div className="max-w-sm mx-auto mt-6 border rounded-md shadow-md">
      <div className="bg-gray-700 text-white font-bold p-3">Account Details</div>
      <div className="border-b p-3">
        <span className="font-bold">Name</span>
        <p>EXCHANGE</p>
      </div>
      <div className="border-b p-3">
        <span className="font-bold">Commission</span>
        <p>0</p>
      </div>
      <div className="border-b p-3 flex justify-between items-center">
        <span className="font-bold">Rolling Commission</span>
        <FaEye className="text-gray-600" />
      </div>
      <div className="border-b p-3">
        <span className="font-bold">Exposure Limit</span>
        <p>100000</p>
      </div>
      <div className="p-3 flex justify-between items-center">
        <span className="font-bold">Password</span>
        <div className="flex items-center">
          <span>********</span>
          <button className="ml-2 text-blue-600 hover:text-blue-800">
            <FaEdit />
          </button>
        </div>
      </div>
    </div>
  );
}
