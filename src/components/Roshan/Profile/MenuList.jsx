
import { FaSignOutAlt } from 'react-icons/fa';
import ListItem from '../../ListItem';
import { useContext } from 'react';
import { AuthContext } from '../../../services/auth/auth.context';

const MenuList = () => {
      const {  onLogout } = useContext(AuthContext);
    // Sample menu items. You can replace this with your own menu items data.
    const menuItems = [
      "My Profile",
      "Multi Markets",
      "Rolling Commission",
      "Account Statement",
      "Bets History",
      "Profit & Loss",
      "Password History",
      "Activity Log",
    ];
  
    return (
      <div className="bg-white shadow-md rounded-md overflow-hidden mb-[50px] pb-[60px]">
        {menuItems.map((item, index) => (
           <ListItem item={item} key={index} classname={"text-blue-700 font-semibold"}/>
        //   <MenuItem key={index} title={item} />
        ))}
      
          <button onClick={onLogout} className="w-full bg-red-600 text-white py-2 text-lg font-bold flex items-center justify-center space-x-2 shadow-md hover:bg-red-700">
            <span>LOGOUT</span>
            <FaSignOutAlt />
          </button>
       
      </div>
    );
  };

  export default MenuList;