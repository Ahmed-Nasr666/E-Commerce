"use client"

import React, { useContext, useState } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
import { HeartIcon, Loader, ShoppingCartIcon, UserIcon } from "lucide-react"

import { WishlistContext } from "../context/wishlistContext"
import { signOut, useSession } from "next-auth/react"
import { CartContext } from "../context/CartContext"

export default function Navbar() {
  const { cartData, isLoading } = useContext(CartContext)
  const { wishlistData } = useContext(WishlistContext)
  const session = useSession()

  const [openMenu, setOpenMenu] = useState(false)

  return (
    <nav className="bg-gray-100 py-3 text-lg font-semibold fixed top-0 inset-x-0 shadow z-50">
      <div className="container mx-auto px-4">


        <div className="flex items-center justify-between">


          <h1 className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-lg text-white bg-black">S</span>
            <Link href="/">ShopMart</Link>
          </h1>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
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
          </div>

          <div className="flex items-center gap-3">

            {session.status === "authenticated" && (
              <h2 className="hidden md:block text-sm">
                hi {session.data.user?.name}
              </h2>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.status === "authenticated" ? (
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </DropdownMenuItem>
                ) : (
                  <>
                    <Link href="/login">
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {session.status === "authenticated" && (
              <div className="hidden md:flex items-center gap-4">
                <IconBadge
                  href="/carts"
                  icon={<ShoppingCartIcon />}
                  value={cartData?.numOfCartItems}
                  loading={isLoading}
                />
                <IconBadge
                  href="/wishlist"
                  icon={<HeartIcon />}
                  value={wishlistData?.count}
                  loading={isLoading}
                />
              </div>
            )}

            <button
              className="md:hidden text-2xl"
              onClick={() => setOpenMenu(!openMenu)}
            >
              ☰
            </button>
          </div>
        </div>

        {openMenu && (
          <div className="md:hidden mt-4 flex flex-col gap-3 text-base">
            <Link href="/products" onClick={() => setOpenMenu(false)}>
              Products
            </Link>
            <Link href="/brands" onClick={() => setOpenMenu(false)}>
              Brands
            </Link>
            <Link href="/categories" onClick={() => setOpenMenu(false)}>
              Categories
            </Link>

            {session.status === "authenticated" && (
              <div className="flex gap-4 mt-3">
                <IconBadge
                  href="/carts"
                  icon={<ShoppingCartIcon />}
                  value={cartData?.numOfCartItems}
                  loading={isLoading}
                />
                <IconBadge
                  href="/wishlist"
                  icon={<HeartIcon />}
                  value={wishlistData?.count}
                  loading={isLoading}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

function IconBadge({
  href,
  icon,
  value,
  loading,
}: {
  href: string
  icon: React.ReactNode
  value?: number
  loading: boolean
}) {
  return (
    <div className="relative">
      <Link href={href}>
        {icon}
        <Badge className="h-5 absolute -top-3 -end-3 min-w-5 rounded-full px-1 font-mono">
          {loading ? <Loader className="animate-spin" /> : value}
        </Badge>
      </Link>
    </div>
  )
}