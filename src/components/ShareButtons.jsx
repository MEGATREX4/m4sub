import React, { useState, useEffect } from 'react';

export default function ShareButtons({ title, url }) {
  // State to track if the Web Share API is supported by the browser
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    // Check for navigator.share support after the component mounts
    // to ensure navigator object is available.
    if (navigator.share) {
      setIsShareSupported(true);
    }
  }, []);

  if (!url) {
    return null;
  }
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedShareText = encodeURIComponent(`${title} - ${url}`);

  // Base list of social networks
  const socialNetworks = [
    { name: 'X', icon: 'hn hn-times-solid', url: `https://x.com/intent/tweet?text=${encodedShareText}` },
    { name: 'Bluesky', icon: 'hn hn-bluesky', url: `https://bsky.app/intent/compose?text=${encodedShareText}` },
    { name: 'Facebook', icon: 'hn hn-facebook-square', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Mastodon', icon: 'hn hn-mastodon', url: `https://toot.kytta.dev/?text=${encodedShareText}` },
    { name: 'LinkedIn', icon: 'hn hn-linkedin', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: 'Reddit', icon: 'hn hn-reddit', url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}` },
  ];

  // Handler for the native share action
  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: `Check out this article: ${title}`,
        url: url,
      });
    } catch (error) {
      // This can happen if the user cancels the share dialog.
      // We can safely ignore it.
      console.log('Share was cancelled or failed', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-pink-400 mb-4">Поділитися</h2>
      
      <div className="flex flex-wrap items-center gap-3">
        
        

        {/* Render the other social network links */}
        {socialNetworks.map((network) => (
          <div key={network.name} className="bg-gray-700/50 p-[1px] cornerCutSmall transition-all duration-200 hover:bg-pink-500/70">
            <a
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Поділитися в ${network.name}`}
              className="flex items-center justify-center w-12 h-12 bg-gray-800/60 cornerCutSmall text-gray-300 no-underline hover:text-white"
            >
              <i className={`${network.icon} text-2xl`}></i>
            </a>
          </div>
        ))}

        {/* Render the native share button first if supported */}
        {isShareSupported && (
          <div className="bg-gray-700/50 p-[1px] cornerCutSmall transition-all duration-200 hover:bg-pink-500/70">
            <button
              onClick={handleNativeShare}
              title="Поділитися..."
              className="flex items-center justify-center w-12 h-12 bg-gray-800/60 cornerCutSmall text-gray-300 no-underline hover:text-white"
            >
              <i className="hn hn-share-solid text-2xl"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}