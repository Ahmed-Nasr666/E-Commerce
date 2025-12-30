import { ProductI } from '@/interface';
import { Params } from 'next/dist/server/request/params'
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
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import ProductSlider from '@/components/productSlider/ProductSlider';
import AddToCart from '@/components/addToCart/addToCart';
export default async function productDetails({params}:{params:Params}) {
    let {productId} = await params
    console.log(productId);

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productId)
    let {data:products}:{data:ProductI} = await response.json()
    
    
    
  return <>

  <Card className='grid md:grid-cols-2 items-center w-3/4 mx-auto'>
  <div className='flex'>
    <ProductSlider images={products.images} altContent={products.title}/>
      
  </div>
  <div>
     <CardHeader>
      <CardDescription>{products.brand.name}</CardDescription>
    <CardTitle>{products.title}</CardTitle>
    <CardDescription>{products.description}</CardDescription>
    
  </CardHeader>
  <CardContent>
    <CardDescription>{products.category.name}</CardDescription>
    <div className="flex gap-1 mt-2">
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <MyStarIcon/>
      <p>({products.ratingsQuantity})</p>
    </div>
    <div className="flex justify-between mt-2">
      <p className='font-bold'>{products.price} EGP</p>
      <p className='font-bold'>Quantity : {products.quantity}</p>
    </div>
  </CardContent>
    <AddToCart productId={products.id}/>
  </div>
  
</Card>
  </>
}
