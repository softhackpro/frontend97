
import { FaSignOutAlt } from 'react-icons/fa';
import ListItem from '../../ListItem';
import { useContext } from 'react';
import { AuthContext } from '../../../services/auth/auth.context';
import { useNavigate } from 'react-router';

const MenuList = () => {
      const {  onLogout } = useContext(AuthContext);
      const navigate= useNavigate();
    // Sample menu items. You can replace this with your own menu items data.
    const menuItems = [
      { name: "My Profile", action: () => navigate('/myProfile') },
      { name: "Multi Markets", action: () => navigate('/Multi-Markets') },
      { name: "Rolling Commission", action: () => navigate('/RollingCommision') },
      { name: "Account Statement", action: () => navigate('/AccountStmt') },
      { name: "Bets History", action: () => navigate('/BetHistory') },
      { name: "Profit & Loss", action: () => navigate('/ProfitLoss') },
      { name: "Password History", action: () => navigate('/PasswordChangeHistory') },
      { name: "Activity Log", action: () => navigate('/ActivityLog') },
    ];

    
  
    return (
      <div className="bg-white shadow-md rounded-md overflow-hidden mb-[50px] pb-[60px]">
        {menuItems.map((item, index) => (
           <ListItem item={item.name} key={index} action={item.action} classname={"text-blue-700 font-semibold"}/>
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