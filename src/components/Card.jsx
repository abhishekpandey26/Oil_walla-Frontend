import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";

function Home({ data, setCount, isLoggedIn, setCartItems }) {
  const navigate = useNavigate();

  const handleCart = (item) => {
    setCount((prev) => prev + 1);
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );
  
      if (existingItem) {
        // If item exists, increment its quantity and update the price
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                price: cartItem.price + item.amount, // Update price
              }
            : cartItem
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevCartItems, { ...item, quantity: 1, price: item.amount }];
      }
    });
  
    toast.success("Added to Cart!");
  };
  

  return (
    <div className="p-4 md:ml-[18%] mt-20">
      {/* Grid Container for Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-[350px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Image Section */}
            <img
              className="w-full h-56 object-cover"
              src={item.image}
              alt={item.name}
            />

            {/* Content Section */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 mt-2">Price: ₹{item.price}</p>

              {/* Button Section */}
              <button
                className={`mt-4 w-full flex items-center justify-center gap-4 ${
                  item.added ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 rounded-full`}
                onClick={() => handleCart(item)}
                disabled={item.added}
              >
                <HiOutlineShoppingBag className="text-white text-2xl " />

                {item.added ? "Added to Bag" : "Add to Bag"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
