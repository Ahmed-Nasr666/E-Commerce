
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ProductI, Root, ShippingAddress } from '@/interface'
import { CartContext } from '../context/CartContext'
import Image from "next/image"


export default async function GetOrders({ userId }: { userId: string }) {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+userId)

  const orders:Root[] = await response.json()
  // const {cartItems} = await response.json()
  console.log(orders);
  // console.log(cartItems);
  


  return <>
  <div>
    <h1 className='my-3'>All Orders</h1>
  {orders?.reverse().map((order)=> <div key={order._id} className="mb-5">
      <Card className='ps-5'>
      <h2 className='text-[20px]'>Order # {order.id}</h2>
      <p className='text-[14px] text-gray-600'>Order Date: { new Date(order.updatedAt).toLocaleDateString()}, {
    new Date(order.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  }</p>
      <p className='text-[14px] text-gray-600'>Payment: {order.paymentMethodType} {order.isPaid ? <span className="text-green-600">(Paid)</span>:(<span className="text-green-600">(No Paid)</span>)}</p>
      <p className='text-[14px] text-gray-600'>Delivered: {order.isDelivered ? <span className="text-green-600">yes</span>:<span className="text-red-600">No</span>}</p>
      <p className='text-[14px] text-gray-600'>Total: <b>{order.totalOrderPrice} EGP</b></p>

      <h2 className='text-[16px]'>Shipping Address</h2>
      <p className='text-[14px] text-gray-600'>{order.shippingAddress.details}, {order.shippingAddress.city}</p>
      <p className='text-[14px] text-gray-600'>Phone: {order.user.phone}</p>

      <div className="text-start">
             <DropdownMenu>
  <DropdownMenuTrigger><Button variant="outline" className='w-fit'>View Order Items</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Order Items</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem> <div className="flex flex-col gap-2"> {order.cartItems.map((item) => <div className="flex gap-2 ">
       <Image src={item.product.imageCover}  alt={item.product.title} width={40} height={40}/>
       <div>
        <h4>{item.product.title}</h4>
        <p>Qty: {item.count} | Price: {item.price}</p>
       </div>
       </div>)} </div> </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
      <p className='text-end me-4 text-[14px] text-gray-600'> Last updated: { new Date(order.updatedAt).toLocaleDateString()}, {
    new Date(order.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  } </p>
    </Card>
  </div>)}
  </div>
  </>
}
