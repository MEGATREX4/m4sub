import React, { useState } from "react";
import { Link } from "react-router-dom";

const socialLinks = [
  { href: "https://discord.gg/fxqnU9by3M", icon: "hn-discord", label: "Discord", color: "hover:text-[#5865F2]" },
  { href: "https://www.x.com/m4subclick", icon: "hn-x", label: "X", color: "hover:text-white" },
  { href: "https://soc.ua-fediland.de/@m4subclick", icon: "hn-mastodon", label: "Mastodon", color: "hover:text-[#6364FF]" },
  { href: "https://bsky.app/profile/m4sub.bsky.social", icon: "hn-bluesky", label: "Bluesky", color: "hover:text-[#0085ff]" },
  { href: "https://www.instagram.com/m4sub.click/", icon: "hn-instagram", label: "Instagram", color: "hover:text-[#E4405F]" },
  { href: "https://www.threads.com/@m4sub.click", icon: "hn-threads", label: "Threads", color: "hover:text-white" },
  { href: "https://www.tiktok.com/@m4sub.click", icon: "hn-tiktok", label: "TikTok", color: "hover:text-[#E4405F]" },
  { href: "https://www.youtube.com/@m4sub", icon: "hn-youtube", label: "YouTube", color: "hover:text-[#FF0000]" },
];

const documentLinks = [
  { to: "/terms", label: "Умови" },
  { to: "/privacy", label: "Конфіденційність" },
  { to: "/materials", label: "Матеріали" },
];

const navLinks = [
  { to: "/health", label: "Статус" },
  { to: "/roadmap", label: "Дорожня карта" },
  { to: "/donate", label: "Магазин" },
];

const linkClass = "text-gray-500 hover:text-[#c5629a] transition-colors !text-sm leading-snug";

const Footer = React.forwardRef((props, ref) => {
  const [copied, setCopied] = useState(false);

  const copyIP = async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText("m4sub.click");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }

    const textArea = document.createElement("textarea");
    textArea.value = "m4sub.click";
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <footer ref={ref} className="mt-5 md:mt-8 text-sm">
      <div className="bg-[#c5629a] p-[2px]">
        <div className="bg-gray-700 p-[2px]">
          <div className="bg-[#130217] px-5 py-6 sm:px-8 sm:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-5xl mx-auto">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <p className="text-[#c5629a] minecraftFont font-bold text-lg mb-1.5">M4SUB</p>
                <p className="text-gray-500 !text-sm mb-2.5">Minecraft Сервер</p>
                <button
                  type="button"
                  onClick={copyIP}
                  className={`
                    inline-flex items-center gap-1.5 px-2.5 py-1 border text-sm minecraftFont transition-colors
                    ${copied
                      ? "border-green-500/40 text-green-400"
                      : "border-[#c5629a]/30 text-[#c5629a] hover:border-[#c5629a]/60 hover:text-[#f390d0]"
                    }
                  `}
                >
                  <i className={`hn ${copied ? "hn-check" : "hn-copy"} text-xs`}></i>
                  {copied ? "Скопійовано" : "m4sub.click"}
                </button>
              </div>

              {/* Documents */}
              <div>
                <p className="text-gray-600 uppercase tracking-wider text-xs mb-2.5">Документи</p>
                <nav className="flex flex-col gap-1.5">
                  {documentLinks.map((item) => (
                    <Link key={item.to} to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Navigation */}
              <div>
                <p className="text-gray-600 uppercase tracking-wider text-xs mb-2.5">Сервер</p>
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((item) => (
                    <Link key={item.to} to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Social */}
              <div className="col-span-2 md:col-span-1">
                <p className="text-gray-600 uppercase tracking-wider text-xs mb-2.5">Соцмережі</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-gray-600 ${social.color} transition-colors`}
                      aria-label={social.label}
                    >
                      <i className={`hn ${social.icon} text-base`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#c5629a]/10 mt-6 pt-5 text-center space-y-2">
              <p className="text-gray-600 text-[11px] uppercase tracking-wide">
                Not an official Minecraft service · Not affiliated with Mojang or Microsoft
              </p>
              <p className="text-gray-600 text-xs">
                © 2026 M4SUB · Розроблено з <i className="hn hn-heart-solid text-[#c5629a] text-[11px]"></i> MEGATREX4
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
