"use client"
import React, { useContext, useState } from 'react'
import CheckOutAddress from '@/components/checkOut/CheckOutAddress'
import { AddressContext } from '@/components/context/AddressContext'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Address } from '@/interface'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { getUserToken } from '@/Helpers/getUserToken'
export default function Profile() {
  const {addressData,setAddressData,isLoading,getAddress} = useContext(AddressContext)
  const [removingId,setRemovingId] = useState<null|string>(null)
  let [count,setCount]= useState(0)
  const validAddresses =
  addressData?.data?.filter(
    (address) =>
      address.name?.trim() &&
      address.details?.trim() &&
      address.city?.trim() &&
      address.phone?.trim()
  ) || [];
  async function removeAddress(addressId:string){
   
    setRemovingId(addressId)
    const token = await getUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses/'+addressId,{
      method:'DELETE',
      headers:{
        token: token!
      }
    })

    const data:Address = await response.json()
    toast.success("address removed Successfuly")
    

    if(data.status=="success"){
      getAddress()
    }
    setRemovingId(null)
  }
  
  return <>
  <div className='container mx-auto py-6 px-4'>
    <h1 className='my-4'>Profile</h1>
    <div className='w-6xl'>
      <div className='flex justify-between items-center'>
        <h2 className='pt-3'>Your Acounts</h2>
        <CheckOutAddress/>
      </div>
    </div>
     {validAddresses.length === 0 ? (
  <div className="flex justify-center items-center h-[60vh]">
    <p className="text-lg text-muted-foreground">
      Not found addresses
    </p>
  </div>
) : (
  validAddresses.map((address, index) => (
    <div key={address._id}>
      <Card className="ps-5 my-3 pe-6">
        <div className='flex justify-between'>
          <h1>Address # {index + 1}</h1>
          <button onClick={()=>removeAddress(address._id)} className="text-red-500 text-sm mt-4 flex items-center gap-1 cursor-pointer hover:text-red-700">
                  {removingId==address._id? <Loader className="animate-spin"/>:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>}
                  Remove
                </button>

        </div>

        <p>Name : {address.name}</p>
        <p>Details : {address.details}</p>
        <p>City : {address.city}</p>
        <p>Phone : {address.phone}</p>
      </Card>
    </div>
  ))
)}

      
  
  </div>
  </>
}
