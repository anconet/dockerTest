import { MongoClient } from "mongodb"
import express from "express"
import cors from "cors"
import { config as dotenvConfig } from "dotenv"
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
const collection = db.collection(DATABASE_COLLECTION as string)

type typeUser = { email: string, userid: string, password: string }

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

    const userToFind: typeUser = request.body as typeUser;
    var localResponse: string
    let result = await collection.find({ email: `${userToFind.email}` }).toArray()
    if (result.length === 0) {
        console.log(`${userToFind} not found`)
        console.log(`Creating New User: ${userToFind}`)
        await collection.insertOne(userToFind)
        localResponse = "invalid"
    } else {
        console.log(`${userToFind} found!`)
        localResponse = "valid"
    }

    response.json(localResponse)
})

async function main() {
    //console.log("Firing Up the Backend Server")
    //console.log(URI)
    try {
        await client.connect()
        console.log("backend.ts/main: Connected to the database container!")
    }
    catch (error) {
        console.log("backend.ts/main: Couldn't connect")
        console.log(error)
    }

    //const anotherCollection = await db.createCollection("AnotherCollectionYo")
    //await db.dropCollection("AnotherCollection")
    //console.log(await db.listCollections().toArray())

    const newUser: typeUser = {
        email: "anthony.anconetani@gmail.com",
        userid: "anthony",
        password: "password"
    }

    const userToFind = "anthony"
    let result = await collection.find({ userid: `${newUser.userid}` }).toArray()
    if (result.length === 0) {
        console.log(`${newUser.userid} not found`)
        console.log(`Creating New User: ${newUser}`)
        await collection.insertOne(newUser)
    } else {
        console.log(`${newUser.userid} found!`)
    }

    //await collection.insertOne(newUser)
    let result2 = await collection.find({}).toArray()
    result2.map((entry) => {
        console.log(entry._id.toHexString())
    })

}

//main()