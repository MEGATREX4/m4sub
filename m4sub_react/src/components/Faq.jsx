import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './css/md-pages.css'

const Faq = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/faq.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
  }, [])

  return (
    <div className="md-page pixelcut bg-green-900/10 px-10 max-w-3xl mx-auto py-12 prose prose-invert">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Faq

