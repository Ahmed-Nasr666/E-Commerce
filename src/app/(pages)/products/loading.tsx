import { Spinner } from '@/components/ui/spinner'
import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return <>
  <div className='min-h-screen flex justify-center items-center'>
        <div className='flex-col  items-center '>
         <div className='flex gap-1'>
           <span className="flex justify-center items-center rounded-lg w-15 text-white bg-black">S</span>
          <h1 className='text-4xl font-bold'>ShopMart</h1>
         </div>
           <div className=' mt-3 '>
                         <Spinner className="size-16 mx-auto" />
           </div>

        </div>
    </div>
  </>
}
