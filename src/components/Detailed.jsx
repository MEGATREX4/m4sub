import { Link } from "react-router-dom";

const DETAILED_GRID_ROWS = "repeat(3, auto)";

const isExternalLink = (url) => /^https?:\/\//i.test(url);

const cardClassName =
  "group row-span-3 grid grid-rows-subgrid overflow-hidden border border-[#c5629a]/40 hover:border-[#c5629a] bg-[#0a0a12] hover:bg-[#130217] transition-colors h-full row-gap-0 mb-4 sm:mb-0 last:mb-0";

const cardStyle = {
  display: "grid",
  gridTemplateRows: "subgrid",
  gridRow: "span 3",
};

function DetailedCardContent({ item }) {
  return (
    <>
      <div className="self-start flex justify-center w-full pt-4 px-4 sm:px-6 pb-1" style={{ gridRow: "1" }}>
        <div className="p-2 bg-white/5 border border-white/5 group-hover:border-[#c5629a]/30 transition-colors inline-flex">
          <img
            src={item.image}
            alt={item.title}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      <h3
        className="self-start w-full px-4 sm:px-6 py-1 text-sm sm:text-base font-bold text-white minecraftFont uppercase tracking-tighter flex items-center justify-center gap-2 flex-wrap"
        style={{ gridRow: "2" }}
      >
        {item.title}
        <i className="hn hn-arrow-right text-[#c5629a] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </h3>

      <div className="self-start w-full min-h-0 overflow-hidden px-4 sm:px-6 pt-1 pb-4 sm:pb-5" style={{ gridRow: "3" }}>
        <p className="text-[11px] sm:!text-xs text-gray-500 leading-snug line-clamp-3 uppercase text-center">
          {item.description}
        </p>
      </div>
    </>
  );
}

function DetailedCard({ item }) {
  if (isExternalLink(item.link)) {
    return (
      <a href={item.link} target="_blank" rel="noreferrer" className={cardClassName} style={cardStyle}>
        <DetailedCardContent item={item} />
      </a>
    );
  }

  return (
    <Link to={item.link} className={cardClassName} style={cardStyle}>
      <DetailedCardContent item={item} />
    </Link>
  );
}

export default function Detailed({ items }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-4 sm:gap-y-2"
      style={{ gridTemplateRows: DETAILED_GRID_ROWS }}
    >
      {items.map((item, index) => (
        <DetailedCard key={index} item={item} />
      ))}
    </div>
  );
}
