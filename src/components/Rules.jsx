// src/components/Rules.jsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { BorderBox } from "./donate/components/BorderBox";

const Rules = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/rules.md")
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center py-20">
          <i className="hn hn-spinner text-4xl text-[#c5629a] animate-spin"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
        <div className="p-6 sm:p-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#c5629a] minecraftFont flex items-center justify-center gap-3">
            <i className="hn hn-scroll"></i>
            Правила
          </h1>
          <p className="text-gray-400 mt-2">
            Загальні правила сервера M4SUB
          </p>
        </div>
      </BorderBox>

      {/* Content */}
      <div className="mt-6">
        <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
          <div className="p-6 sm:p-8">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ children }) => (
                  <div className="mt-8 first:mt-0 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 bg-[#c5629a]"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white minecraftFont">
                        {children}
                      </h2>
                    </div>
                    <div className="h-[2px] bg-gradient-to-r from-[#c5629a] to-transparent"></div>
                  </div>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold text-[#c5629a] mt-6 mb-3 minecraftFont flex items-center gap-2">
                    <i className="hn hn-bookmark text-sm"></i>
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-bold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-[#c5629a] not-italic">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 ml-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 space-y-2 ml-2 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300 flex items-start gap-2">
                    <span className="text-[#c5629a] mt-1.5 flex-shrink-0">
                      <i className="hn hn-angle-right text-xs"></i>
                    </span>
                    <span>{children}</span>
                  </li>
                ),
                a: ({ href, children, ...props }) => {
                  if (!href) return <span {...props}>{children}</span>;
                  return (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={href?.startsWith("http") ? "noreferrer" : undefined}
                      className="text-[#c5629a] hover:text-[#f390d0] transition-colors underline underline-offset-2"
                    >
                      {children}
                    </a>
                  );
                },
                hr: () => (
                  <div className="my-6 flex items-center gap-2">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#c5629a]/50 to-transparent"></div>
                  </div>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#c5629a] bg-[#130217] px-4 py-3 my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-[#1a1a2e] text-[#f390d0] px-2 py-0.5 text-sm">
                    {children}
                  </code>
                ),
                PS: ({ children }) => (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    {children}
                  </p>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </BorderBox>
      </div>
    </div>
  );
};

export default Rules;