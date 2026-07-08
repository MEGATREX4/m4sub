import { BorderBox } from "./donate/components/BorderBox";

const DEFAULT_BARS = [
  { width: "100%", delay: "0ms" },
  { width: "88%", delay: "150ms" },
  { width: "76%", delay: "300ms" },
  { width: "64%", delay: "450ms" },
  { width: "52%", delay: "600ms" },
];

const ARTICLE_BARS = [
  { width: "100%", height: "h-40 sm:h-48", delay: "0ms" },
  { width: "75%", height: "h-4", delay: "120ms" },
  { width: "50%", height: "h-3", delay: "240ms" },
  { width: "100%", height: "h-3", delay: "360ms" },
  { width: "92%", height: "h-3", delay: "480ms" },
  { width: "85%", height: "h-3", delay: "600ms" },
  { width: "78%", height: "h-3", delay: "720ms" },
];

function CascadeBars({ bars, gapClass = "gap-2" }) {
  return (
    <div className={`flex flex-col ${gapClass}`}>
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`${bar.height || "h-2.5"} bg-[#c5629a]/30 animate-pulse`}
          style={{
            width: bar.width,
            animationDelay: bar.delay,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  );
}

export default function CascadeLoader({
  label = "Завантаження...",
  variant = "default",
  className = "",
}) {
  const bars = variant === "article" ? ARTICLE_BARS : DEFAULT_BARS;
  const boxWidth = variant === "article" ? "full" : "auto";
  const innerClass = variant === "article" ? "p-6 sm:p-8 w-full" : "p-6 sm:p-8 w-64 sm:w-80";

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]" width={boxWidth}>
        <div className={innerClass}>
          <CascadeBars bars={bars} gapClass={variant === "article" ? "gap-3" : "gap-2"} />
          <div className="mt-6 flex justify-center">
            <i className="hn hn-brightness-low text-[#c5629a] text-xl animate-spin" />
          </div>
        </div>
      </BorderBox>
      <p className="mt-4 text-gray-400 minecraftFont text-sm uppercase tracking-widest text-center">
        {label}
      </p>
    </div>
  );
}
