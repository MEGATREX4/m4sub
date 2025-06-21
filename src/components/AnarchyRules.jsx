// src/components/anarchy/AnarchyRules.jsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./css/md-pages.css";
import ViolationMark from "./ViolationMark";

export default function AnarchyRules() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/anarchy-rules.md")
      .then((res) => res.text())
      .then((text) => {
        // Preprocess: replace <violation type="minor"/> and <violation type="major"/>
        let processed = text
          .replace(/<violation type="minor"\s*\/>/g, "![violation-minor]()")
          .replace(/<violation type="major"\s*\/>/g, "![violation-major]()");
        setContent(processed);
      });
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
          img({ alt }) {
            if (alt === "violation-minor") return <ViolationMark type="minor" />;
            if (alt === "violation-major") return <ViolationMark type="major" />;
            return null;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
