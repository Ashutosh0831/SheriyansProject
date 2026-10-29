import { cookies } from "next/headers";
import { verifyToken } from "./jwt";


export async function getUser(){
    const cookieStore =await cookies()

    const token = cookieStore.get('token')?.value

    if(!token) throw new Error("Token not found")

    const decode = await verifyToken(token)

    if(!decode) throw new Error("Unauthorised")

    return decode.userId;
}