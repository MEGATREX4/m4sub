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
    <div className="pixelcut bg-green-900/10 px-10 max-w-3xl mx-auto py-12 prose prose-invert">
      <ReactMarkdown
        components={{
          a({ node, ...props }) {
            if (!props.href) {
              return <span {...props} />
            }
            return <a {...props} />
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Rules
