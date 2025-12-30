"use client"
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { CarIcon, HeartIcon, HeaterIcon, Loader, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { log } from 'console'
import { signOut, useSession } from 'next-auth/react'
import { WishlistContext } from '../context/wishlistContext'
export default function Navbar() {
  const session = useSession()
  
  
  const {cartData,isLoading} = useContext(CartContext)
  const {wishlistData,isLoading2} =  useContext(WishlistContext)
  return <>
  <nav className='bg-gray-100 text-2xl py-3 font-semibold fixed start-0 top-0 end-0'>
  <div className="max-w-7xl mx-auto px-4">
    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

      <Link href={'/'}>
        <h1 className="text-center md:text-left">ShopMart</h1>
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="flex flex-col md:flex-row gap-2 md:gap-6 text-center">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/products">Products</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/brands">Brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/categories">Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center justify-center md:justify-end gap-4">
        <DropdownMenu>
          {session.status=="authenticated" && <h2 className='me-1 text-sm'>Hi {session.data.user.name}</h2>}
          <DropdownMenuTrigger asChild>
            <button><UserIcon/></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session.status=="authenticated" ? (
              <>
                <Link href={'/profile'}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={()=>signOut({ callbackUrl:"/" })}>
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <Link href={'/login'}>
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <Link href={'/register'}>
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {session.status=="authenticated" && (
          <div className='relative md:ms-3'>
            <Link href={'/cart'}>
              <ShoppingCartIcon/>
              <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono">
                {isLoading ? <Loader className='animate-spin'/> : cartData?.numOfCartItems}
              </Badge>
            </Link>
          </div>
        )}

        {session.status=="authenticated" && (
          <div className='relative md:ms-4'>
            <Link href={'/wishlist'}>
              <HeartIcon/>
              <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono">
                {isLoading2 ? <Loader className='animate-spin'/> : wishlistData?.count}
              </Badge>
            </Link>
          </div>
        )}
      </div>

    </div>
  </div>
</nav>

  </>
}
