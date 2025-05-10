import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contect from "./pages/Contect";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TermsAndConditions from "./pages/TermsAndConditions";
import AddressSaver from "./pages/AddressSaver";

function App() {
  const Raw = [
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2024/12/Adivasi-Originals-Organic-Herbal-Hair-Oil-Photo-1-scaled-0x0.webp",
      name: "Adivasi Hair Oil",
      price: 2000,
      added: false,
      id: 1,
      quantity: 1,
      amount: 2000,
    },
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2025/02/Aivasi-Hair-Oil-Photos-0x0.webp",
      name: "Adivasi Hair Oil",
      price: 1500,
      added: false,
      id: 2,
      quantity: 1,
      amount: 1500,
    },
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2024/09/produt-photo-1-0x0.webp",
      name: "Adivasi Hair Oil",
      price: 1000,
      added: false,
      id: 3,
      quantity: 1,
      amount: 1000,
    },
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2024/04/Hair-Oil-Product-Slide-3-scaled-0x0.webp",
      name: "Adivasi Hair Oil",
      price: 1000,
      added: false,
      id: 4,
      quantity: 1,
      amount: 1000,
    },
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2024/04/Hair-Oil-Product-Slide-2-scaled-0x0.webp",
      name: "Adivasi Hair Oil",
      price: 1000,
      added: false,
      id: 5,
      quantity: 1,
      amount: 1000,
    },
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2024/07/Adivasi-Originals-Hair-Oil-Photo-26.jpeg",
      name: "Adivasi Hair Oil",
      price: 2000,
      added: false,
      id: 6,
      quantity: 1,
      amount: 2000,
    },
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2024/07/Adivasi-Originals-Hair-Oil-Photo-5.jpeg",
      name: "Adivasi Hair Oil",
      price: 1500,
      added: false,
      id: 7,
      quantity: 1,
      amount: 1500,
    },
    {
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/hair-oil/n/o/4/250-neelgiri-herbal-hair-oil-hair-growth-hair-oil-adivasi-original-imah3mwjgbqm4kvq.jpeg?q=70",
      name: "Adivasi Hair Oil",
      price: 1200,
      added: false,
      id: 8,
      quantity: 1,
      amount: 1200,
    },
    {
      image:
        "https://adivasioriginals.com/wp-content/uploads/2024/07/Adivasi-Originals-Hair-Oil-Photo-6.jpeg",
      name: "Adivasi Hair Oil",
      price: 1000,
      added: false,
      id: 9,
      quantity: 1,
      amount: 1000,
    },

    // Add more items as needed
  ];

  // States
  const [data, setData] = useState(Raw); // Product data
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User login status
  const [cartItems, setCartItems] = useState([]); // Cart items state
  const [count, setCount] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    houseAddress: "",
    locality: "",
    city: "",
    state: "",
  });
  console.log(address);
  // Sidebar toggle function
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]); // Clear cart on logout
  };

  // Function to add item to the cart
  const addToCart = (item) => {
    setCartItems((prevCart) => [...prevCart, item]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar
          setAddressSaved={setAddressSaved}
          toggleSidebar={toggleSidebar}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          cartItems={cartItems}
          count={count}
          handleLogout={handleLogout}
        />

        {/* Content Area */}
        <div className="flex flex-1 flex-col bg-gray-100">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  data={data}
                  setCount={setCount}
                  isLoggedIn={isLoggedIn}
                  addToCart={addToCart}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contect />} />
            <Route
              path="/cart"
              element={
                <Cart
                  setCartItems={setCartItems}
                  setCount={setCount}
                  address={address}
                  addressSaved={addressSaved}
                  setAddressSaved={setAddressSaved}
                  cartItems={cartItems}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/term" element={<TermsAndConditions />} />
            <Route
              path="/address"
              element={
                <AddressSaver
                  address={address}
                  setAddress={setAddress}
                  addressSaved={addressSaved}
                  setAddressSaved={setAddressSaved}
                ></AddressSaver>
              }
            />
          </Routes>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
