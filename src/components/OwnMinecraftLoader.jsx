// src/components/OwnMinecraftLoader.js

import React, { useState } from 'react';

export default function OwnMinecraftLoader({
  image,
}) {
  const [loading, setLoading] = useState(true);

  if (!image) {
    return (
      <div className="block my-6 p-4 border border-dashed border-red-500 cornerCut">
        <div className="text-red-400">No image provided</div>
      </div>
    );
  }

  // Use the exact same structure as CapeWingsViewer for consistency
  return (
    <div className="block my-6" style={{ display: 'block', clear: 'both' }}>
      <div className="h-64 md:h-96 bg-gray-900 cornerCut overflow-hidden relative flex items-center justify-center p-4">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-gray-400">Завантаження...</div>
          </div>
        )}
        <img
          src={image}
          alt="Model Render"
          onLoad={() => setLoading(false)}
          className="max-w-full max-h-full"
          style={{
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </div>
  );
}