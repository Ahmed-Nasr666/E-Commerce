"use client"

import { getUserToken } from "@/Helpers/getUserToken";
import { WishlistResponse } from "@/interface/wishlist";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext<{
    wishlistData: WishlistResponse|null,
    setWishlistData: (value: WishlistResponse|null)=> void,
    isLoading2: boolean,
    setIsLoading2: (value: boolean)=> void
    getWishlist: ()=> void
    
}>({
    wishlistData:null,
    setWishlistData:()=>{ },
    isLoading2:false,
    setIsLoading2:()=>{ },
    getWishlist: ()=> {}
    
})

export default function WishlistContextProvider({children}:{children:ReactNode}){
    let [wishlistData,setWishlistData] = useState<WishlistResponse|null>(null)
    let [isLoading2,setIsLoading2] = useState(false)
    
    async function getWishlist() {
         const token = await getUserToken()
        setIsLoading2(true)
        const response = await fetch('/api/get-wishlist')
        const data:WishlistResponse = await response.json()
        console.log(data);
        
        setWishlistData(data)
  
        setIsLoading2(false)
        
    }

     useEffect(()=>{
        getWishlist()
    },[])

    return <WishlistContext.Provider value={{wishlistData,setWishlistData,isLoading2,setIsLoading2,getWishlist}}>
        {children}
    </WishlistContext.Provider>
}

