import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart', '/profile','/allorders','/wishlist']
const authPages = ['/login', '/register','/forgotPassword','/resetCode','/resetPassword',]

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req })

  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next()
    } else {
      const redirectURL = new URL('/login', process.env.NEXT_URL)
      return NextResponse.redirect(redirectURL)
    }
  }
  // if (protectedPages3.includes(req.nextUrl.pathname)) {
  //   if (token) {
  //     const redirectURL2 = new URL('/', process.env.NEXT_URL)
  //     return NextResponse.redirect(redirectURL2)
  //   } else {
  //     const redirectURL = new URL('/login', process.env.NEXT_URL)
  //     return NextResponse.redirect(redirectURL)
  //   }
  // }
  // if (protectedPages2.includes(req.nextUrl.pathname)) {
  //   if (!token) {
  //     return NextResponse.next()
  //   } else {
  //     const redirectURL = new URL('/login', process.env.NEXT_URL)
  //     return NextResponse.redirect(redirectURL)
  //   }
  // }

  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next()
    } else {
      const redirectURL = new URL('/', process.env.NEXT_URL)
      return NextResponse.redirect(redirectURL)
    }
  }
  return NextResponse.next()
}
