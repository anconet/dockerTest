import { redirect } from "next/navigation";
import { getSession } from "./lib/authorization";

export default async function Main() {
  console.log("Main Page")

  const session = await getSession()
  console.log(session)

  if (session === null) { redirect("/welcome") }
  return (
    <div className="h-screen flex justify-center items-center">
      < p > Main Page</p > </div>
  );
}