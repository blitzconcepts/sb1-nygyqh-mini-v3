import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Mini-Site Generator</span>
        </h1>
        <p className="mt-3 text-2xl">
          Create your own mini-website with ease
        </p>
        <div className="flex mt-6">
          <Link href="/api/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}