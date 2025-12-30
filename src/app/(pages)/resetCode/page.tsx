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

const formSchema = z.object({resetCode:z.string("invalid password").nonempty("code is required").min(6,"code must 6 chars")})

type formField=z.infer<typeof formSchema>
export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    let searchParams = useSearchParams()

    console.log(searchParams.get('error'));
    
  
    const form = useForm<formField>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        resetCode: "",
      },
    })
   
    async function onSubmit(values:formField) {
      setIsLoading(true)
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{
        method:"POST",
        body: JSON.stringify({
        resetCode:values.resetCode,
        }),
        headers:{"content-type" : " application/json"}
      })
      const data = await response.json()
      if(data.status == "Success"){
        window.location.href=('/resetPassword')
      }else{
        setIsError(data.message)
      }
     
      setIsLoading(false)
    }
  return <>
  <div className='flex flex-col justify-center items-center min-h-[75vh]'>
    <h1 className='my-3'>Verify Code</h1>

   <Card className='p-5 w-sm'>
    <div className='flex flex-col items-center text-center'>
        <p className='font-bold '></p>
    </div>
     <Form {...form}>
      {searchParams.get('error')&& <h1 className='text-red-600'>{searchParams.get('error')}</h1>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="code must 6 chars" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-red-600'>{isError}</p>
        <Button className='w-full cursor-pointer' type="submit" >{isLoading && <Loader className='animate-spin'/>} Confirm</Button>
      </form>
    </Form>
   </Card>
  </div>
  </>
}

