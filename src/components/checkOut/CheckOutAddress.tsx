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
import { Loader } from 'lucide-react'
export default function CheckOutAddress() {
    let detailsInput=useRef<HTMLInputElement|null>(null)
  let nameInput=useRef<HTMLInputElement|null>(null)
      let cityInput=useRef<HTMLInputElement|null>(null)
      let phoneInput=useRef<HTMLInputElement|null>(null)
      let [loading,setLoading]=useState(false)
      const [isDisabled, setIsDisabled] = useState(true)
    const checkInputs = () =>{
      const name = nameInput.current?.value.trim()
    const city = cityInput.current?.value.trim()
    const details = detailsInput.current?.value.trim()
    const phone = phoneInput.current?.value.trim()
    setIsDisabled(!name || !city || !details || !phone)
}
       async function checkOutSession(){
      
      const token = await getUserToken()
      setLoading(true)
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`,{
        method:"POST",
        body:JSON.stringify({
        name:nameInput.current?.value,
        details:detailsInput.current?.value,
        city:cityInput.current?.value,
        phone:phoneInput.current?.value
      }),
         headers:{
         token: token!,
          "content-type":"application/json"
        }
  
      })
      const data = await response.json()
      console.log(data);
      
      
      if(data.status=="success"){
        window.location.href=('/profile')
      }
      setLoading(false)
      
    }
  return <>
           <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className=" bg-white  cursor-pointer text-black py-4 rounded-xl mt-8 text-lg font-bold " variant="outline">Add Adderss +</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Shipping Address</DialogTitle>
              <DialogDescription>
                Make sure that your entered the correct address
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
               <div className="grid gap-3">
                <Label >Name</Label>
                <Input ref={nameInput} onInput={checkInputs} id="name" required />
              </div>
              <div className="grid gap-3">
                <Label >City</Label>
                <Input ref={cityInput} onInput={checkInputs} id="city" required />
              </div>
              <div className="grid gap-3">
                <Label >Details</Label>
                <Input ref={detailsInput} onInput={checkInputs} id="details" required />
              </div>
              <div className="grid gap-3">
                <Label >Phone</Label>
                <Input ref={phoneInput} onInput={checkInputs} id="phone" required />
              </div>
             
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button className='cursor-pointer' onClick={()=>checkOutSession()} disabled={isDisabled}  type="submit">{loading && <Loader className='animate-spin'/>} Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
  </>
}
