// "use client"

// import { getUserToken } from "@/Helpers/getUserToken";
// import { WishlistResponse } from "@/interface/wishlist";
// import { createContext, ReactNode, useEffect, useState } from "react";

// export const WishlistContext = createContext<{
//     wishlistData: WishlistResponse|null,
//     setWishlistData: (value: WishlistResponse|null)=> void,
//     isLoading2: boolean,
//     setIsLoading2: (value: boolean)=> void
//     getWishlist: ()=> void
    
// }>({
//     wishlistData:null,
//     setWishlistData:()=>{ },
//     isLoading2:false,
//     setIsLoading2:()=>{ },
//     getWishlist: ()=> {}
    
// })

// export default function WishlistContextProvider({children}:{children:ReactNode}){
//     let [wishlistData,setWishlistData] = useState<WishlistResponse|null>(null)
//     let [isLoading2,setIsLoading2] = useState(false)
    
//     async function getWishlist() {
//          const token = await getUserToken()
//         setIsLoading2(true)
//         const response = await fetch('/api/get-wishlist')
//         const data:WishlistResponse = await response.json()
//         console.log(data);
        
//         setWishlistData(data)
  
//         setIsLoading2(false)
        
//     }

//      useEffect(()=>{
//         getWishlist()
//     },[])

//     return <WishlistContext.Provider value={{wishlistData,setWishlistData,isLoading2,setIsLoading2,getWishlist}}>
//         {children}
//     </WishlistContext.Provider>
// }

"use client"

import { getUserToken } from "@/Helpers/getUserToken";
import { WishlistResponse } from "@/interface/wishlist";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext<{
    wishlistData: WishlistResponse | null,
    setWishlistData: (value: WishlistResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getWishlist: () => void
}>({
    wishlistData: null,
    setWishlistData: () => {},
    isLoading: false,
    setIsLoading: () => {},
    getWishlist: () => {}
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
    const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getWishlist() {
        setIsLoading(true);
        const token = await getUserToken(); // استخدم لاحقًا في الهيدر إذا لزم
        const response = await fetch('/api/get-wishlist', { cache: "no-store" });
        const data: WishlistResponse = await response.json();
        setWishlistData(data);
        setIsLoading(false);
    }

    useEffect(() => {
        let mounted = true;
        getWishlist().then(() => { if (!mounted) return; });
        return () => { mounted = false; }
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlistData, setWishlistData, isLoading, setIsLoading, getWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}
