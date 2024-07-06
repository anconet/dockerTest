"use server"
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type typeJwtPayload = { email: string, userid: string }
type typeUser = typeJwtPayload | null

function signMyJwt(jwtPayload: typeJwtPayload) {
    const keyAsString = process.env.JWT_KEY
    const keyAsUint8 = new TextEncoder().encode(keyAsString)

    return new SignJWT(jwtPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
        .sign(keyAsUint8);
}

export async function login(formData: { email: string, userid: string, password: string }) {

    //(Todo) hit user database
    createSession(formData)
    redirect("/")
}

export async function createSession(user: typeUser) {

    const expires = new Date(Date.now() + 10 * 1000)
    if (user) {
        const jwtPayload: typeJwtPayload = { email: user.email, userid: user.userid }
        const signedJwtPayload = await signMyJwt(jwtPayload);
        console.log("Click on the Welcome Page")
        cookies().set("session", signedJwtPayload, { expires, httpOnly: true })
    }
}

function checkPayload(payload: JWTPayload): typeUser {
    if (!("email" in payload)) { throw new TypeError("No Email Address") }
    if (!("userid" in payload)) { throw new TypeError("No Userid") }
    const user: typeUser = { email: payload.email as string, userid: payload.userid as string }
    return user
}

async function verifyThisJwt(jwt: string): Promise<JWTPayload> {
    const keyAsString = process.env.JWT_KEY
    console.log(keyAsString)
    //const keyAsString = "dumb"
    const keyAsUint8 = new TextEncoder().encode(keyAsString)

    const result = await jwtVerify(jwt, keyAsUint8)
    console.log("Cookie Signature is valid")

    return result.payload
}

export async function getSession(): Promise<typeUser> {
    try {
        const session = cookies().get("session");
        if (session) {
            const jwt = session.value

            const payload = await verifyThisJwt(jwt);
            const user = checkPayload(payload)
            return user
        } else { return null }

    } catch (error) {
        console.log("Final Error: ", error)
        return null
    }
}