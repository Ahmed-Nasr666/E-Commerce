"use client"
import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserToken } from '@/Helpers/getUserToken'
export default function CheckOut({cartId}:{cartId:string}) {
    let detailsInput=useRef<HTMLInputElement|null>(null)
    let cityInput=useRef<HTMLInputElement|null>(null)
    let phoneInput=useRef<HTMLInputElement|null>(null)
const [isDisabled, setIsDisabled] = useState(true)
    const checkInputs = () =>{
    const city = cityInput.current?.value.trim()
    const details = detailsInput.current?.value.trim()
    const phone = phoneInput.current?.value.trim()
    setIsDisabled( !city || !details || !phone)
}
    
     async function checkOutSession(){
    const shippingAddress ={
      details:detailsInput.current?.value,
      city:cityInput.current?.value,
      phone:phoneInput.current?.value
    }
    
    const token = await getUserToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
      method:"POST",
      body:JSON.stringify({shippingAddress}),
       headers:{
       token: token!,
        "content-type":"application/json"
      }
    })
    const data = await response.json()
    console.log(cartId);
    
    
    if(data.status=="success"){
      window.location.href=data.session.url
    }
    
    
  }
     async function checkOutCash(){
    const shippingAddress ={
      details:detailsInput.current?.value,
      city:cityInput.current?.value,
      phone:phoneInput.current?.value
    }
    
    const token = await getUserToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
      method:"POST",
      body:JSON.stringify({shippingAddress}),
       headers:{
       token: token!,
        "content-type":"application/json"
      }
    })
    const data = await response.json()
    console.log(data);
    
    
    if(data.status=="success"){
      window.location.href= '/allorders'
      console.log(data);
      
    }
    
    
  }
  return <>

     <Dialog >
      <form >
        <DialogTrigger  asChild>
          <Button  className="w-full bg-black cursor-pointer text-white py-4 rounded-xl mt-8 text-lg font-bold hover:bg-white transition" variant="outline">Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent  className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Make sure that your entered the correct address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label >City</Label>
              <Input  ref={cityInput} onInput={checkInputs} id="city"  />
            </div>
            <div className="grid gap-3">
              <Label >Details</Label>
              <Input ref={detailsInput} onInput={checkInputs} id="details"  />
            </div>
            <div className="grid gap-3">
              <Label >Phone</Label>
              <Input ref={phoneInput} onInput={checkInputs} id="phone"  />
            </div>
           
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isDisabled} onClick={()=>checkOutSession()}>VISA</Button>
            <Button type="submit" disabled={isDisabled}  onClick={()=>checkOutCash()}>CASH</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>

  </>
}
