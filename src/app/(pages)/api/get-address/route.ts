import { getUserToken } from "@/Helpers/getUserToken"
import { Address } from "@/interface"
import { NextResponse } from "next/server"

export async function GET(){

    const token = await getUserToken()
     const response = await fetch(`${process.env.API_URL}/addresses`,{
            headers: {
                token: token!
            }
        }
        )
        const data:Address = await response.json()
        return NextResponse.json(data)
}