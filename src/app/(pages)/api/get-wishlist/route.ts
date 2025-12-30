import { getUserToken } from "@/Helpers/getUserToken"

import { WishlistResponse } from "@/interface/wishlist"
import { NextResponse } from "next/server"

export async function GET(){

    const token = await getUserToken()
     const response = await fetch(`${process.env.API_URL}/wishlist`,{
            headers: {
                token: token!
            }
        }
        )
        const data:WishlistResponse = await response.json()
        return NextResponse.json(data)
}