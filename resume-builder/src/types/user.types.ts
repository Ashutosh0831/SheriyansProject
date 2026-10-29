
export interface Iuser {
    _id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    createdAt?: Date,
    updatedAt?: Date,
}


export interface registerBody{
    name: string,
    email: string,
    password: string,
    phone: string,
}

export interface loginBody{
    email: string,
    password: string,
}

export interface jwtPayload{
    userId: string,
    email?: string,
}

