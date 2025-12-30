import { authOptions } from "@/authnext"
import { FailedLoginResponse, SuccessLoginResponse } from "@/interface"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }