// Footer.jsx
import React, { useState } from 'react';
import { BorderBox } from './donate/components/BorderBox';

// Простий helper для MC текстур
const mcTexture = (name) => `https://mc.nerothe.com/img/1.21.11/minecraft_${name}.png`;

const Footer = React.forwardRef((props, ref) => {
  const [copied, setCopied] = useState(false);

  const copyIP = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText("m4sub.click");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
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

  const techStack = [
    { name: "React", icon: "hn-react" },
    { name: "Node.js", icon: "hn-nodejs" },
    { name: "MongoDB", icon: "hn-mongodb" },
    { name: "Tailwind", icon: "hn-tailwindcss" },
  ];

  return (
    <footer ref={ref} className="mt-6 md:mt-8">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
        <div className="p-4 sm:p-6 md:p-8">
          
          {/* Main Content - Compact 3 Columns Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            
            {/* Left - Branding */}
            <div className="text-center md:text-left sm:col-span-2 md:col-span-1">
              <h3 className="text-lg md:text-xl font-bold text-[#c5629a] minecraftFont mb-2 flex items-center justify-center md:justify-start gap-2">
                <img 
                  src={mcTexture("grass_block")} 
                  alt="Grass Block" 
                  className="w-5 h-5 md:w-6 md:h-6"
                  style={{ imageRendering: 'pixelated' }}
                />
                M4SUB
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-3">
                Minecraft Сервер
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs">
                Розроблено з <i className="hn hn-heart-solid text-[#c5629a]"></i> MEGATREX4
              </p>
              <p className="text-gray-600 text-[10px] md:text-xs mt-1">
                © 2025
              </p>
            </div>

            {/* Center - Tech Stack */}
            <div className="text-center">
              <h4 className="text-xs md:text-sm font-bold text-gray-400 minecraftFont mb-2 md:mb-3 flex items-center justify-center gap-1.5 md:gap-2">
                <img 
                  src={mcTexture("diamond")} 
                  alt="Diamond" 
                  className="w-3 h-3 md:w-4 md:h-4"
                  style={{ imageRendering: 'pixelated' }}
                />
                Технології
              </h4>
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                {techStack.map((tech) => (
                  <div 
                    key={tech.name}
                    className="bg-[#1a1a2e] border border-[#c5629a]/20 px-1.5 md:px-2 py-0.5 md:py-1 flex items-center gap-1 md:gap-1.5 text-gray-400 text-[10px] md:text-xs hover:border-[#c5629a]/50 transition-colors"
                  >
                    <i className={`hn ${tech.icon} text-[#c5629a]`}></i>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 md:mt-3 flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1 text-gray-600 text-[9px] md:text-[10px]">
                <span>Netlify</span>
                <span className="text-[#c5629a]/50">•</span>
                <span>Hackernoon Icons</span>
              </div>
            </div>

            {/* Right - Social Links */}
            <div className="text-center md:text-right">
              <h4 className="text-xs md:text-sm font-bold text-gray-400 minecraftFont mb-2 md:mb-3 flex items-center justify-center md:justify-end gap-1.5 md:gap-2">
                <img 
                  src={mcTexture("ender_pearl")} 
                  alt="Ender Pearl" 
                  className="w-3 h-3 md:w-4 md:h-4"
                  style={{ imageRendering: 'pixelated' }}
                />
                Соціальні мережі
              </h4>
              <div className="flex justify-center md:justify-end gap-2.5 md:gap-3 flex-wrap">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`text-gray-500 ${social.color} transition-colors text-lg md:text-xl`}
                    aria-label={social.label}
                  >
                    <i className={`hn ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider with MC icon */}
          <div className="my-4 sm:my-5 flex items-center gap-2">
            <div className="flex-1 flex h-[2px] md:h-[3px]">
              <div className="flex-1 bg-[#2a0a1a]"></div>
              <div className="flex-1 bg-[#4a1a3a]"></div>
              <div className="flex-1 bg-[#6a2a5a]"></div>
              <div className="flex-1 bg-[#8a3a7a]"></div>
              <div className="flex-1 bg-[#a54a8a]"></div>
              <div className="flex-1 bg-[#c5629a]"></div>
            </div>
            <img 
              src={mcTexture("nether_star")} 
              alt="Nether Star" 
              className="w-3 h-3 md:w-4 md:h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="flex-1 flex h-[2px] md:h-[3px]">
              <div className="flex-1 bg-[#c5629a]"></div>
              <div className="flex-1 bg-[#a54a8a]"></div>
              <div className="flex-1 bg-[#8a3a7a]"></div>
              <div className="flex-1 bg-[#6a2a5a]"></div>
              <div className="flex-1 bg-[#4a1a3a]"></div>
              <div className="flex-1 bg-[#2a0a1a]"></div>
            </div>
          </div>

          {/* Quick Actions Bar - Equal width buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mx-auto mb-5">
            {/* Status Button */}
            <a 
              href="/health"
              className="flex justify-center items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] border border-[#c5629a]/30 hover:border-[#c5629a] text-[#c5629a] hover:text-[#f390d0] font-bold minecraftFont text-xs sm:text-sm transition-colors rounded-sm"
            >
              <i className="hn hn-activity text-sm"></i>
              <span>Статус</span>
            </a>

            {/* IP Button */}
            <button
              onClick={copyIP}
              className={`
                flex justify-center items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] border font-bold minecraftFont text-xs sm:text-sm transition-all rounded-sm
                ${copied 
                  ? 'border-green-500/50 text-green-400' 
                  : 'border-[#c5629a]/30 hover:border-[#c5629a] text-[#c5629a] hover:text-[#f390d0]'
                }
              `}
            >
              <i className={`hn ${copied ? 'hn-check-circle-solid' : 'hn-copy'} text-sm`}></i>
              <span>{copied ? "Скопійовано!" : "m4sub.click"}</span>
            </button>

            {/* Discord Button */}
            <a
              href="https://discord.gg/fxqnU9by3M"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-1.5 px-4 py-2 bg-[#1a1a2e] border border-[#5865f2]/30 hover:border-[#5865f2] text-[#5865f2] hover:text-[#7289da] font-bold minecraftFont text-xs sm:text-sm transition-colors rounded-sm"
            >
              <i className="hn hn-discord text-sm"></i>
              <span>Спільнота</span>
            </a>
          </div>

          {/* Legal Text */}
          <div className="text-center">
            <p className="text-gray-600 text-[9px] sm:text-[10px] font-bold minecraftFont tracking-wide">
              NOT AN OFFICIAL MINECRAFT SERVICE
            </p>
            <p className="text-gray-700 text-[8px] sm:text-[9px] mt-1">
              NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT
            </p>
          </div>
        </div>
      </BorderBox>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;