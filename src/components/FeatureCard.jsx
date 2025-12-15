// FeatureCard.jsx
import { BorderBox } from './donate/components/BorderBox';

export default function FeatureCard({ 
  items = [],
  title, 
  image, 
  description,
  buttonText = "Дізнатися більше",
  buttonLink = "/",
  textPosition = "right",
  hideImageOnMobile = false,
  mirrorImage = false,
  showAsPoints = true,
  showButton = true,
  showBackground = false,
  icon = "hn-cube-solid"
}) {

  const textBlock = (
    <div className="flex flex-col justify-center p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white minecraftFont mb-3 flex items-center gap-3">
        <i className={`hn ${icon} text-[#c5629a]`}></i>
        {title}
      </h2>
      
      <div className="h-[2px] bg-gradient-to-r from-[#c5629a] to-transparent mb-4"></div>
      
      {description && (
        <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
      )}
      
      {items.length > 0 && (
        showAsPoints ? (
          <ul className="space-y-2 mb-4">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-[#c5629a] mt-1 flex-shrink-0">
                  <i className="hn hn-chevron-right text-xs"></i>
                </span>
                <span>{typeof item === 'string' ? item : item.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3 mb-4">
            {items.map((item, index) => (
              <p key={index} className="text-gray-300">
                {typeof item === 'string' ? item : item.title}
              </p>
            ))}
          </div>
        )
      )}
      
      {showButton && (
        <a 
          href={buttonLink} 
          className="inline-flex items-center justify-center gap-2 mt-2 w-full sm:w-auto px-6 py-3 bg-[#c5629a] hover:bg-[#f390d0] text-white font-bold minecraftFont cornerCutSmall transition-colors"
        >
          <i className="hn hn-arrow-right"></i>
          {buttonText}
        </a>
      )}
    </div>
  );

  const imageBlock = (
    <div className={`flex justify-center items-center p-6 ${hideImageOnMobile ? 'hidden md:flex' : ''}`}>
      <img 
        src={image} 
        alt={title} 
        className={`w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain drop-shadow-[0_0_20px_rgba(197,98,154,0.3)] ${mirrorImage ? 'md:scale-x-[-1]' : ''}`}
      />
    </div>
  );

  return (
    <section className="mt-12">
      {showBackground ? (
        <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            <div className={textPosition === 'left' ? 'order-1 md:order-1' : 'order-1 md:order-2'}>
              {textBlock}
            </div>
            <div className={`${textPosition === 'left' ? 'order-2 md:order-2' : 'order-2 md:order-1'} bg-[#130217]/50`}>
              {imageBlock}
            </div>
          </div>
        </BorderBox>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className={textPosition === 'left' ? 'order-1 md:order-1' : 'order-1 md:order-2'}>
            <BorderBox borderColor="bg-[#c5629a]/50" innerBg="bg-[#0a0a12]">
              {textBlock}
            </BorderBox>
          </div>
          <div className={textPosition === 'left' ? 'order-2 md:order-2' : 'order-2 md:order-1'}>
            {imageBlock}
          </div>
        </div>
      )}
    </section>
  );
}