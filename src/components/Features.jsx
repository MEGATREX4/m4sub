// Features.jsx
import { BorderBox } from './donate/components/BorderBox';

export default function Features({ items, title = "Переваги гри на M4SUB", icon = "hn-star-solid" }) {
  if (!items) return null;
  
  const features = items.map(item => typeof item === 'string' ? item : item.title);

  return (
    <section className="mt-12">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Image */}
          <div className="flex justify-center items-center order-2 md:order-1">
            <img 
              src="/axo.png" 
              alt="Переваги" 
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 transform md:scale-x-[-1] drop-shadow-[0_0_20px_rgba(197,98,154,0.3)]" 
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white minecraftFont mb-4 flex items-center gap-3">
              <i className={`hn ${icon} text-[#c5629a]`}></i>
              {title}
            </h2>
            
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#c5629a] mt-1 flex-shrink-0">
                    <i className="hn hn-angle-right text-xs"></i>
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BorderBox>
    </section>
  );
}