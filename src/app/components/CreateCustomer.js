"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateCustomer({ setShowCreateCustomer }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      address,
      city,
      country,
      phone,
    };
    const token = localStorage.getItem("token");
    const response = await axios.post("/api/customer/create", {
      token,
      data,
    });
    if (response?.status == 200) {
      alert("New customer has been created.");
      setShowCreateCustomer(false);
    }
  };
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 m-auto w-full h-full rounded-xl shadow-xl border-[1px] p-5 bg-white text-black flex flex-col  items-center max-w-[500px] max-h-[500px]">
      <button
        className="absolute right-[20px]"
        onClick={() => setShowCreateCustomer(false)}>
        &#x2715;
      </button>
      <form onSubmit={handleSubmit} id="editCustomer">
        <div className="w-full">
          <h2 className="text-xl my-2 font-bold">Edit Details</h2>
          <hr />
        </div>
        <div className="flex gap-7 mt-5">
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              className="border-[1px] bg-gray-100 px-2 py-1 rounded w-full max-w-[200px]"
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              className="border-[1px] bg-gray-100 px-2 py-1 rounded w-full max-w-[200px]"
              required={true}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-7 mt-5">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="text"
              value={email}
              className="border-[1px] bg-gray-100 px-2 py-1 rounded w-full max-w-[200px]"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              className="border-[1px] bg-gray-100 px-2 py-1 rounded w-full max-w-[200px]"
              required={true}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-7 mt-5">
          <div className="flex flex-col">
            <label>Country</label>
            <input
              type="text"
              value={country}
              className="border-[1px] bg-gray-100 px-2 py-1 rounded w-full max-w-[200px]"
              required={true}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>City</label>
            <input
              type="text"
              value={city}
              className="border-[1px] bg-gray-100 px-2 py-1 rounded w-full max-w-[200px]"
              required={true}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-start gap-7 mt-5">
          <div className="flex flex-col w-full">
            <label>Address</label>
            <input
              type="text"
              value={address}
              className="border-[1px] bg-gray-100 px-2 py-1 rounded w-full "
              required={true}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5">
          <hr />
        </div>
        <div className="flex justify-center">
          <button className=" bg-green-600  text-white p-1 w-[100px] text-center font-semibold rounded mt-5 active:bg-green-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCustomer;
