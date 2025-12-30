import { CategoryI, ProductI } from '@/interface';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
export default async function Categories() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  
  const {data:categories}:{data:CategoryI[]} = await response.json()
  console.log(categories);
  
  return <>
  <h1 className='ms-3 my-7'>Categories</h1>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
    {categories.map((category)=><div key={category._id}>
      <Link href={'/categories/'+category._id}>
       <Card >
  <CardHeader>
    <div className='h-[300px] w-full  overflow-hidden flex items-center justify-center'>
      <Image className="object-cover "  src={category.image} alt={category.name} width={300} height={300} />
    </div>
    <div className='text-center font-bold mt-5'>
       <CardTitle className='text-center'>{category.name}</CardTitle>
    </div>

 

  </CardHeader>
</Card>
      </Link>
    </div>)}
  </div>
 
  </>
}
