"use client"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
export default function ProductSlider({images,altContent}:{images:string[],altContent:string}) {
  return <>
  <Carousel  opts={{
    loop: true
  }}plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
  <CarouselContent >
    {images.map((image,index)=><CarouselItem key={index} className='flex items-center justify-center'><Image  src={image} alt={altContent} width={300} height={300}/> </CarouselItem>)}
    </CarouselContent>
</Carousel>
  </>
}
