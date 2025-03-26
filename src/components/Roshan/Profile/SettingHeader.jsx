import { FaCog } from "react-icons/fa";
import ThemeSelector from './ThemeSelector'
import StakeSelector from './StakeSelector'
export default function SettingHeader() {
  return (<>
     <div className="bg-red-600 text-black font-bold text-lg flex items-center px-4 py-2 border-b-4 border-gray-700">
      <FaCog className="mr-2" />
      <span>Setting</span>
    </div>
    <ThemeSelector />
    <StakeSelector />
  </>
    
  );
}
