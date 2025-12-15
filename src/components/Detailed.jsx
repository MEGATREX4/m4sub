// Detailed.jsx
import { Link } from "react-router-dom";
import { BorderBox } from "./donate/components/BorderBox";

export default function Detailed({ items }) {
  return (
    <section className="grid gap-4 justify-center" style={{
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 320px))",
    }}>
      {items.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="group transition-all duration-200 hover:translate-y-[-4px]"
        >
          <BorderBox 
            borderColor="bg-[#c5629a]/50 group-hover:bg-[#c5629a]" 
            innerBg="bg-[#0a0a12]"
          >
            <div className="p-6 flex flex-col items-center text-center h-full group-hover:bg-[#130217] transition-colors">
              {/* Image */}
              <div className="mb-4 p-4 bg-[#1a1a2e] rounded-lg group-hover:bg-[#2a1a3e] transition-colors">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-24 h-24 object-contain group-hover:scale-110 transition-transform" 
                />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-white minecraftFont mb-2 flex items-center gap-2">
                {item.title}
                <i className="hn hn-arrow-right text-[#c5629a] text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </BorderBox>
        </Link>
      ))}
    </section>
  );
}