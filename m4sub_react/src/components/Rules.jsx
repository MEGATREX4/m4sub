import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './css/md-pages.css'

const Rules = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/rules.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
  }, [])

  return (
    <div className=" pixelcut bg-green-900/10 px-10 max-w-3xl mx-auto py-12 prose prose-invert">
      <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-5">{children}</p>,
                a: ({ children }) => <a className="text-[#c5629a] hover:text-[#f390d0] cursor-pointer">{children}</a>
              }}
            >
              {content}
      </ReactMarkdown>
    </div>
  )
}

export default Rules
