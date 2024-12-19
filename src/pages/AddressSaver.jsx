/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddressSaver = ({
  setAddressSaved,
  addressSaved,
  setAddress,
  address,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    if (name === "pinCode" && value.length === 6) {
      fetchCityAndState(value);
    }
  };

  const fetchCityAndState = async (pinCode) => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );
      const data = await response.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setAddress((prev) => ({
          ...prev,
          city: postOffice.District,
          state: postOffice.State,
        }));
      } else {
        alert("Invalid pin code. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching city and state:", error);
      alert("Unable to fetch location details. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSaveAddress = async () => {
    const { name, mobileNumber, pinCode, houseAddress, locality, city, state } =
      address;

    if (
      name &&
      mobileNumber &&
      pinCode &&
      houseAddress &&
      locality &&
      city &&
      state
    ) {
      setIsFetching(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/address/save",
          address
        );
        console.log(response.data);
        setAddressSaved(true);
        navigate("/cart");
      } catch (error) {
        console.error("Error saving address:", error);
        alert("Failed to save address. Please try again.");
      } finally {
        setIsFetching(false);
      }
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg sm:max-w-lg mt-16 md:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
          Add New Address
        </h2>
        {!addressSaved ? (
          <>
            <h3 className="text-lg font-semibold mb-3 text-pink-600">
              Contact Details
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={address.name}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number*"
              maxLength={10}
              value={address.mobileNumber}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <h3 className="text-lg font-semibold mb-3 text-pink-600">
              Address
            </h3>
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code*"
              maxLength={6}
              value={address.pinCode}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              name="houseAddress"
              placeholder="Address (House No, Building, Street, Area)*"
              value={address.houseAddress}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              name="locality"
              placeholder="Locality / Town*"
              value={address.locality}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="city"
                placeholder="City / District*"
                value={address.city}
                onChange={handleChange}
                className="flex-1 p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none"
                readOnly
              />
              <input
                type="text"
                name="state"
                placeholder="State*"
                value={address.state}
                onChange={handleChange}
                className="flex-1 p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none"
                readOnly
              />
            </div>
            <button
              onClick={handleSaveAddress}
              disabled={isFetching}
              className={`w-full py-2 rounded-lg ${
                isFetching ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
              } transition text-white`}
            >
              {isFetching ? "Saving..." : "Add Address"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-pink-600">
              Address Saved!
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Name:</strong> {address.name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Mobile:</strong> {address.mobileNumber}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>House Address:</strong> {address.houseAddress}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Locality:</strong> {address.locality}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>City:</strong> {address.city}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>State:</strong> {address.state}
            </p>
            <p className="text-gray-600">
              <strong>Pin Code:</strong> {address.pinCode}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSaver;
