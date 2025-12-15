// src/components/SubserverRules.jsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { BorderBox } from "./donate/components/BorderBox";
import ViolationMark from "./ViolationMark";
import Hero from "./Hero";

export default function SubserverRules() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/rules.md")
      .then((res) => res.text())
      .then((text) => {
        let processed = text
          .replace(/<violation type="minor"\s*\/>/g, "![violation-minor]()")
          .replace(/<violation type="major"\s*\/>/g, "![violation-major]()");
        setContent(processed);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="hn hn-spinner text-4xl text-[#c5629a] animate-spin"></i>
          </div>
        ) : (
          <>
            {/* Legend */}
            <BorderBox borderColor="bg-gray-600" innerBg="bg-[#1a1a2e]">
              <div className="p-4 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <ViolationMark type="minor" />
                  <span className="text-gray-400">Незначне порушення</span>
                </div>
                <div className="flex items-center gap-2">
                  <ViolationMark type="major" />
                  <span className="text-gray-400">Серйозне порушення</span>
                </div>
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
                          <i className="hn hn-alert-triangle text-sm"></i>
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-white font-bold">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="text-[#c5629a] not-italic">{children}</em>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-4 space-y-2 ml-2">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-300 flex items-start gap-2">
                          <span className="text-[#c5629a] mt-1.5 flex-shrink-0">
                            <i className="hn hn-chevron-right text-xs"></i>
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
                        <div className="my-6 h-[2px] bg-gradient-to-r from-transparent via-[#c5629a]/50 to-transparent"></div>
                      ),
                      img: ({ alt }) => {
                        if (alt === "violation-minor") return <ViolationMark type="minor" />;
                        if (alt === "violation-major") return <ViolationMark type="major" />;
                        return null;
                      },
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </BorderBox>
            </div>

            {/* Warning */}
            <div className="mt-6">
              <BorderBox borderColor="bg-orange-600" innerBg="bg-[#1a1008]">
                <div className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-orange-400 mb-2">
                    <i className="hn hn-alert-triangle"></i>
                    <span className="font-bold minecraftFont">Важливо</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Незнання правил не звільняє від відповідальності. 
                    При виникненні питань звертайтесь до адміністрації.
                  </p>
                </div>
              </BorderBox>
            </div>
          </>
        )}
      </div>
    </div>
  );
}