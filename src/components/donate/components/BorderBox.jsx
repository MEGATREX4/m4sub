// src/components/donate/components/BorderBox.jsx
export const BorderBox = ({ 
  children, 
  borderColor = "bg-gray-600", 
  innerBg = "bg-[#1a1a2e]",
  shine = false,
  className = ""
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
    <div className={`${borderColor} p-[3px] relative overflow-hidden h-full ${className}`}>
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
              transparent 45%,
              rgba(255, 255, 255, 0.4) 49%,
              rgba(255, 255, 255, 0.7) 50%,
              rgba(255, 255, 255, 0.4) 51%,
              transparent 55%,
              transparent 100%
            )`,
            animation: 'diagonalShine 5s infinite',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <div className="bg-gray-800 p-[2px] relative h-full" style={{ zIndex: 2 }}>
        <div className={`h-full ${innerBg} ${!innerBg.includes('bg-') ? 'bg-[#1a1a2e]' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  </>
);