"use client"
import { login } from "../lib/authentication"

export default function Welcome() {
    console.log("Welcome Page")
    const formData = {
        email: "anthony.anconetani@gmail.com",
        userid: "anthony.anconetani",
        password: "password",
    }

    return <div>
        <p>Welcome, please login or create an account. </p>
        <button
            className="flex-row rounded-md h-8 w-24  bg-slate-800"
            onClick={() => login(formData)}>
            Login
        </button>
    </div>
}