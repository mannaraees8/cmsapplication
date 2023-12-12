"use client";
import React, { useEffect, useState } from "react";

function CustomerDetailForm({ customer, setShowDetails }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (customer) {
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmail(customer.email);
      setAddress(customer.address);
      setCity(customer.city);
      setCountry(customer.country);
      setPhone(customer.phone);
    }
  }, []);
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 m-auto w-full h-full shadow-xl border-[1px] p-5 bg-white text-black flex flex-col  items-center max-w-[500px] max-h-[500px]">
      <button
        className="absolute right-[20px]"
        onClick={() => setShowDetails(false)}>
        &#x2715;
      </button>
      <div className="w-full">
        <h2 className="text-xl my-2">Edit Details</h2>
        <hr />
      </div>
      <div className="flex gap-7 mt-5">
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            className="border-[1px] bg-gray-100 px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            className="border-[1px] bg-gray-100 px-2 py-1 rounded"
          />
        </div>
      </div>
      <div className="flex gap-7 mt-5">
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="text"
            value={email}
            className="border-[1px] bg-gray-100 px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            className="border-[1px] bg-gray-100 px-2 py-1 rounded"
          />
        </div>
      </div>

      <div className="flex gap-7 mt-5">
        <div className="flex flex-col">
          <label>Country</label>
          <input
            type="text"
            value={country}
            className="border-[1px] bg-gray-100 px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>City</label>
          <input
            type="text"
            value={city}
            className="border-[1px] bg-gray-100 px-2 py-1 rounded"
          />
        </div>
      </div>
      <div className="flex flex-start gap-7 mt-5">
        <div className="flex flex-col">
          <label>Address</label>
          <input
            type="text"
            value={address}
            className="border-[1px] bg-gray-100 px-2 py-1 rounded"
          />
        </div>
      </div>
      <button className=" bg-green-600 text-white p-1 w-[100px] text-center font-semibold rounded mt-5">
        Update
      </button>
    </div>
  );
}

export default CustomerDetailForm;
