import { Link } from "react-router-dom";
import { BorderBox } from "./donate/components/BorderBox";

export default function Detailed({ items }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
      {items.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="group block"
        >
          <BorderBox 
            borderColor="bg-[#c5629a]/40 group-hover:bg-[#c5629a] transition-colors" 
            innerBg="bg-[#0a0a12]"
          >
            {/* 
              Мобільна версія: flex-row (горизонтально)
              ПК версія: flex-col (вертикально) 
            */}
            <div className="p-4 sm:p-6 flex flex-row sm:flex-col items-center sm:text-center h-full group-hover:bg-[#130217] transition-colors gap-4 sm:gap-3">
              
              {/* Image Container - тепер без збільшення, просто статичний і чистий */}
              <div className="p-2 bg-white/5 border border-white/5 group-hover:border-[#c5629a]/30 transition-colors flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-10 h-10 sm:w-16 sm:h-16 object-contain" 
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-sm sm:text-base font-bold text-white minecraftFont uppercase tracking-tighter mb-1 sm:mb-2 flex items-center gap-2 sm:justify-center">
                  {item.title}
                  {/* Стрілочка тепер просто з'являється без руху вбік */}
                  <i className="hn hn-arrow-right text-[#c5629a] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </h3>
                
                {/* Description */}
                <p className="text-[11px] sm:text-xs text-gray-500 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none uppercase">
                  {item.description}
                </p>
              </div>
            </div>
          </BorderBox>
        </Link>
      ))}
    </section>
  );
}