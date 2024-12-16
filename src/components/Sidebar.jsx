import React from "react";
import { TiHome } from "react-icons/ti";
import { PiShoppingCartSimple } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
function Sidebar({ isOpen, toggleSidebar, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  // Logout functionality
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
    // Set login status to false
    toggleSidebar(); // Close the sidebar
  };

  return (
    <div
      className={`fixed left-0 top-0 bg-[#E8F1FD] w-[70%] md:w-[18%] h-full transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Sidebar Content */}
      <div className="text-[#4F4F4F] font-bold m-8 mt-16">MAIN MENU</div>

      {/* Menu Items */}
      <div className="flex items-center m-12 gap-4">
        <TiHome className="text-[#4F4F4F] text-xl" />
        <NavLink to="/" onClick={toggleSidebar}>
          <h1 className="text-[#4F4F4F] font-bold">Home</h1>
        </NavLink>
      </div>

      <div className="flex items-center m-12 gap-4">
      <HiOutlineShoppingBag className="text-[#4F4F4F] text-xl" />
        
        <NavLink to="/" onClick={toggleSidebar}>
          <h1 className="text-[#4F4F4F] font-bold">Products</h1>
        </NavLink>
      </div>

      {/* Logout Button (Visible only on mobile screens) */}
      {isLoggedIn && (
        <div className="flex flex-col gap-4 mt-12 px-4 md:hidden">
          <button
            onClick={handleLogout}
            className="text-white px-4 py-2 rounded-full bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
