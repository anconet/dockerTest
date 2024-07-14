"use client"
import { useState } from "react"
import { login, createUser, deleteUser } from "../lib/authentication"
import { typeFormDataLogin, typeFormDataCreate, typeUser } from "../types"

export default function Welcome() {
    console.log("Welcome Page")

    const formDataCreate: typeFormDataCreate = {
        email: "anthony.anconetani@gmail.com",
        name: "anthony",
        password: "password",
    }

    const formDataGood: typeFormDataLogin = {
        email: "anthony.anconetani@gmail.com",
        password: "password",
    }

    const formDataBadUser: typeFormDataLogin = {
        email: "grace.anconetani@gmail.com",
        password: "password",
    }

    const formDataBadPassword: typeFormDataLogin = {
        email: "anthony.anconetani@gmail.com",
        password: "badpassword",
    }

    const [loginMessage, setLoginMessage] = useState<typeUser | string>("Logged Out")

    return <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4 bg-slate-900 p-4 rounded-xl shadow-lg shadow-black" >
            <p className="">Welcome, please login or create an account. </p>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={async () => {
                    const message = await createUser(formDataCreate);
                    if ("email" in (message as typeUser)) { setLoginMessage(`${(message as typeUser).email} Created`) }
                    else { message }
                }}>
                Create
            </button>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={() => {
                    login(formDataGood)
                }}>
                Good
            </button>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={async () => { const message = await login(formDataBadUser); setLoginMessage(message) }}>
                Email
            </button>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={async () => { const message = await login(formDataBadPassword); setLoginMessage(message) }}>
                Pwd
            </button>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={async () => { const message = await deleteUser(formDataGood); setLoginMessage(message) }}>
                Delete
            </button>
            <p>{loginMessage.toString()}</p>
        </div>
    </div>
}