export type typeCommand = "CreateUser" | "VerifyUser"

export type typeResponse =
    typeUser |
    "valid" |
    "invalid-email-exists" |
    "invalid-command" |
    "invalid-email" |
    "invalid-password"

export type typeFormDataCreate = {
    email: string,
    name: string,
    password: string
}

export type typeFormDataLogin = {
    email: string,
    password: string
}

export type typeUser = {
    email: string,
    name: string
}

export type typeUserEntry = {
    email: string,
    name: string,
    passwordHash: string,

}