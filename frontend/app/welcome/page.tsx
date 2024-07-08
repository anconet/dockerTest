"use client"
import { login, create } from "../lib/authentication"
import { typeFormDataLogin, typeFormDataCreate } from "../types"

export default function Welcome() {
    console.log("Welcome Page")

    const formDataCreate: typeFormDataCreate = {
        email: "anthony.anconetani@gmail.com",
        userid: "anthony",
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
    return <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
            <p className="">Welcome, please login or create an account. </p>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={() => create(formDataCreate)}>
                Create
            </button>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={() => login(formDataGood)}>
                Login
            </button>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={() => login(formDataBadUser)}>
                Login
            </button>
            <button
                className="rounded-md h-8 w-24  bg-slate-800"
                onClick={() => login(formDataBadPassword)}>
                Login
            </button>
        </div>
    </div>
}