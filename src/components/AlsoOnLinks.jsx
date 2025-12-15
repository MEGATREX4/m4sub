import React from 'react';
import { BorderBox } from './donate/components/BorderBox';

const getPlatformIcon = (platformName) => {
  const name = platformName.toLowerCase();
  if (name.includes('medium')) return 'hn hn-medium';
  if (name.includes('dev.to') || name.includes('dev')) return 'hn hn-dev';
  if (name.includes('twitter') || name.includes('x')) return 'hn hn-x';
  if (name.includes('telegram')) return 'hn hn-telegram';
  if (name.includes('youtube')) return 'hn hn-youtube';
  if (name.includes('github')) return 'hn hn-github';
  return 'hn hn-link'; 
};

export default function AlsoOnLinks({ links }) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-[#c5629a] minecraftFont mb-4 flex items-center gap-2">
        <i className="hn hn-external-link"></i>
        Також читайте на
      </h2>
      
      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <BorderBox 
              borderColor="bg-gray-700/30 group-hover:bg-[#c5629a]/50" 
              innerBg="bg-[#1a1a2e] group-hover:bg-[#2a1a3e]"
            >
              <div className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#c5629a]/20 group-hover:bg-[#c5629a] transition-colors">
                  <i className={`${getPlatformIcon(link.name)} text-[#c5629a] group-hover:text-white transition-colors`}></i>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors flex-1">
                  {link.name}
                </span>
                <i className="hn hn-arrow-alt-circle-up text-gray-500 group-hover:text-[#c5629a] transition-colors"></i>
              </div>
            </BorderBox>
          </a>
        ))}
      </div>
    </div>
  );
}