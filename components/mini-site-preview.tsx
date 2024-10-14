import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MiniSitePreviewProps {
  title: string
  content: string
}

export default function MiniSitePreview({ title, content }: MiniSitePreviewProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title || "Your Mini-Site Title"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{content || "Your content will appear here..."}</p>
      </CardContent>
    </Card>
  )
}