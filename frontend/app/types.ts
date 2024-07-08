export type typeFormDataCreate = {
    email: string,
    userid: string,
    password: string
}

export type typeFormDataLogin = {
    email: string,
    password: string
}

export type typeUser = {
    email: string,
    userid: string
}

export type typeCommand = "CreateUser" | "VerifyUser"