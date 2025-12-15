import React, { useState, useEffect } from 'react';

export default function ShareButtons({ title, url }) {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (navigator.share) setIsShareSupported(true);
  }, []);

  if (!url) return null;
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedShareText = encodeURIComponent(`${title} - ${url}`);

  const socialNetworks = [
    { name: 'X', icon: 'hn-x', url: `https://x.com/intent/tweet?text=${encodedShareText}`, color: 'hover:bg-black' },
    { name: 'Bluesky', icon: 'hn-bluesky', url: `https://bsky.app/intent/compose?text=${encodedShareText}`, color: 'hover:bg-[#0085ff]' },
    { name: 'Facebook', icon: 'hn-facebook-square', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: 'hover:bg-[#1877f2]' },
    { name: 'Mastodon', icon: 'hn-mastodon', url: `https://toot.kytta.dev/?text=${encodedShareText}`, color: 'hover:bg-[#6364FF]' },
    { name: 'LinkedIn', icon: 'hn-linkedin', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, color: 'hover:bg-[#0a66c2]' },
    { name: 'Reddit', icon: 'hn-reddit', url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`, color: 'hover:bg-[#ff4500]' },
  ];

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, text: `Читай: ${title}`, url });
    } catch (error) {
      console.log('Share cancelled', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-[#c5629a] minecraftFont mb-4 flex items-center gap-2">
        <i className="hn hn-share"></i>
        Поділитися
      </h2>
      
      <div className="flex flex-wrap gap-2">
        {socialNetworks.map((network) => (
          <a
            key={network.name}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Поділитися в ${network.name}`}
            className={`
              w-10 h-10 bg-[#1a1a2e] border border-gray-700/50 
              flex items-center justify-center 
              text-gray-400 hover:text-white hover:border-transparent
              transition-all ${network.color}
            `}
          >
            <i className={`hn ${network.icon} text-lg`}></i>
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          title={copied ? "Скопійовано!" : "Копіювати посилання"}
          className={`
            w-10 h-10 border border-gray-700/50 
            flex items-center justify-center transition-all
            ${copied 
              ? 'bg-green-600 text-white border-green-600' 
              : 'bg-[#1a1a2e] text-gray-400 hover:text-white hover:bg-[#2a2a4e]'
            }
          `}
        >
          <i className={`hn ${copied ? 'hn-check' : 'hn-link'} text-lg`}></i>
        </button>

        {/* Native Share Button */}
        {isShareSupported && (
          <button
            onClick={handleNativeShare}
            title="Поділитися..."
            className="w-10 h-10 bg-[#c5629a] hover:bg-[#f390d0] flex items-center justify-center text-white transition-colors"
          >
            <i className="hn hn-share text-lg"></i>
          </button>
        )}
      </div>
    </div>
  );
}