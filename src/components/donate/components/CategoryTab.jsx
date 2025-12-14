// src/components/donate/components/CategoryTab.jsx
export const CategoryTab = ({ label, icon, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 py-3 px-4 font-bold minecraftFont transition-all
      ${isActive
        ? "bg-[#c5629a] text-white"
        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"}
    `}
  >
    <i className={`hn ${icon} text-xl mr-2`}></i>
    <span className="hidden sm:inline">{label}</span>
    {count > 0 && (
      <span className={`ml-2 text-xs px-2 py-0.5 ${isActive ? "bg-white/20" : "bg-gray-600"}`}>
        {count}
      </span>
    )}
  </button>
);