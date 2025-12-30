"use client"
import { getUserToken } from "@/Helpers/getUserToken";
import {  Address } from "@/interface";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export const AddressContext = createContext<{
    addressData: Address|null,
    setAddressData: (value: Address|null)=> void,
    isLoading: boolean,
    setIsLoading: (value: boolean)=> void
    getAddress: ()=> void
    
}>({
    addressData:null,
    setAddressData:()=>{ },
    isLoading:false,
    setIsLoading:()=>{ },
    getAddress: ()=> {}
    
})

export default function AddressContextProvider({children}:{children:ReactNode}){
    let [addressData,setAddressData] = useState<Address|null>(null)
    let [isLoading,setIsLoading] = useState(false)

    async function getAddress() {
        setIsLoading(true)
        const token = await getUserToken()
         const response = await fetch(`/api/addresses`)
        const data:Address = await response.json()
        console.log(data);
        
        setAddressData(data)
  
        setIsLoading(false)
        
    }

     useEffect(()=>{
        getAddress()
    },[])

    return <AddressContext.Provider value={{addressData,setAddressData,isLoading,setIsLoading,getAddress,}}>
        {children}
    </AddressContext.Provider>
}