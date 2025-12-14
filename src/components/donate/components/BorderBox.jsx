// src/components/donate/components/BorderBox.jsx
export const BorderBox = ({ 
  children, 
  borderColor = "bg-gray-600", 
  innerBg = "bg-[#1a1a2e]" 
}) => (
  <div className={`${borderColor} p-[3px]`}>
    <div className="bg-gray-800 p-[2px]">
      <div className={innerBg}>
        {children}
      </div>
    </div>
  </div>
);