"use client"
import { WishlistContext } from '@/components/context/wishlistContext'
import React, { useContext, useState } from 'react'
import { ProductI } from '@/interface'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import { Button } from '@/components/ui/button'
import { HeartIcon, HeaterIcon, Loader, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import AddToCart from '@/components/addToCart/addToCart'
import AddTOoWishlist from '@/components/addToCart/addToCart2'
import { getUserToken } from '@/Helpers/getUserToken'
import toast from 'react-hot-toast'
import { WishlistResponse } from '@/interface/wishlist'
import Loading from '../loading'

export default function page() {
    let {wishlistData,isLoading2,setWishlistData,getWishlist} =  useContext(WishlistContext)
    const [removingId,setRemovingId] = useState<null|string>(null)

      if(wishlistData==null){
    getWishlist()
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
  
  return <>
  <div className='container py-6 px-4 mx-auto'>
    <h1 className='text-3xl font-bold'>Wishlist Card</h1>
    <p className='text-muted-foreground my-2'>numofWishlistItems in your card</p>
    {isLoading2  ?<Loading/>: wishlistData?.count! >0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3'>
    {wishlistData?.data.map((product)=> <div key={product.id}>
      <Card>
        <Link href={'/products/'+product.id}>
        <CardHeader>
    <Image className='w-full' src={product?.imageCover} alt='' width={300} height={300}/>
    <CardDescription>{product?.brand?.name}</CardDescription>
    <CardTitle>{product?.title?.split(' ',2).join(' ')}</CardTitle>
    <CardDescription>{product?.category?.name}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className='flex gap-1'>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <p>({product.ratingsAverage})</p>
    </div>
  </CardContent>
        </Link>
<div className='flex items-center'>
    <AddTOoWishlist productId={product.id}/>
<Button onClick={()=>removeWishlistItem(product.id)} className="text-red-500 text-sm mt-4  flex items-center gap-1 cursor-pointer hover:text-red-700">
                  {removingId==product.id? <Loader className="animate-spin"/>:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>}
                  Remove
                </Button>
</div>
</Card>
    </div>)}
  </div>:  <div className="flex min-h-[75vh] items-center justify-center flex-col">
    <h1 className="text-2xl my-4">Your Cart is Empty.......</h1>
    <Link href={"./products"}>
    <Button>Add to Product</Button>
    </Link>
  </div>}
  
  
  </div>
                  
  </>
}

