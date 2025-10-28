import React from 'react';

// A helper to get an appropriate icon based on the platform name
const getPlatformIcon = (platformName) => {
  const name = platformName.toLowerCase();
  if (name.includes('medium')) return 'hn hn-arrow-alt-circle-up';
  if (name.includes('dev.to')) return 'hn hn-arrow-alt-circle-up';
  // Add more platform checks as needed
  // ...
  // Default icon if no match is found
  return 'hn hn-arrow-alt-circle-up'; 
};

export default function AlsoOnLinks({ links }) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-pink-400 mb-4">Також читайте на</h2>
      
      <div className="flex flex-col gap-3">
        {links.map((link, index) => (
          // --- THIS IS THE CORRECTED PART ---
          // 1. Outer div: The "border" container.
          <div 
            key={index} 
            className="bg-gray-700/50 p-[1px] cornerCutSmall transition-all duration-200 hover:bg-pink-500/70"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              // 2. Inner div: The main background and content area.
              className="group flex items-center gap-4 p-3 bg-gray-800/60 cornerCutSmall no-underline"
            >
              {/* The Icon in its "slot" */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white-400 cornerCutSmall">
                <i className={`${getPlatformIcon(link.name)} text-xl`}></i>
              </div>
              
              {/* The Text */}
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {link.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}