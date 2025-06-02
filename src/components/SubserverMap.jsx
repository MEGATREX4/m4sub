// src/components/SubserverMap.jsx
import MapEmbed from "./MapEmbed";

export default function SubserverMap() {
  return (
    <div className="w-[calc(100vw-2rem)] max-w-7xl mx-auto px-4 py-12">
      <MapEmbed src="http://map.m4sub.click/" />
    </div>
  );
}
