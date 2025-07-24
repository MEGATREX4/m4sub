// src/components/MapEmbed.jsx
export default function MapEmbed({ src, fullscreenUrl }) {
    return (
      <div className="w-full h-[80vh] md:h-[90vh] relative">
        <iframe
          src={src}
          title="Embedded Map"
          className="w-full h-full border-0"
          allowFullScreen
        />
        
        {/* Optional fullscreen button positioned over the iframe */}
        {fullscreenUrl && (
          <div className="absolute bottom-4 right-4 z-10">
            <a
              href={fullscreenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="minecraftFont bg-[#c5629a] hover:bg-[#b25587] text-white px-4 py-2 pixelated transition inline-block text-sm"
              style={{
                boxShadow: '2px 2px 0 #8b4570, 4px 4px 0 #000',
              }}
            >
              🗺️ Відкрити на весь екран
            </a>
          </div>
        )}
      </div>
    );
  }
  