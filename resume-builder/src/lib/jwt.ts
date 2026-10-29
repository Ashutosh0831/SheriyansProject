import { jwtPayload } from '@/types/user.types'
import jwt, { JwtPayload } from 'jsonwebtoken'

type SessionPayload = JwtPayload & Pick<jwtPayload, 'userId'>


export const generateToken = (payload: jwtPayload): string=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET!,{
        expiresIn: '1h'
    })

    return token
}


export const verifyToken = (token: string): SessionPayload =>{
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    if (typeof decoded === 'string' || typeof decoded.userId !== 'string') {
        throw new Error('Unauthorised')
    }

    return { ...decoded, userId: decoded.userId }
}