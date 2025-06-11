// src/components/anarchy/AnarchyRules.jsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./css/md-pages.css";

export default function AnarchyRules() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/rules.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="num-md-page pixelcut bg-green-900/20 px-10 max-w-3xl mx-auto py-12 prose prose-invert">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          a({ node, ...props }) {
            if (!props.href) {
              return <span {...props} />;
            }
            return <a {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
