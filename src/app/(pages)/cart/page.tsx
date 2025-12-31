"use client"
import { CartContext } from "@/components/context/CartContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Loading from "../loading";
import { CartResponse } from "@/interface";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CheckOut from "@/components/checkOut/CheckOut";
import { getUserToken } from "@/Helpers/getUserToken";


export default function CartPage() {
  
  let{cartData,isLoading , getCart , setCartData} = useContext(CartContext)
  let [removingId,setRemovingId] = useState<null|string>(null)
  let [updatingId,setUpdatingId] = useState<null|string>(null)
  let [isClearing,setIsClearing] = useState<boolean>(false)
  
  console.log(cartData?.cartId);
 useEffect(() => {
       if(typeof cartData?.data.products[0]?.product=="string" || cartData==null){
    getCart()
  }
    }, [])
  
  async function removeCartItem(productId:string){
   const token = await getUserToken()
    setRemovingId(productId)

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
      method:'DELETE',
      headers:{
        token: token!
      }
    })

    const data:CartResponse = await response.json()
    toast.success("product removed Successfuly")
    

    if(data.status=="success"){
      setCartData(data)
    }
    setRemovingId(null)
  }
  async function deleteCartItem(){

    const token = await getUserToken()
    setIsClearing(true)

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/',{
      method:'DELETE',
      headers:{
        token: token!
      }
    })

    const data:CartResponse = await response.json()
    

    if(data.message=="success"){
      getCart()
    }
    setIsClearing(false)
  }
  async function updateCartItem(productId:string , count:number){
    const token = await getUserToken()
    setUpdatingId(productId)

   

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
      method:'PUT',
      body: JSON.stringify({count}),
      headers:{
        token: token!,
        "content-type":"application/json"
      }
    })

    const data:CartResponse = await response.json()
    toast.success("product updated Successfuly")
    

    if(data.status=="success"){
      setCartData(data)
    }
    setUpdatingId(null)
  }
  return <>
    {isLoading || typeof cartData?.data.products[0]?.product=="string" ?<Loading/>: cartData?.numOfCartItems! >0 ? <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-gray-500 mb-10">{cartData?.numOfCartItems} item in your cart</p>

        <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">


          <div className="lg:col-span-2 space-y-6">

            {cartData?.data.products.map((item=><div key={item._id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-6">
              <div className="relative w-24 h-24">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  
                  className="rounded-xl object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.product.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.product.brand.name} • {item.product.category.name}</p>

                <div className="flex items-center gap-4 mt-5">
                  <button onClick={()=>updateCartItem(item.product.id,item.count-1)} disabled={item.count==1} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    −
                  </button>
                  <span className="w-16 text-center text-lg font-semibold">{updatingId == item.product.id?<Loader className="animate-spin"/>:item.count}</span>
                  <button onClick={()=>updateCartItem(item.product.id,item.count+1)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">{item.price} EGP</p>
                <button onClick={()=>removeCartItem(item.product.id)} className="text-red-500 text-sm mt-4 flex items-center gap-1 cursor-pointer hover:text-red-700">
                  {removingId==item.product.id? <Loader className="animate-spin"/>:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>}
                  Remove
                </button>
              </div>
            </div>))}


          </div>


          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-5 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal ({cartData?.numOfCartItems} item)</span>
                  <span className="font-bold">{cartData?.data.totalCartPrice} EGP</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>

                <div className="border-t pt-5">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span>{cartData?.data.totalCartPrice} EGP</span>
                  </div>
                </div>
              </div>

              <CheckOut cartId={cartData?.cartId!}/>

             <Link href={'/products'}>
              <button className="w-full border cursor-pointer border-gray-300 py-4 rounded-xl mt-3 text-lg font-medium hover:bg-gray-50 transition">
                Continue Shopping
              </button>
             </Link>

              <div className="text-center mt-8">
            <Button  onClick={deleteCartItem} className="text-red-500 text-sm flex items-center justify-center gap-2 hover:text-red-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {isClearing&&<Loader className="animate-spin"/>} Clear Cart
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>:
  <div className="flex min-h-[75vh] items-center justify-center flex-col">
    <h1 className="text-2xl my-4">Your Cart is Empty.......</h1>
    <Link href={"./products"}>
    <Button>Add to Product</Button>
    </Link>
  </div>
    }
  </>
}