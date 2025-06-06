// src/components/Rules.jsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./css/md-pages.css";

const Rules = () => {
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
          // Лінки без змін
          a({ node, ...props }) {
            if (!props.href) return <span {...props} />;
            return <a {...props} />;
          },
          // Рендеримо власний <PS>…</PS> як окремий <p><span>…</span></p>
          PS({ node, ...props }) {
            return (
              <p>
                <span className="block text-xs text-gray-400 mt-2">
                  {props.children}
                </span>
              </p>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Rules;
