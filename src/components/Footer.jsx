// Footer.jsx
import React from 'react';
import { BorderBox } from './donate/components/BorderBox';

// Простий helper для MC текстур
// Виправлений helper для MC текстур
const mcTexture = (name) => `https://mc.nerothe.com/img/1.21.11/minecraft_${name}.png`;

const Footer = React.forwardRef((props, ref) => {
  const socialLinks = [
    { href: "https://discord.gg/fxqnU9by3M", icon: "hn-discord", label: "Discord", color: "hover:text-[#5865F2]" },
    { href: "https://www.x.com/m4subclick", icon: "hn-x", label: "X", color: "hover:text-white" },
    { href: "https://soc.ua-fediland.de/@m4subclick", icon: "hn-mastodon", label: "Mastodon", color: "hover:text-[#6364FF]" },
    { href: "https://bsky.app/profile/m4sub.bsky.social", icon: "hn-bluesky", label: "Bluesky", color: "hover:text-[#0085ff]" },
    { href: "https://www.instagram.com/m4sub.click/", icon: "hn-instagram", label: "Instagram", color: "hover:text-[#E4405F]" },
    { href: "https://www.threads.com/@m4sub.click", icon: "hn-threads", label: "Threads", color: "hover:text-white" },
  ];

  const techStack = [
    { name: "React", icon: "hn-react" },
    { name: "Node.js", icon: "hn-nodejs" },
    { name: "MongoDB", icon: "hn-mongodb" },
    { name: "Tailwind", icon: "hn-tailwindcss" },
  ];

  return (
    <footer ref={ref} className="mt-8">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
        <div className="p-6 sm:p-8">
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left - Branding */}
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-[#c5629a] minecraftFont mb-2 flex items-center justify-center lg:justify-start gap-2">
                <img 
                  src={mcTexture("grass_block")} 
                  alt="Grass Block" 
                  className="w-6 h-6"
                  style={{ imageRendering: 'pixelated' }}
                />
                M4SUB
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Minecraft Сервер
              </p>
              <p className="text-gray-500 text-xs">
                Розроблено з <i className="hn hn-heart-solid text-[#c5629a]"></i> MEGATREX4
              </p>
              <p className="text-gray-600 text-xs mt-1">
                © 2025
              </p>
            </div>

            {/* Center - Tech Stack */}
            <div className="text-center">
              <h4 className="text-sm font-bold text-gray-400 minecraftFont mb-3 flex items-center justify-center gap-2">
                <img 
                  src={mcTexture("redstone")} 
                  alt="Redstone" 
                  className="w-4 h-4"
                  style={{ imageRendering: 'pixelated' }}
                />
                Технології
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {techStack.map((tech) => (
                  <div 
                    key={tech.name}
                    className="bg-[#1a1a2e] border border-[#c5629a]/20 px-2 py-1 flex items-center gap-1.5 text-gray-400 text-xs hover:border-[#c5629a]/50 transition-colors"
                  >
                    <i className={`hn ${tech.icon} text-[#c5629a]`}></i>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-gray-600 text-[10px]">
                <span>Netlify</span>
                <span className="text-[#c5629a]/50">•</span>
                <span>Hackernoon Icons</span>
              </div>
            </div>

            {/* Right - Social Links */}
            <div className="text-center lg:text-right">
              <h4 className="text-sm font-bold text-gray-400 minecraftFont mb-3 flex items-center justify-center lg:justify-end gap-2">
                <img 
                  src={mcTexture("ender_pearl")} 
                  alt="Ender Pearl" 
                  className="w-4 h-4"
                  style={{ imageRendering: 'pixelated' }}
                />
                Соціальні мережі
              </h4>
              <div className="flex justify-center lg:justify-end gap-3">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`text-gray-500 ${social.color} transition-colors text-xl`}
                    aria-label={social.label}
                  >
                    <i className={`hn ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider with MC icon */}
          <div className="my-5 flex items-center gap-2">
            <div className="flex-1 flex h-[3px]">
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
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="flex-1 flex h-[3px]">
              <div className="flex-1 bg-[#c5629a]"></div>
              <div className="flex-1 bg-[#a54a8a]"></div>
              <div className="flex-1 bg-[#8a3a7a]"></div>
              <div className="flex-1 bg-[#6a2a5a]"></div>
              <div className="flex-1 bg-[#4a1a3a]"></div>
              <div className="flex-1 bg-[#2a0a1a]"></div>
            </div>
          </div>

          {/* Legal Text */}
          <div className="text-center">
            <p className="text-gray-600 text-[10px] sm:text-xs font-bold minecraftFont tracking-wide">
              NOT AN OFFICIAL MINECRAFT SERVICE
            </p>
            <p className="text-gray-700 text-[9px] sm:text-[10px] mt-1">
              NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT
            </p>
          </div>
        </div>
      </BorderBox>
    </footer>
  );
});

export default Footer;