import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const Rules = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/rules.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
  }, [])

  return (
    <div className=" pixelcut bg-green-900/10 px-10 max-w-3xl mx-auto py-12 prose prose-invert">
      <h1 className="text-3xl font-bold mb-4">Правила сервера</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default Rules
