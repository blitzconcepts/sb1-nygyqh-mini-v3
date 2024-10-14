import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import ShortUniqueId from "short-unique-id"

const uid = new ShortUniqueId({ length: 10 })

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, content } = await req.json()
  const shortUrl = uid()

  try {
    const miniSite = await prisma.miniSite.create({
      data: {
        title,
        content,
        shortUrl,
        userId: session.user.id,
      },
    })

    return NextResponse.json(miniSite)
  } catch (error) {
    console.error("Failed to create mini-site:", error)
    return NextResponse.json({ error: "Failed to create mini-site" }, { status: 500 })
  }
}