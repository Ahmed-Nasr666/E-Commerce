import { CategoryI, ProductI } from '@/interface';
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
import AddToCart from '@/components/addToCart/addToCart';
import Link from 'next/link';

export default async function CategoryDetails({params}:{params:Params}) {

  
    let {categoryId} = await params
    console.log(categoryId);
    

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories/'+categoryId)
    
    const {data:category}:{data:CategoryI} = await response.json()
    console.log( category);

    const response2= await fetch('https://ecommerce.routemisr.com/api/v1/products?category[in]='+categoryId)
    const {data:products}:{data:ProductI[]} = await response2.json()
    console.log( products);
    

  return <>
  <div className='my-3'>
    <h1>{category.name}</h1>
    <p className='text-gray-500 my-3'>Products in this category</p>

    {products.length != 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
    { products.map((product) => <div key={product.id}>
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
  </div> : <div className=' flex flex-col justify-center items-center my-7'>
    <h2 className='text-gray-500'>No products found in this category.</h2></div>}
    
  </div>
 
   
  </>
}
