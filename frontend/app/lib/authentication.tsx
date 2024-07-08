
"use server"
import { typeFormDataLogin, typeFormDataCreate, typeUser } from "@/app/types"
import { createSession } from "./authorization"
import { redirect } from "next/navigation"
import { verify } from "crypto"

const USER_DATABASE_SERVER_ADDRESS = "backend-container"
const USER_DATABASE_SERVER_PORT = 3001
const userDataBaseURL = `http://${USER_DATABASE_SERVER_ADDRESS}:${USER_DATABASE_SERVER_PORT}`

export async function create(formDataCreate: typeFormDataCreate) {

    const message = {
        command: "CreateUser",
        formData: formDataCreate
    }

    try {
        const response = await fetch(
            userDataBaseURL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(message)
        }
        )
    } catch (error) {

    }
}

export async function login(formDataLogin: typeFormDataLogin) {

    const verificationResult = await verifyUser(formDataLogin)
    if (verificationResult != null) {
        console.log("Authentication.tsx:", verificationResult)
        createSession(verificationResult)
        redirect("/")
    } else {
        return null
    }
}
export async function verifyUser(formDataLogin: typeFormDataLogin): Promise<typeUser | null> {

    const message = {
        command: "VerifyUser",
        formData: formDataLogin
    }
    try {
        const response = await fetch(
            userDataBaseURL,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(message)
            })
        const responseString = await response.json()
        console.log("verifyUser:", responseString)
        if (responseString == "invalid") {
            return null
        }
        else {
            return responseString
        }
    } catch (error) {
        console.log("No Authentication Server")
        return null
    }
}