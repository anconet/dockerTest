
"use server"
import { typeFormDataLogin, typeFormDataCreate, typeUser, typeResponse } from "@/app/types"
import { createSession } from "./authorization"
import { redirect } from "next/navigation"
import { MongoClient } from "mongodb"

const USER_DATABASE_SERVER_ADDRESS = "backend-container"
const USER_DATABASE_SERVER_PORT = 3001
const userDataBaseURL = `http://${USER_DATABASE_SERVER_ADDRESS}:${USER_DATABASE_SERVER_PORT}`

export async function createUser(formDataCreate: typeFormDataCreate): Promise<typeResponse | "no-server"> {

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
        const responseString = await response.json()
        console.log("CreateUser:", responseString)
        return responseString
    } catch (error) {
        return "no-server"
    }
}

export async function deleteUser(formDataLogin: typeFormDataLogin): Promise<typeResponse | "no-server"> {

    const DATABASE_USERNAME = "admin"
    const DATABASE_PASSWORD = "admin"
    const DATABASE_HOST = "mongo-db-container"
    const DATABASE_PORT = 27017
    const DATABASE_DATABASE = "mydb"
    const DATABASE_COLLECTION = "users"

    type typeUserEntry = {
        email: string,
        name: string,
        passwordHash: string
    }

    const URI = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`
    const client = new MongoClient(URI)
    const db = client.db(DATABASE_DATABASE)
    const collection = db.collection<typeUserEntry>(DATABASE_COLLECTION as string)
    console.log("Authentication/DeleteUser:", URI)

    try {
        await client.connect()
        let founduser = await collection.find({ email: `${formDataLogin.email}` }).toArray()
        const name = founduser[0].name
        if (founduser.length != 1) { return "invalid-email" }
        await collection.deleteOne({ email: `${formDataLogin.email}` })
        founduser = await collection.find({ email: `${formDataLogin.email}` }).toArray()
        if (founduser.length != 0) { return "invalid-email" }

        return { email: formDataLogin.email, name: name }
    } catch {
        return "no-server"
    }
}

export async function login(formDataLogin: typeFormDataLogin) {

    const verificationResult = await verifyUser(formDataLogin)

    switch (verificationResult) {
        case "invalid-command":
            return verificationResult
            break;

        case "invalid-email":
            return verificationResult
            break;

        case "invalid-password":
            return verificationResult
            break;
        case "invalid-email-exists":
            return verificationResult
            break;

        case "no-server":
            return verificationResult
            break;

        default:
            console.log("Authentication.tsx:", verificationResult)
            createSession(verificationResult)
            redirect("/")
            break;
    }
}
export async function verifyUser(formDataLogin: typeFormDataLogin): Promise<typeResponse | "no-server"> {

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
        return responseString
    } catch (error) {
        console.log("No Authentication Server")
        return "no-server"
    }
}