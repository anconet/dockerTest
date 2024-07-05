import { MongoClient } from "mongodb"
import http from "http"
import { config as dotenvConfig } from "dotenv"
dotenvConfig({ path: "../db/mongoDb.env" })
dotenvConfig()

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

async function main() {
    console.log("Firing Up the Backend Server")
    console.log(URI)
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

main()