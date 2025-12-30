import { ProductI } from '@/interface'
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
import Image from 'next/image'
import MyStarIcon from '@/components/myStarIcon/myStarIcon'
import { Button } from '@/components/ui/button'
import { HeartIcon, HeaterIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import AddToCart from '@/components/addToCart/addToCart'
export default async function Products() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const {data:products}:{data:ProductI[]} = await response.json()
  
  

  return <>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
    {products.map((product)=> <div key={product.id}>
      <Card>
        <Link href={'/products/'+product.id}>
        <CardHeader>
    <Image className='w-full' src={product.imageCover} alt='' width={300} height={300}/>
    <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle>{product.title.split(' ',2).join(' ')}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className='flex gap-1'>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <p>({product.ratingsAverage})</p>
    </div>
  </CardContent>
        </Link>
<AddToCart productId={product.id}/>
</Card>
    </div>)}
  </div>
  

  </>
}
