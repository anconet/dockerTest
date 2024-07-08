"use server"
import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { typeUser } from "@/app/types"

type typeJwtPayload = { email: string, userid: string }


function signMyJwt(jwtPayload: typeJwtPayload) {
    const keyAsString = process.env.JWT_KEY
    const keyAsUint8 = new TextEncoder().encode(keyAsString)

    return new SignJWT(jwtPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
        .sign(keyAsUint8);
}

export async function createSession(user: typeUser) {

    const expires = new Date(Date.now() + 10 * 1000)
    const jwtPayload: typeJwtPayload = { email: user.email, userid: user.userid }
    const signedJwtPayload = await signMyJwt(jwtPayload);
    console.log("Authorization.tsx/createSession: ", user)
    cookies().set("session", signedJwtPayload, { expires, httpOnly: true })
}

function checkPayload(payload: JWTPayload): typeUser {
    if (!("email" in payload)) { throw new TypeError("No Email Address") }
    if (!("userid" in payload)) { throw new TypeError("No Userid") }
    const user: typeUser = { email: payload.email as string, userid: payload.userid as string }
    return user
}

async function verifyThisJwt(jwt: string): Promise<JWTPayload> {
    const keyAsString = process.env.JWT_KEY
    console.log("Authorization.tsx/verifyThisJwt:", keyAsString)
    //const keyAsString = "dumb"
    const keyAsUint8 = new TextEncoder().encode(keyAsString)

    const result = await jwtVerify(jwt, keyAsUint8)
    console.log("Authorization.tsx/verifyThisJws: Cookie Signature is valid")

    return result.payload
}

export async function getSession(): Promise<typeUser | null> {
    try {
        const session = cookies().get("session");
        if (session) {
            const jwt = session.value

            const payload = await verifyThisJwt(jwt);
            const user = checkPayload(payload)
            return user
        } else { return null }

    } catch (error) {
        console.log("Authorization.tsx/getsession: Final Error: ", error)
        return null
    }
}