// "use client"
// import { getUserToken } from "@/Helpers/getUserToken";
// import {  Address } from "@/interface";
// import { createContext, ReactNode, useEffect, useRef, useState } from "react";

// export const AddressContext = createContext<{
//     addressData: Address|null,
//     setAddressData: (value: Address|null)=> void,
//     isLoading: boolean,
//     setIsLoading: (value: boolean)=> void
//     getAddress: ()=> void
    
// }>({
//     addressData:null,
//     setAddressData:()=>{ },
//     isLoading:false,
//     setIsLoading:()=>{ },
//     getAddress: ()=> {}
    
// })

// export default function AddressContextProvider({children}:{children:ReactNode}){
//     let [addressData,setAddressData] = useState<Address|null>(null)
//     let [isLoading,setIsLoading] = useState(false)

//     async function getAddress() {
//         setIsLoading(true)
//         const token = await getUserToken()
//          const response = await fetch(`/api/get-address`)
//         const data:Address = await response.json()
//         console.log(data);
        
//         setAddressData(data)
  
//         setIsLoading(false)
        
//     }

//      useEffect(()=>{
//         getAddress()
//     },[])

//     return <AddressContext.Provider value={{addressData,setAddressData,isLoading,setIsLoading,getAddress,}}>
//         {children}
//     </AddressContext.Provider>
// }

"use client"
import { getUserToken } from "@/Helpers/getUserToken";
import { Address } from "@/interface";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AddressContext = createContext<{
    addressData: Address | null,
    setAddressData: (value: Address | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getAddress: () => void
}>({
    addressData: null,
    setAddressData: () => {},
    isLoading: false,
    setIsLoading: () => {},
    getAddress: () => {}
});

export default function AddressContextProvider({ children }: { children: ReactNode }) {
    const [addressData, setAddressData] = useState<Address | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getAddress() {
        setIsLoading(true);
        const token = await getUserToken(); // لو ستحتاجه لاحقًا في الهيدر
        const response = await fetch('/api/get-address', { cache: "no-store" });
        const data: Address = await response.json();
        setAddressData(data);
        setIsLoading(false);
    }

    useEffect(() => {
        let mounted = true;
        getAddress().then(() => { if (!mounted) return; });
        return () => { mounted = false; }
    }, []);

    return (
        <AddressContext.Provider value={{ addressData, setAddressData, isLoading, setIsLoading, getAddress }}>
            {children}
        </AddressContext.Provider>
    );
}
