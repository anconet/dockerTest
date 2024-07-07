
"use server"
import { typeFormData } from "@/types"
import { createSession } from "./authorization"
import { redirect } from "next/navigation"

const USER_DATABASE_SERVER_ADDRESS = "backend-container"
const USER_DATABASE_SERVER_PORT = 3001
const userDataBaseURL = `http://${USER_DATABASE_SERVER_ADDRESS}:${USER_DATABASE_SERVER_PORT}`

export async function login(formData: typeFormData) {

    if (await verifyUser(formData) == "valid") {
        createSession(formData)
        redirect("/")
    }
}
export async function verifyUser(formData: typeFormData) {
    console.log("verifyUser", formData)
    try {
        const response = await fetch(
            userDataBaseURL,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(formData)
            })
        const responseString = await response.json()
        console.log("verifyUser:", responseString)
        return "valid"
    } catch {
        console.log("No Authentication Server")
        return "invalid"
    }
}