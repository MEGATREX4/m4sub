import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { BorderBox } from "./donate/components/BorderBox";

const mcTexture = (name) => `https://mc.nerothe.com/img/1.21.11/minecraft_${name}.png`;

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
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center p-4">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#c5629a] border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="minecraftFont text-[#c5629a] uppercase tracking-widest text-sm">Зчитування кодексу...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6 sm:py-10 space-y-6 sm:space-y-8 overflow-hidden">
      
      {/* Header - Масивний блок */}
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
        <div className="p-8 sm:p-12 text-center relative">
          <span className="text-[#c5629a] minecraftFont text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 block">Регламент сервера</span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white minecraftFont uppercase tracking-tighter leading-none flex items-center justify-center gap-4">
            <i className="hn hn-scroll text-[#c5629a] text-3xl sm:text-5xl"></i>
            Правила
          </h1>
          <div className="h-1 w-24 bg-[#c5629a] mx-auto mt-6"></div>
        </div>
      </BorderBox>

      {/* Main Content */}
      <div className="mt-4 sm:mt-6">
        <BorderBox borderColor="bg-white/5" innerBg="bg-[#0a0a12]">
          <div className="p-6 sm:p-12">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ children }) => (
                  <div className="mt-12 first:mt-0 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white minecraftFont uppercase tracking-tighter flex items-center gap-4">
                      <span className="w-2 h-7 bg-[#c5629a]"></span>
                      {children}
                    </h2>
                  </div>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl font-bold text-[#f390d0] mt-8 mb-4 minecraftFont uppercase tracking-tight flex items-center gap-2">
                    <i className="hn hn-bookmark text-[#c5629a]"></i>
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-400 mb-6 leading-relaxed text-base sm:text-lg">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-bold bg-white/5 px-1">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-[#c5629a] not-italic font-bold">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="mb-6 space-y-3 ml-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-6 space-y-3 ml-2 list-decimal list-inside text-[#c5629a] minecraftFont">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-400 flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 bg-[#c5629a] mt-2 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base leading-snug">{children}</span>
                  </li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c5629a] hover:text-[#f390d0] transition-colors underline decoration-2 underline-offset-4 font-bold uppercase text-xs"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <div className="my-10 flex items-center gap-2 opacity-30">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c5629a]"></div>
                    <img 
                      src={mcTexture("nether_star")} 
                      alt="divider" 
                      className="w-4 h-4"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c5629a]"></div>
                  </div>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#c5629a] bg-[#c5629a]/5 p-6 my-8 text-gray-300 italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-black/40 border border-white/5 text-[#f390d0] px-2 py-0.5 text-xs sm:text-sm font-mono">
                    {children}
                  </code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>

            {/* Footer Rules Section */}
            <div className="mt-16 pt-8 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-600 minecraftFont uppercase tracking-[0.4em]">
                    Незнання правил не звільняє від відповідальності
                </p>
            </div>
          </div>
        </BorderBox>
      </div>
    </div>
  );
};

export default Rules;