import { BrandI, CategoryI, ProductI } from '@/interface';
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

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
  const {data:brands}:{data:BrandI[]} = await response.json()
  console.log(brands);
  
  return <>
  <h1 className='ms-3 my-7'>Brands</h1>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
    {brands.map((brand)=><div key={brand._id}>
      <Link href={'/brands/'+brand._id}>
       <Card>
  <CardHeader>
    <Image className='w-full' src={brand.image} alt={brand.name} width={300} height={300}/>

  <CardTitle className='text-center'>{brand.name}</CardTitle>

  </CardHeader>
</Card>
      </Link>
    </div>)}
  </div>
 
  </>
}
