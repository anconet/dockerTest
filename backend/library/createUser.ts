import { Collection } from "mongodb";
import { typeFormDataCreate, typeFormDataLogin, typeResponse, typeUser, typeUserEntry } from "./types";
import bcrypt from "bcryptjs"

export async function createUser(collection: Collection<typeUserEntry>, formDataCreate: typeFormDataCreate): Promise<typeResponse> {

    const userToFind: typeFormDataCreate = formDataCreate;
    let result = await collection.find({ email: `${userToFind.email}` }).toArray()

    if (result.length > 0) { return "invalid-email-exists" }
    else {
        try {
            const hashedPassword = await bcrypt.hash(formDataCreate.password, 10)
            const userToCreate: typeUserEntry = {
                email: formDataCreate.email,
                name: formDataCreate.name,
                passwordHash: hashedPassword
            }
            await collection.insertOne(userToCreate)

            const createdUser: typeUser = {
                email: userToCreate.email,
                name: userToCreate.name
            }
            return createdUser

        } catch (error) {
            console.log(error)
            return "invalid-password"
        }
    }



}

export async function verifyUser(collection: Collection<typeUserEntry>, formDataLogin: typeFormDataLogin): Promise<typeResponse> {
    const userToFind: typeFormDataLogin = formDataLogin;
    let result = await collection.find({ email: `${userToFind.email}` }).toArray()
    if (result.length === 0) {
        return "invalid-email"
    } else {

        const compareResult = await bcrypt.compare(userToFind.password, result[0].passwordHash)
        if (compareResult) {
            const foundUser: typeUser = {
                email: result[0].email,
                name: result[0].name
            }
            return foundUser
        } else {
            return "invalid-password"
        }
    }
}
