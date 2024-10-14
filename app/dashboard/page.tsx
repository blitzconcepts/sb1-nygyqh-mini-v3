"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import MiniSitePreview from "@/components/mini-site-preview"

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin")
    },
  })

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/mini-sites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })
      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Success",
          description: `Mini-site created with short URL: ${data.shortUrl}`,
        })
        setTitle("")
        setContent("")
      } else {
        throw new Error("Failed to create mini-site")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create mini-site",
        variant: "destructive",
      })
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session?.user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
          />
          <Button type="submit">Create Mini-Site</Button>
        </form>
        <MiniSitePreview title={title} content={content} />
      </div>
    </div>
  )
}