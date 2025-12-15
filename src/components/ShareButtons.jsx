// ShareButtons.jsx
import React, { useState, useEffect } from 'react';
import { BorderBox } from './donate/components/BorderBox';

export default function ShareButtons({ title, url }) {
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    if (navigator.share) setIsShareSupported(true);
  }, []);

  if (!url) return null;
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedShareText = encodeURIComponent(`${title} - ${url}`);

  const socialNetworks = [
    { name: 'X', icon: 'hn-x', url: `https://x.com/intent/tweet?text=${encodedShareText}` },
    { name: 'Bluesky', icon: 'hn-bluesky', url: `https://bsky.app/intent/compose?text=${encodedShareText}` },
    { name: 'Facebook', icon: 'hn-facebook-square', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Mastodon', icon: 'hn-mastodon', url: `https://toot.kytta.dev/?text=${encodedShareText}` },
    { name: 'LinkedIn', icon: 'hn-linkedin', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: 'Reddit', icon: 'hn-reddit', url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}` },
  ];

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, text: `Check out: ${title}`, url });
    } catch (error) {
      console.log('Share cancelled', error);
    }
  };

  return (
    <div className="my-6">
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
            className="w-11 h-11 bg-[#1a1a2e] hover:bg-[#c5629a] flex items-center justify-center text-gray-400 hover:text-white transition-colors cornerCutSmall"
          >
            <i className={`hn ${network.icon} text-xl`}></i>
          </a>
        ))}

        {isShareSupported && (
          <button
            onClick={handleNativeShare}
            title="Поділитися..."
            className="w-11 h-11 bg-[#c5629a] hover:bg-[#f390d0] flex items-center justify-center text-white transition-colors cornerCutSmall"
          >
            <i className="hn hn-share text-xl"></i>
          </button>
        )}
      </div>
    </div>
  );
}