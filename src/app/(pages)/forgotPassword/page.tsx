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

const formSchema = z.object({email:z.email("invalid Email").nonempty("Email is required")})

type formField=z.infer<typeof formSchema>
export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    let searchParams = useSearchParams()
    const router = useRouter()
    console.log(searchParams.get('error'));
    
  
    const form = useForm<formField>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
      },
    })
   
    async function onSubmit(values:formField) {
      setIsLoading(true)
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
        method:"POST",
        body: JSON.stringify({
        email:values.email,
        }),
        headers:{"content-type" : " application/json"}
      })
      const data = await response.json()
      if(data.statusMsg == "success"){
        window.location.href=('/resetCode')
      }
     
      setIsLoading(false)
    }
  return <>
  <div className='flex flex-col justify-center items-center min-h-[75vh]'>
    <h1 className='my-3'>Forgot Password</h1>

   <Card className='p-5 w-sm'>
    <div className='flex flex-col items-center text-center'>
<svg aria-label="Are you having trouble logging in?" className="x1lliihq x1n2onr6 x5n08af mb-3"fill="currentColor" height="96"role="img"viewBox="0 0 96 96"width="96">
  <circle
    cx="48"
    cy="48"
    r="47"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
  />

  <path
    d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
  />
</svg>
        <h2 className='mb-3'>Are you having trouble logging in?</h2>
        <p className='text-gray-600 '>Enter your email address and we will send you a link to your account.</p>
    </div>
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
        <Button className='w-full cursor-pointer' type="submit" >{isLoading && <Loader className='animate-spin'/>} Submit</Button>
      </form>
    </Form>
   </Card>
  </div>
  </>
}
