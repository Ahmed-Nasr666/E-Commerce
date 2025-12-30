"use client"
 import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {signIn} from "next-auth/react"
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
import { useSearchParams, useServerInsertedHTML } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
  email:z.email("invalid Email").nonempty("Email is required"),
  password:z.string("invalid password").nonempty("password is required").min(6,"password must al least 6 chars")
})
type formField=z.infer<typeof formSchema>
export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  let searchParams = useSearchParams()
  console.log(searchParams.get('error'));
  

  const form = useForm<formField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 

  async function onSubmit(values:formField) {
    setIsLoading(true)
    const response = await signIn("credentials",{
      email:values.email,
      password:values.password,
      callbackUrl:"/products",
      redirect:true
    })
   
    setIsLoading(false)
  }
 
  return <>
  <div className='flex flex-col justify-center items-center min-h-[75vh]'>
    <h1 className='my-3'>Login Now</h1>

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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-center'>
          <Link href={'/forgotPassword'}  className='cursor-pointer underline'>Forgot Password?</Link>
        </div>
        <Button className='w-full cursor-pointer' type="submit" >{isLoading && <Loader className='animate-spin'/>} Submit</Button>
        <p className="mt-2">If you don't have account , please <Link href={'/register'} className="text-blue-500 underline">Sign Up</Link> now </p>
      </form>
    </Form>
   </Card>
  </div>
  </>
}
