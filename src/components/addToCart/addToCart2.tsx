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


export default function AddTOoWishlist({productId}:{productId:string}) {
  const {getCart , setCartData}=useContext(CartContext)
  const [loading,setIsLoading]=useState(false)
  const [loading2,setIsLoading2]=useState(false)
  const [belong,setIsBelong]=useState<string|null>(null)
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
 
  return <>
  <CardFooter className=' mt-2'>
    <Button onClick={addToCart} className='grow'> {loading? <Loader className='animate-spin'/> : <ShoppingCartIcon/>} Add To Cart</Button>

  </CardFooter>
  </>
}
