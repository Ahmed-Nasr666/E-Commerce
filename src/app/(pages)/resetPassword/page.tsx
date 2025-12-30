"use client"
 import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {signIn, signOut} from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useRouter, useSearchParams, useServerInsertedHTML } from 'next/navigation'
import { Loader } from 'lucide-react'

const formSchema = z.object({

  email:z.email("invalid Email").nonempty("Email is required"),
  newPassword:z.string("invalid password").nonempty("password is required").min(6,"password must al least 6 chars"),
 
})
type formField=z.infer<typeof formSchema>
export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    let searchParams = useSearchParams()
    const router = useRouter()
    console.log(searchParams.get('error'));
    
  
    const form = useForm<formField>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      
        email: "",
        newPassword:"",

      },
    })
   
    async function onSubmit(values:formField) {
      setIsLoading(true)
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
        method:"PUT",
        body: JSON.stringify({
        email:values.email,
        newPassword:values.newPassword,
        }),
        headers:{"content-type" : " application/json"}
      })
      const data = await response.json()
      if(data.token){
        window.location.href=('/login')
      }
     
      setIsLoading(false)
    }
  return <>
  <div className='flex flex-col justify-center items-center min-h-[75vh]'>
    <h1 className='my-3'>Resst Password</h1>

   <Card className='p-5 w-sm'>
     <Form {...form}>
      {searchParams.get('error')&& <h1 className='text-red-600'>{searchParams.get('error')}</h1>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="isco@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>newPassword</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full cursor-pointer' type="submit" >{isLoading && <Loader className='animate-spin'/>} Submit</Button>
      </form>
    </Form>
   </Card>
  </div>
  </>
}
