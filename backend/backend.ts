import { MongoClient } from "mongodb"
import express from "express"
import cors from "cors"
import { config as dotenvConfig } from "dotenv"
import e from "express"
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

type typeCommand = "CreateUser" | "VerifyUser"

type typeFormDataCreate = {
    email: string,
    password: string
}

type typeFormDataLogin = {
    email: string,
    password: string
}

type typeUserEntry = {
    email: string,
    userid: string,
    passwordHash: string
}

type typeUser = {
    email: string,
    userid: string
}

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
    var localResponse: string | typeUser

    if (command == "CreateUser") {
        const userToCreate: typeFormDataCreate = request.body.formData as typeFormDataCreate
        await collection.insertOne(userToCreate)
        localResponse = "valid"
    } else {

        if (command == "VerifyUser") {
            const userToFind: typeFormDataLogin = request.body.formData as typeFormDataLogin;
            let result = await collection.find({ email: `${userToFind.email}` }).toArray()

            if (result.length === 0) {
                console.log(`${userToFind} not found`)
                localResponse = "invalid"
            } else {
                const foundUser: typeUser = {
                    email: result[0].email,
                    userid: result[0].userid
                }
                console.log("To Find:")
                console.log(userToFind)
                console.log("Found:")
                console.log(foundUser)
                localResponse = foundUser
            }
        } else { localResponse = "invalid" }

    }
    response.json(localResponse)
})
/*
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

//const newUser: typeUser = {
//    email: "anthony.anconetani@gmail.com",
//    userid: "anthony"
//}

//const userToFind = "anthony"
//let result = await collection.find({ userid: `${newUser.userid}` }).toArray()
//if (result.length === 0) {
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
*/