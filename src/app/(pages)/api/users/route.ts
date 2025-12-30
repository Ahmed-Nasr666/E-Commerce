import { NextResponse } from "next/server"

export async function GET(){
    const users ={
        message:"success",
        users: [
            {id:111,name:"Ahmed",age:21},
            {id:121,name:"Hossam",age:25},
            {id:131,name:"Habiba",age:19},
          
        ]
    }
    return NextResponse.json(users)
}