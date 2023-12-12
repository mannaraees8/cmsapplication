"use client";
import Image from 'next/image';
import './globals.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from './state/atoms/userState';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import CustomerDetailForm from './components/CustomerDetailForm';
import jwt from 'jsonwebtoken'

export default function Home() {
  const [email,setEmail] = useRecoilState(userState);
  const [showDetails,setShowDetails] = useState(false);
  const router = useRouter();
  const [customer,setCustomer]=useState([])
  const [editCustomer,setEditCustomer] = useState({})

  useEffect(()=>{
   const token=localStorage.getItem('token');
   const decodedToken = jwt.decode(token, token);
   const isExpired = decodedToken.exp < Date.now() / 1000;
   if(isExpired){
    localStorage.removeItem('token')
    router.push("/login");
   }
   if(token){
     const email=localStorage.getItem('email');
   setEmail(email);
   const fetchUsers=async()=>{
    await getAllCustomer()
   }
   fetchUsers()
   }else{
   }
  },[])

  const getAllCustomer=async()=>{
    const token=localStorage.getItem('token');
    const response = await axios.post("/api/customer", { token });
    setCustomer(response.data);
 
  }
  const showCustomer=(customer)=>{
    setEditCustomer(customer)
    setShowDetails(true)
  }
  return (
    <div className="flex flex-col w-screen max-w-[100%]  h-screen  ">
      <div className="header flex font-bold justify-between p-3 bg-blue-900 text-white">
        <h1 className="text-2xl">CMS</h1>
        <span>{email}</span>
      </div>
      <div className=" w-full h-full flex">
        <div className="w-full max-w-[250px] h-full flex flex-col items-center bg-white">
          <Image src={"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} width={150} height={150}></Image>
          <div className='w-[90%]'>
          <hr/>
          <div>&nbsp;</div>
          </div>
            <Link className="w-[90%] rounded-md text-center p-2 font-semibold hover:bg-blue-700 text-white bg-blue-500 transition duration-200" href={"/"}>
                Customer
            </Link>
        </div>
      <div className="w-full h-[95%] bg-white m-5 overflow-auto p-5" >
        <div className="w-full text-right">
          <button className=" bg-blue-500 p-1 rounded text-white m-2 text-sm" onClick={()=>showCustomer()}>Create</button>
        </div>
        <table className="shadow-md rounded mb-4 w-full bg-white">
          <thead class="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700">First Name</th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700">Last Name</th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700">Email</th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700">Address</th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700">Phone</th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700">City</th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700">Country</th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700"></th>
              <th className="py-2 px-6 text-sm border-b-2 border-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {customer.length>0 && customer?.map((item,index)=>(
              <tr key={index}>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> {item.firstName}</td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> {item.lastName}</td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> {item.email}</td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> {item.address}</td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> {item.phone}</td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> {item.city}</td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> {item.country}</td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> 
                <button className="bg-blue-500 rounded p-1 w-[80px] text-white text-sm"  onClick={()=>showCustomer(item)}>Edit</button>
                </td>
                <td className="py-1 px-6 border-b-2 text-black border-gray-700"> 
                <button className="bg-blue-500 rounded p-1 w-[80px] text-white text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      {showDetails &&(
      <CustomerDetailForm customer={editCustomer} setShowDetails={setShowDetails} />
      )}
    </div>
  );
}
