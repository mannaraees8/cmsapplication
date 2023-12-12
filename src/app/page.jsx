"use client";
import Image from 'next/image';
import './globals.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from './state/atoms/userState';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import CustomerDetailForm from './components/CustomerDetailForm';
import jwt from 'jsonwebtoken'
import CreateCustomer from './components/CreateCustomer';

export default function Home() {
  const [email,setEmail] = useRecoilState(userState);
  const [showDetails,setShowDetails] = useState(false);
  const [showCreateCustomer,setShowCreateCustomer] = useState(false);
  const router = useRouter();
  const [customer,setCustomer]=useState([])
  const [editCustomer,setEditCustomer] = useState({})
  const [showSideBar,setShowSideBar] = useState(true)

  useLayoutEffect(()=>{
   const token=localStorage.getItem('token');
   
   if(token){
     const decodedToken = jwt.decode(token, token);
    const isExpired = decodedToken.exp < Date.now() / 1000;
    if(isExpired){
     localStorage.removeItem('token')
     router.push("/login");
    }else{
      const email=localStorage.getItem('email');
      setEmail(email);
    }
   const fetchUsers=async()=>{
    await getAllCustomer()
   }
   fetchUsers()
   }else{
    localStorage.removeItem('token')
    router.push("/login");
   }
  },[showDetails==true,showCreateCustomer==true])

  const getAllCustomer=async()=>{
    const token=localStorage.getItem('token');
    const response = await axios.post("/api/customer", { token });
    setCustomer(response.data);
 
  }
  const showCustomer=(customer)=>{
    setEditCustomer(customer)
    setShowDetails(true)
  }
  const deleteCustomer=async(id)=>{
    const token=localStorage.getItem('token');
    try{
      const response = await axios.post("/api/customer/delete",{ token,id });
      if(response?.status==200){
        alert("Customer deleted successfully")
      }
      await getAllCustomer()
    }catch{
      alert("Error")
    }
  }
  return (
    <div className="flex flex-col w-screen max-w-[100%]  h-screen ">
      <div className="header flex font-bold justify-between p-3 px-9 bg-blue-900 text-white">
        <div className="flex justify-center items-center gap-3">
        <h1 className="text-2xl">CMS</h1>
           <button
           className=" text-white text-3xl block xl:hidden"
           onClick={() => setShowSideBar(!showSideBar)}>
            {showSideBar?(<>&#x2715;</>):(<> &#8801;</>)}
         </button>
        </div>
        <div className="flex justify-center items-center gap-2">
        <span>{email}</span>
        <button className='border-[2px] border-white p-1 rounded' onClick={()=>{localStorage.removeItem('token');router.push("/login");}}>Logout</button>
        </div>
      </div>
      <div className=" w-full h-full flex">
        <div className={`w-full  absolute xl:relative ${showSideBar?'ml-0':'ml-[-250px]'}  xl:ml-0 xl:left-0 max-w-[250px] h-full flex flex-col items-center bg-white`}>
       
          <Image alt='profile' src={"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} width={150} height={150}></Image>
          <div className='w-[90%]'>
          <hr/>
          <div>&nbsp;</div>
          </div>
            <Link className="w-[90%] rounded-md text-center p-2 font-semibold hover:bg-blue-700 text-white bg-blue-500 transition duration-200" href={"/"}>
                Customer
            </Link>
        </div>
          <div className="w-[95%] h-[95%] bg-white m-5 p-5" >
            <div className="w-full text-right">
              <button className=" bg-blue-500 p-1 rounded text-white m-2 text-sm w-[80px]" onClick={()=>setShowCreateCustomer(true)}>Create</button>
            </div>
            <div className="bg-white  overflow-auto w-full h-[95%]">
            <table className="shadow-md rounded mb-4 w-full bg-white">
              <thead className="bg-blue-900 text-white">
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
                {customer.length >0 && customer?.map((item,index)=>(
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
                    <button className="bg-blue-500 rounded p-1 w-[80px] text-white text-sm" onClick={()=>deleteCustomer(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {customer.length==0 && (
                  <tr>
                    <td colSpan="11" className="text-center text-md p-2 text-black">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
      </div>
      {showDetails &&(
        <>
      <div className="fixed right-0 left-0 bottom-0 top-0 w-full h-full  bg-[#2b2a2a85]"></div>
      <CustomerDetailForm customer={editCustomer} setShowDetails={setShowDetails} />
      </>
      )}

      {showCreateCustomer &&(
        <>
      <div className="fixed right-0 left-0 bottom-0 top-0 w-full h-full  bg-[#2b2a2a85]"></div>
      <CreateCustomer  setShowCreateCustomer={setShowCreateCustomer} />
      </>
      )}
    </div>
  );
}
