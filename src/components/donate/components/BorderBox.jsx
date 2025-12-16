// src/components/donate/components/BorderBox.jsx
export const BorderBox = ({ 
  children, 
  borderColor = "bg-gray-600", 
  innerBg = "bg-[#1a1a2e]",
  shine = false,
  className = "",
  width = "full",
  height = "full"
}) => (
  <>
    {shine && (
      <style>{`
        @keyframes diagonalShine {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
      `}</style>
    )}
    <div 
      className={`${borderColor} p-[3px] relative overflow-hidden ${className}`}
      style={{ 
        width: width === "full" ? "100%" : width,
        height: height === "full" ? "100%" : height 
      }}
    >
      {shine && (
        <div 
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `linear-gradient(
              135deg,
              transparent 0%,
              transparent 42%,
              rgba(255, 120, 200, 0.25) 45%,
              rgba(120, 200, 255, 0.3) 47%,
              rgba(255, 255, 255, 0.6) 50%,
              rgba(200, 120, 255, 0.3) 53%,
              rgba(120, 255, 200, 0.25) 55%,
              transparent 58%,
              transparent 100%
            )`,
            animation: 'diagonalShine 5s infinite',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <div className="bg-gray-800 p-[2px] relative h-full" style={{ zIndex: 2 }}>
        <div className={`h-full ${innerBg}`}>
          {children}
        </div>
      </div>
    </div>
  </>
);