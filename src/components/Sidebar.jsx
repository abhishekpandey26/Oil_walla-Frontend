import React from "react";
import { TiHome } from "react-icons/ti";
import { PiShoppingCartSimple } from "react-icons/pi";

function Sidebar() {
  return (
    <div className="sidebar w-[18%] h-screen fixed">
      <div className="text-[#4F4F4F] font-bold m-8">MAIN MENU</div>
      <div className="flex items-center m-12 gap-4">
        <button className="text-[#4F4F4F] text-xl font-bold">
          <TiHome />
        </button>
        <button className="text-[#4F4F4F] font-bold">
          <h1>Home</h1>
        </button>
      </div>
      <div className="flex items-center m-12 gap-4">
        <button className="text-[#4F4F4F] text-xl font-bold">
          <PiShoppingCartSimple />
        </button>
        <button className="text-[#4F4F4F] font-bold">
          <h1>Products</h1>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
