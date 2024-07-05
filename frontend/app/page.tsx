import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSession } from "./lib/authorization";

export default async function Main() {
  console.log("Main Page")

  const session = await getSession()
  console.log(session)

  if (session === null) { redirect("/welcome") }
  return (
    < p > Main Page</p >
  );
}