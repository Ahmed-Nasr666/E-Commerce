import { getUserToken } from "@/Helpers/getUserToken"
import { CartResponse } from "@/interface"
import { NextResponse } from "next/server"

export async function GET(){

    const token = await getUserToken()
     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers: {
                token: token!
            }
        }
        )
        const data:CartResponse = await response.json()
        return NextResponse.json(data)
}