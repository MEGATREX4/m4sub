// src/components/MapEmbed.jsx
export default function MapEmbed({ src }) {
    return (
      <div className="w-full h-[80vh] md:h-[90vh]">
        <iframe
          src={src}
          title="Embedded Map"
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>
    );
  }
  