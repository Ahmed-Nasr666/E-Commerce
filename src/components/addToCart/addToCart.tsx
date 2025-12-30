'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader, ShoppingCartIcon } from 'lucide-react'
import { json } from 'node:stream/consumers'
import { ProductI } from '@/interface'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/app/(pages)/loading'
import { addToWishlistAction } from '@/app/(pages)/products/_action/addToWishlist.action'
import { WishlistContext } from '../context/wishlistContext'
import { getUserToken } from '@/Helpers/getUserToken'
import { WishlistResponse } from '@/interface/wishlist'


export default function AddToCart({productId}:{productId:string}) {
  const {getCart , setCartData}=useContext(CartContext)
  const {getWishlist ,wishlistData, setWishlistData}=useContext(WishlistContext)
  const [loading,setIsLoading]=useState(false)
  const [loading2,setIsLoading2]=useState(false)
  const [belong,setIsBelong]=useState<string|null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [removingId,setRemovingId] = useState<null|string>(null)
  const session = useSession()
  const router = useRouter()


 async function addToCart() {
  if(session.status=="authenticated"){
    setIsLoading(true)
  const data = await addToCartAction(productId)
  data.status=="success" && toast.success('product added successfully..')
  setCartData(data)
  
  setIsLoading(false)
  
  }else{
    router.push('/login')
  }
 }
   async function removeWishlistItem(productId:string){
        const token = await getUserToken()
    setRemovingId(productId)

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/'+productId,{
      method:'DELETE',
      headers:{
        token: token!
      }
    })

    const data:WishlistResponse = await response.json()
    toast.success("product removed Successfuly")
    

    if(data.status=="success"){
      getWishlist()
    }
    setRemovingId(null)
  }
//  async function addToWishlist() {
//   if(session.status=="authenticated"){
//     setIsLoading2(true)
    
//   const data = await addToWishlistAction(productId)
 
//  if (data.status === "success") {
//       toast.success(
//         isWishlisted
//           ? "product removed from wishlist"
//           : "product added to wishlist"
//       );

//       setIsWishlisted(!isWishlisted);
//       getWishlist();
//     }
//   setIsLoading2(false)
 
//   }else{
//     router.push('/login')
//   }
//  }
 async function toggleWishlist() {
  if (session.status !== "authenticated") {
    router.push("/login");
    return;
  }

  setIsLoading2(true);

  if (isWishlisted) {
   
    await removeWishlistItem(productId);
    setIsWishlisted(false); 
  } else {
    
    const data = await addToWishlistAction(productId);
    if (data.status === "success") {
      setIsWishlisted(true); 
      toast.success("Product added to wishlist");
    }
  }

  getWishlist(); 
  setIsLoading2(false);
}

  return <>
  <CardFooter className='gap-2 mt-2'>
    <Button onClick={addToCart} className='grow'> {loading? <Loader className='animate-spin'/> : <ShoppingCartIcon/>} Add To Cart</Button>
   <button className='cursor-pointer' onClick={toggleWishlist}>
  {loading2 ? <Loader className='animate-spin' /> : 
    <HeartIcon
      className={`transition ${isWishlisted ? "text-black fill-black" : "text-gray-400"}`}
    />
  }
</button>

  </CardFooter>
  </>
}
