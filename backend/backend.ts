import { MongoClient } from "mongodb"
import express from "express"
import cors from "cors"
import { config as dotenvConfig } from "dotenv"
import { typeCommand, typeFormDataCreate, typeFormDataLogin, typeResponse, typeUser, typeUserEntry } from "./library/types"
import { createUser, verifyUser } from "./library/createUser"
const api = express()
api.use(cors())
api.use(express.json())

dotenvConfig({ path: "../db/mongoDb.env" })
dotenvConfig()

const USER_DATABASE_SERVER_PORT = 3001

const DATABASE_USERNAME = process.env.DATABASE_USERNAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_PORT = process.env.DATABASE_PORT
const DATABASE_DATABASE = process.env.DATABASE_DATABASE
const DATABASE_COLLECTION = process.env.DATABASE_COLLECTION

const URI = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`
const client = new MongoClient(URI)
const db = client.db(DATABASE_DATABASE)
const collection = db.collection<typeUserEntry>(DATABASE_COLLECTION as string)


api.listen(USER_DATABASE_SERVER_PORT, async () => {
    console.log("Backend Server listening on port: ", USER_DATABASE_SERVER_PORT)

    try {
        await client.connect()
        console.log("Backend Server onnected to the user database container!")
    }
    catch (error) {
        console.log("Backed couldn't connect to the user database conatiner")
        console.log(error)
    }

})

api.post('/', async (request, response) => {
    console.log("Got a POST")
    console.log(request.body)

    const command: typeCommand = request.body.command as typeCommand
    var localResponse: typeResponse

    switch (command) {
        case "CreateUser":
            localResponse = await createUser(collection, request.body.formData as typeFormDataCreate)
            break;
        case "VerifyUser":
            localResponse = await verifyUser(collection, request.body.formData as typeFormDataLogin)
            break;

        default:
            localResponse = "invalid-command"
            break;
    }
    response.json(localResponse)
})
