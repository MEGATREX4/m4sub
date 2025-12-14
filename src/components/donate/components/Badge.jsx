export const Badge = ({ 
  children, 
  bgColor = "bg-gray-600", 
  textColor = "text-gray-200", 
  size = "text-xs" 
}) => (
  <div className={`${bgColor} p-[2px]`}>
    <div className="bg-black/90 px-2 py-1">
      <div className={`${textColor} ${size} flex items-center gap-1.5`}>
        {children}
      </div>
    </div>
  </div>
);