const TOP_STEPS = [
  'bg-[#0a0a12]/80',
  'bg-[#0a0a12]/50',
  'bg-[#0a0a12]/25',
  'bg-[#0a0a12]/10',
];

const BOTTOM_STEPS = [
  'bg-[#0e0e10]/10',
  'bg-[#0e0e10]/25',
  'bg-[#0e0e10]/50',
  'bg-[#0e0e10]/80',
];

const PIXEL_TEXT_SHADOW = '2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.6)';

export default function Hero({ title, subtitle, icon, label }) {
  return (
    <div className="relative w-full bg-[#0e0e10]">
      <div className="relative min-h-[300px] sm:min-h-[350px] overflow-hidden flex items-center justify-center">
        <img
          src="https://kutok.s3.eu-central-1.amazonaws.com/uploads/articles/6he1rnz5cays4iqeg515.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            filter: 'saturate(1.1)',
            imageRendering: 'pixelated',
          }}
        />

        <div className="absolute top-0 inset-x-0 flex flex-col pointer-events-none">
          {TOP_STEPS.map((stepClass, index) => (
            <div key={index} className={`h-2.5 sm:h-3 ${stepClass}`} />
          ))}
        </div>

        <div className="absolute bottom-0 inset-x-0 flex flex-col pointer-events-none">
          {BOTTOM_STEPS.map((stepClass, index) => (
            <div key={index} className={`h-2.5 sm:h-3 ${stepClass}`} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-12 text-center">
          {label && (
            <p
              className="text-[#c5629a] minecraftFont text-sm uppercase tracking-widest mb-4"
              style={{ textShadow: PIXEL_TEXT_SHADOW }}
            >
              {label}
            </p>
          )}

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white minecraftFont leading-tight flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            style={{ textShadow: PIXEL_TEXT_SHADOW }}
          >
            {icon && <i className={`hn ${icon} text-[#c5629a] text-3xl sm:text-4xl`}></i>}
            <span>{title}</span>
          </h1>

          {subtitle && (
            <p
              className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed minecraftFont"
              style={{ textShadow: PIXEL_TEXT_SHADOW }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
