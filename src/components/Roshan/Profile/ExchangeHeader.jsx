import { MdOutlineAccountCircle } from "react-icons/md"
import MenuList from './MenuList'
const ExchangeHeader = () => {
  return (
    <>
    <div className="bg-blue-900 text-white px-4 py-2 flex items-center space-x-2 shadow-md">
      <MdOutlineAccountCircle className="text-white text-lg" />
      <span className="text-lg font-semibold">exchange</span>
    </div>
    <MenuList />
    </>
    
  );
};

export default ExchangeHeader;
